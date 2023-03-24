# Ecomm

Projeto de Ecommerce criando durante o programa LevelUp da Alura

## Instruções gerais da aplicação

Para rodar a aplicação locamente é necessário realizar alguns passos para o pleno funcionamento dos serviços.

- Criar os bancos de dados no MySql e realizar as migrations do serviço finance
- É necessário configurar via kubernets ou em alguma plataforma de Cloud os acessos aos services da aplicação, o único service que deve ser acessível para a internet é o API Gateway, os demais serviços devem receber as requisições sempre através do API Gateway e nunca diretamente pelo cliente
- Logs ainda serão sendo implementados nos services
- É necessário a configuração da variável de ambiente do JWT_SECRET para criação e verificação dos tokens, através de arquivo .env

## Twelve-Factors

- I. Codebase
  - A aplicação Ecomm utiliza o GIT para versionamento da base de código e o Github para disponibilizar o código em repositório remoto, seguindo esse fator
- II. Dependencies
  - A configuração de dependências é feita no package.json, lá estão explicítas as dependências do projeto, as dependências são gerenciadas pelo NPM
- III. Config
  - As configurações são feita em arquivos .env ou no docker-compose.yml e são importadas nos projetos utilizando o pacote dotenv.
- IV. Backing Service
  - Utilizamos Libs de ORM para utilização dos Backing Services, deixando nosso código com pouco acoplamento em relação aos Backing Services e fazendo as Configurações com de conexão com variáveis de ambiente
- V. Build, release, run
  - Não foram geradas releases do projeto. Porém existe uma fase de build bem definida, pois o projeto é todo dockerizado.
- VI. Processes
  - Todos os projetos são stateless e não armazenam qualquer tipo de dado ou sessão do usuário, agindo assim, como processos independentes.
- VII. Port Binding
  - A definição e exportação de porta é feita explicitamente dentro de cada projeto e independe de fatores externos.
- VIII. Concurrency
  - Aplicação é escalável.
- IX. Disposability
  - A aplicação tem um start rápido e eficiente, e existem operações atômicas em algumas aplicações, porém se desligar os serviços da tomada nada garante que uma requisição em andamento seja finalizada.
- X. Dev/prod parity
  - Existe uma paridade entre ambientes garantida pelo uso do Docker.
- XI. Logs
  - Logs são gravados apenas quando a aplicação começa a rodar e em conexões a backing services, porém serão implementados.
- XII. Admin processes
  - Não foi realizado, até existem alguns scripts de inserção de usuários no Banco de dados e as migrations como histórico, porém não é seguido de forma explicíta.

## Microservices Patterns

- Serviços de domínio
  - O padrão de serviços de domínio é utilizado. Existem 3 services que podem ser considerados serviços de domínio, são eles Product, Account e Finance. Cada um com um escopo bem definido.
- Serviços de negócio
  - É implementado através da API de Order que depende dos services de Account e Finance.
- API Gateway
  - Foi implementado para ponto de acesso único dos serviços e processo de autenticação do JWT.
- Agregador de processos
  - Foi implementado um serviço de negócio, mas não um agregador de processos.
- Edge service
  - Não foi implementado.
- Single database vs Bancos diferentes
  - O padrão Single Database foi implementado no projeto Ecomm, cada service possuí seu próprio database.
- Eventos assíncronos‌
  - Não foi implementado.
- Agregação de logs
  - Não foi implementado.
- Agregação de métricas
  - Não foi implementado.

## Arquitetura de Microservices

- A stack utilizada para os Microservices do Ecomm é NodeJs, Mongo e MySQL. É interessante a padronização da stack, pois dessa forma podemos criar e manter um "esqueleto" para criação de novos microservices seguindo alguns padrões, o que facilita toda a questão de CI/CD.
- Solução para service discovery = DNS para ter o registro de nomes dos microservices, o próprio docker compose faz isso, através dos nomes dos containers conseguimos acessar os microservices internos, e tem o API Gateway que faz o encaminhamento da requisição para o microservice de destino
- Aspectos de segurança (rede, aplicação e segurança em repouso) Devemos utilizar o protocolo https para garantir segurança na comunicação com o cliente, em questão de segurança de repouso devemos ter criptografia dos nossos banco de dados sensíveis e anonimização dos dados, autenticação através de tokens(JWT), limitar os acessos aos microservices apenas ao API Gateway,utilizar uma rede virtual entre os microservices e utilizar firewall.
- Utilizar docker para facilitar build, dockerfile, ter uma pipeline de release e diferentes ambientes de execução. Padronizar as configurações das aplicações de forma parametrizada e utilizar estratégias como features toggle para o lançamento de novas versões da aplicação.
- Para tratamento de erros em comunicação síncrona devemos implementar um circuit breaker para evitar que mais erros acontençam e até evitar de sobrecarregar o servidor. É interessante implementar o uso do cache também, porém o cache só serve para determinadas situações.
- A comunicação assíncrona pode ser utilizada em situações que não precisamos de uma resposta imediata para o cliente. A criação de nota fiscais após um pagamento ter sido efetivado é um bom exemplo de caso de uso para a comunicação assíncrona.
