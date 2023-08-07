<h1>API de Gerenciamento de Partidas - Campeonato de Futebol Brasileiro</h1>

<p>Este projeto é uma API que utiliza Node.js, Express, Sequelize (ORM) e TypeScript para criar um sistema de gerenciamento de partidas de um campeonato de futebol brasileiro. A aplicação oferece operações de CRUD para criar, atualizar e listar partidas, além de fornecer filtros por nome de time e por partidas em progresso ou finalizadas. A autenticação de usuários é realizada usando JSON Web Tokens (JWT) e as senhas são criptografadas com bcrypt. A aplicação é executada em um ambiente virtual com front-end, back-end e banco de dados rodando em containers Docker.</p>

<h2>Funcionalidades</h2>
<ul>
  <li>CRUD (Create, Read, Update, Delete) para criação e gerenciamento de partidas do campeonato.</li>
  <li>Filtros de pesquisa por nome de time e por partidas em progresso ou finalizadas.</li>
  <li>Autenticação de usuários utilizando JSON Web Tokens (JWT) para garantir segurança e permissões de acesso.</li>
  <li>Criptografia de senhas usando bcrypt para proteger as informações dos usuários.</li>
  <li>Utilização do Sequelize como ORM para interação com o banco de dados MySQL.</li>
  <li>Execução da aplicação em ambiente virtual com front-end, back-end e banco de dados em containers Docker.</li>
  <li>Testes de integração garantindo a cobertura de funcionalidades da aplicação.</li>
</ul>

<h2>Instalação</h2>
<ol>
  <li>Clone o repositório.</li>
  <li>Execute <code>npm install</code> para instalar as dependências.</li>
  <li>Configure as credenciais do banco de dados no arquivo <code>.env</code>.</li>
  <li>Execute <code>docker-compose up</code> para iniciar a aplicação com front-end, back-end e banco de dados em containers Docker.</li>
  <li>Acesse a API em <a href="http://localhost:3000">http://localhost:3000</a> para interagir com a aplicação.</li>
</ol>

<h2>Testes</h2>
<p>O projeto conta com testes de integração para garantir a qualidade e a correta funcionalidade das rotas e serviços. Para executar os testes, utilize o comando <code>npm test</code>.</p>

<h2>Contribuição</h2>
<p>Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests com melhorias ou correções.</p>

<p align="center">Criado com a ajuda do assistente da OpenAI</p>

_______________________________________________________________________________________________________________________________________________________________

<h1>Brazilian Football Championship Matches API</h1>

<p>This project is an API that utilizes Node.js, Express, Sequelize (ORM), and TypeScript to create a system for managing matches in a Brazilian football championship. The application offers CRUD operations to create, update, and list matches, as well as filters for searching matches by team name and matches in progress or finished. User authentication is handled using JSON Web Tokens (JWT), and passwords are encrypted using bcrypt. The application runs in a virtual environment with front-end, back-end, and database running in Docker containers.</p>

<h2>Features</h2>
<ul>
  <li>CRUD (Create, Read, Update, Delete) operations for creating and managing matches in the championship.</li>
  <li>Filters for searching matches by team name and matches in progress or finished.</li>
  <li>User authentication using JSON Web Tokens (JWT) to ensure security and access permissions.</li>
  <li>Password encryption using bcrypt to protect user information.</li>
  <li>Uses Sequelize as the ORM for interacting with the MySQL database.</li>
  <li>Execution of the application in a virtual environment with front-end, back-end, and database in Docker containers.</li>
  <li>Integration tests to ensure coverage of application functionalities.</li>
</ul>

<h2>Installation</h2>
<ol>
  <li>Clone the repository.</li>
  <li>Run <code>npm install</code> to install the dependencies.</li>
  <li>Configure the database credentials in the <code>.env</code> file.</li>
  <li>Run <code>docker-compose up</code> to start the application with front-end, back-end, and database in Docker containers.</li>
  <li>Access the API at <a href="http://localhost:3000">http://localhost:3000</a> to interact with the application.</li>
</ol>

<h2>Tests</h2>
<p>The project includes integration tests to ensure the quality and correct functionality of the routes and services. To run the tests, use the command <code>npm test</code>.</p>

<h2>Contribution</h2>
<p>Contributions are welcome! Feel free to submit pull requests with improvements or fixes.</p>

<p align="center">Created with the help of OpenAI Assistant</p>
