# Store Manager
Desenvolvimento de uma API RESTful utilizando arquitetura em camadas e banco de dados SQL.

Aprendizado:

## Passo a passo de como rodar na máquina:
    <details>
    <summary>
    1. Instalando as dependências
    </details>
    - Abra o terminal e rode o comando 'npm install';
    </summary>

    <details>
    <summary>
    2. Criando o contâiner no docker
    </summary>
    - Certifique-se de que sua porta 3001 está liberada. Para conferir, basta rodar o comando 'docker ps'. Caso esteja ocupada, rode o comando 'docker stop _nome_'. 
    - Escreva em seu terminal 'docker-compose up -d' e aguarde uns segundos.
    - Agora é só rodar o comando 'docker logs -n 20 -f store_manager' e a aplicação estará em execução.
    </details>

    > Dica: Se você utiliza o VSCode, baixe a extensão Thunder Client para interagir corretamente com as rotas.

Rotas:

Testes:

