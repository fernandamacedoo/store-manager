# Store Manager
Desenvolvimento de uma API RESTful utilizando arquitetura em camadas e banco de dados SQL.

## Aprendizado:
<details>
<summary>
Implementação de API utilizando Arquitetura em Camadas - MSC
</summary>
</details>

<details>
<summary>
Implementação de testes para APIs
</summary>
</details>

<details>
<summary>
Criação de validações para os dados recebidos pela API
</summary>
</details>

<details>
<summary>
Integração da aplicação com um banco de dados relacional MySQL
</summary>
</details>

## Passo a passo de como rodar na máquina:
<details>
<summary>
1. Instalando as dependências
</summary>
Abra o terminal e rode o comando 'npm install';
</details>

<details>
<summary>
2. Criando o contâiner no docker
</summary>

- Certifique-se de que sua porta 3001 está liberada. Para conferir, basta rodar o comando 'docker ps'. Caso esteja ocupada, rode o comando `docker stop nome_do_seu_container`. 

- Escreva em seu terminal `docker-compose up -d` e aguarde uns segundos.

- Agora é só rodar o comando `docker logs -n 20 -f store_manager` e a aplicação estará em execução.
</details>

> Dica: Se você utiliza o VSCode, baixe a extensão Thunder Client para interagir corretamente com as rotas.

## Rotas:
### GET /products
- Exibe todos os produtos do banco de dados.
### GET /products/:id
- Exibe a busca de um produto específico no banco de dados.
- Escreva um id válido na própria URL e o retorno será de um produto.
### POST /products
- Cadastra um novo produto.
- Para cadastrar um novo produto, é preciso escrever no body um objeto com o campo `name`. Vamos testar? 

    ```
    {
    "name": "Novo produto"
    }
    ```

- Cole o texto acima no campo `body` e configure a rota para `POST`. Agora é só enviar a requisição.
> A interação precisa possuir o campo `name` contendo uma string com no mínimo 5 caracteres.

### PUT /products/:id
- Modifica um produto já existente.
- Para modificar um produto, é preciso identificar seu id na URL e escrever no body um objeto com o campo `name`. Vamos testar? 

    ```
    {
    "name": "Produto modificado"
    }
    ```

- Cole o texto acima no campo `body` e configure a rota para `PUT`. Agora é só enviar a requisição.
> É preciso que o id da rota seja de um produto existente e a interação precisa possuir o campo `name` contendo uma string com no mínimo 5 caracteres.
### GET /sales
- Exibe todas as vendas do banco de dados.
### GET /sales/:id
- Exibe uma venda específica no banco de dados.
- Escreva um id válido na própria URL e o retorno será de uma venda.
### POST /sales
- Cadastra um novo registro de venda.
- Para cadastrar um novo produto, é preciso escrever no body um array com objetos possuindo os campos `productId` e `quantity`. Vamos testar? 

    ```
    [{
    "productId": 2,
    "quantity": 1
    },
    {
    "productId": 1,
    "quantity": 1
    }]
    ```

- Cole o texto acima no campo `body` e configure a rota para `POST`. Agora é só enviar a requisição.
> É preciso que existam dois campos: `productId` e `quantity`; que `productId` seja de um produto existente; e que `quantity` seja igual ou maior que 1.

**💡Teste colocar valores inválidos para ver como as validações da aplicação se comportam.**

## Testes:
Foram implementados 28 testes nesta aplicação. Todas as camadas foram testadas, juntamente com as validações de requisições.
### Como rodar os testes?
- Com a aplicação em execução, abra outro terminal e rode o comando `npm run test:mocha`.

## Desenvolvido por: 
**Fernanda Macêdo**

*LinkedIn: https://www.linkedin.com/in/fernandamacedodev/*
