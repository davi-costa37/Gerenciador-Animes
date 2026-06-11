⛩️ Anime List Tracker (Frontend + Firebase)
Este módulo contém a lógica de controle da interface e integração com o banco de dados do Gerenciador de Animes. 
Ele consome o Firebase Firestore para gerenciar coleções dinâmicas de listas personalizadas através do ID passado na URL da página, permitindo o rastreamento em tempo real do progresso das suas obras favoritas.

⚙️ Funcionalidades
O script gerencia de forma reativa o ciclo de vida dos cards de animes na tela:

Vinculação por Parâmetros (URLSearchParams): Identifica a qual lista global o usuário pertence capturando a variável id diretamente da URL.

Operações CRUD no Firestore:

Create: Cria novos documentos de animes vinculados a uma subcoleção da lista de origem com campos de episódios assistidos zerados.

Read (Filtro e Busca Dinâmica): Consulta os registros da nuvem e filtra em tempo real por meio de inputs de pesquisa textual ou seletores de status (ex: assistindo, pausado, planejado).

Update: Atualiza de forma independente a contagem de episódios ou o status atual do card sem recarregar a página.

Delete: Remove permanentemente o anime do banco de dados na nuvem.

Cálculo de Progresso Automatizado: Converte a relação entre os episódios atuais e o total em uma porcentagem matemática inteira para preencher dinamicamente a largura das barras de progresso virtuais em CSS.

Paginação Inteligente (Exibir Mais): Limita a renderização inicial a 8 elementos na tela, liberando mais cards de forma sob demanda com transição e rolagem suave da tela (smooth scroll).

🛠️ Tecnologias Utilizadas
Frontend: JavaScript Avançado (ES6+ Modules, Async/Await e manipulação assíncrona do DOM).

Persistência em Nuvem: Firebase Firestore v10 (Módulos de consulta por referência, subcoleções e atualizações parciais).

📄 Licença
Este projeto está sob a licença MIT.
