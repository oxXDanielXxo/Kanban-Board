# 📋 Quadro Kanban Interativo (Clone Trello)

Uma aplicação Front-End pura desenvolvida para gestão ágil de tarefas. O projeto simula a mecânica central do Trello, permitindo a criação e movimentação de cartões através de uma interface fluida.

## ⚙️ Tecnologias e Arquitetura (Vanilla Stack)
Este projeto foi construído **sem o uso de frameworks externos** (como React ou Vue) ou bibliotecas (como jQuery), provando o domínio absoluto das tecnologias nativas da Web:
* **HTML5:** Estruturação semântica.
* **CSS3 (Flexbox):** Design responsivo, alinhamento de colunas e micro-interações visuais (hover, transições).
* **Vanilla JavaScript:** Motor de física, manipulação do DOM e injeção de elementos dinâmicos.

## 🚀 Funcionalidades de Engenharia
* **HTML5 Drag and Drop API:** Implementação nativa da mecânica de arrastar e soltar cartões, interceptando os eventos de `dragstart`, `dragover` e `dragend` para hackear o comportamento padrão do navegador e criar "zonas de aterrissagem" nas colunas.
* **Data Persistence (Memória de Sessão):** Integração com o `localStorage` do navegador. O motor JavaScript tira um "snapshot" do quadro (serializando os dados em JSON) a cada nova tarefa criada ou movida, garantindo que o usuário não perca seu progresso ao atualizar a página (F5) ou fechar a aba.
* **Factory Functions:** O código utiliza o conceito de funções construtoras para fabricar e instanciar novos cartões dinamicamente, mantendo o código modular e limpo.

## 💻 Como Executar
Como é uma aplicação Front-End pura, não é necessário rodar servidores locais ou instalar pacotes.
Basta clonar este repositório e abrir o arquivo `index.html` em qualquer navegador moderno.
