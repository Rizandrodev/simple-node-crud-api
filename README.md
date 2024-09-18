# Simple Node.js CRUD API

## Descrição

Este projeto é uma API CRUD simples construída com Node.js. Ele utiliza um arquivo JSON (`data.json`) para armazenar os dados dos usuários, permitindo operações básicas de criação, leitura, atualização e exclusão (CRUD) via requisições HTTP. 

## Funcionalidades

- **GET /users**: Retorna todos os usuários armazenados no arquivo JSON.
- **POST /users**: Cria um novo usuário e adiciona ao arquivo JSON.
- **PUT /users/:id**: Atualiza um usuário existente com base no ID fornecido.
- **DELETE /users/:id**: Remove um usuário existente com base no ID fornecido.

## Estrutura do Projeto

- **`index.js`**: Implementa o servidor HTTP e as rotas da API.
- **`db/database.js`**: Gerencia a leitura e escrita dos dados no arquivo JSON (`data.json`).
- **`db/data.json`**: Armazena os dados dos usuários em formato JSON.

## Instalação

1. Clone este repositório:

    ```bash
    git clone https://github.com/seu-usuario/simple-node-crud-api.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd simple-node-crud-api
    ```

3. Instale as dependências (se houver):

    ```bash
    npm install
    ```

4. Inicie o servidor:

    ```bash
    node index.js
    ```

O servidor estará disponível em [http://localhost:3000](http://localhost:3000). 

## Contribuição

Se você deseja contribuir para este projeto, por favor siga estas etapas:

1. Faça um fork deste repositório.
2. Crie uma nova branch (`git checkout -b minha-nova-feature`).
3. Faça as alterações desejadas e adicione os arquivos (`git add .`).
4. Faça um commit das suas alterações (`git commit -m 'Adiciona nova feature'`).
5. Envie a branch para o seu fork (`git push origin minha-nova-feature`).
6. Abra uma Pull Request para o repositório original.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

<!--Para dúvidas ou mais informações, entre em contato com [seu-email@exemplo.com](.com).
