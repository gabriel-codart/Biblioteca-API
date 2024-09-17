# Biblioteca - API

Este projeto é uma API para um sistema de gerenciamento de uma biblioteca, desenvolvido com Fastify, TypeScript, SQLite e Prisma. Ele permite gerenciar alunos, livros, empréstimos e atrasos. O sistema inclui funcionalidades como registro de empréstimos, devoluções e cálculo de multas por atraso.

## Pré-requisitos

- Node.js v14 ou superior
- npm

## Instalação

1. Instale as dependências:

    ```bash
    npm install

2. Configure o banco de dados:

    ```bash
    npm prisma generate
    ```
    
    ```bash
    npx prisma migrate dev
    ```

3. Inicie o servidor:

    ```bash
    npm run dev

O servidor será iniciado em _http://localhost:2020_ e a documentação Swagger estará disponível em _http://localhost:2020/docs_.

## Estrutura do Projeto

```plaintext
src
├── controllers
│   └── itemsController.ts  # Controladores para manipulação de lógica de negócios
├── models
│   └── item.ts             # Modelos de dados
├── routes
│   └── items.ts            # Definição das rotas
└── index.ts                # Configuração principal do Fastify
```

## Documentação

Este template inclui a configuração do Swagger para documentação automática da API. Acesse a documentação em http://localhost:2020/docs.

## Contribuição

Sinta-se à vontade para fazer um fork do projeto e enviar pull requests. Sugestões e melhorias são sempre bem-vindas!

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
