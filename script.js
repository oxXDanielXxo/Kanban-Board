// 1. Mapeamento do Terreno
const columns = document.querySelectorAll('.task-list');
const btnAdd = document.getElementById('add-task-btn');
const inputTask = document.getElementById('new-task-input');
const columnTodo = document.querySelector('#todo .task-list');

// ==========================================
// MÓDULO DE MEMÓRIA (O COFRE)
// ==========================================

// Função para salvar o estado atual do quadro
function saveBoard() {
    const boardState = {
        todo: [],
        'in-progress': [],
        done: []
    };

    // O robô varre cada coluna e anota o texto de cada cartão
    document.querySelectorAll('.kanban-column').forEach(column => {
        const columnId = column.id; // Pega o ID (todo, in-progress, done)
        const tasksInColumn = column.querySelectorAll('.task');
        
        tasksInColumn.forEach(task => {
            boardState[columnId].push(task.textContent);
        });
    });

    // Converte os dados para texto e tranca no cofre do navegador
    localStorage.setItem('kanbanData', JSON.stringify(boardState));
}

// Função para carregar os dados salvos
function loadBoard() {
    const savedData = localStorage.getItem('kanbanData');
    
    // Se existir algo no cofre, nós carregamos
    if (savedData) {
        const boardState = JSON.parse(savedData);
        
        // Primeiro, limpamos as colunas do HTML para evitar duplicação
        document.querySelectorAll('.task-list').forEach(list => list.innerHTML = '');

        // Depois, recriamos os cartões nos lugares certos
        for (const columnId in boardState) {
            const targetList = document.querySelector(`#${columnId} .task-list`);
            boardState[columnId].forEach(taskText => {
                const newTask = createAndSetupTask(taskText);
                targetList.appendChild(newTask);
            });
        }
    } else {
        // Se for a primeira vez (cofre vazio), apenas instalamos o motor 
        // nos cartões padrão que já vieram escritos no HTML
        document.querySelectorAll('.task').forEach(task => setupTaskEvents(task));
    }
}

// ==========================================
// FÍSICA E LINHA DE MONTAGEM
// ==========================================

// Função Fábrica: Cria o cartão e instala o motor de física nele
function createAndSetupTask(text) {
    const newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.setAttribute('draggable', 'true');
    newTask.textContent = text;
    setupTaskEvents(newTask);
    return newTask;
}

// Instala a gravidade (arrastar e soltar) em um cartão específico
function setupTaskEvents(task) {
    task.addEventListener('dragstart', () => {
        task.classList.add('dragging');
    });
    
    task.addEventListener('dragend', () => {
        task.classList.remove('dragging');
        saveBoard(); // GATILHO: Salva o quadro sempre que você soltar um cartão!
    });
}

// A Física da Coluna (A Zona de Aterrissagem)
columns.forEach(column => {
    column.addEventListener('dragover', (e) => {
        e.preventDefault(); // Desliga a trava do navegador
        const currentTask = document.querySelector('.dragging');
        if (currentTask) {
            column.appendChild(currentTask);
        }
    });
});

// A Linha de Montagem (Botão Adicionar)
btnAdd.addEventListener('click', () => {
    const text = inputTask.value.trim();
    if (text !== "") {
        const newTask = createAndSetupTask(text);
        columnTodo.appendChild(newTask);
        inputTask.value = '';
        saveBoard(); // GATILHO: Salva o quadro sempre que uma missão nova for criada!
    }
});

// ==========================================
// IGNIÇÃO DO SISTEMA
// ==========================================
// Assim que a página abre, ele roda a função de carregamento
loadBoard();