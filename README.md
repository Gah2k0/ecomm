# Ecomm

Projeto de Ecommerce criando durante o programa LevelUp da Alura 

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
    - Logs são gravados apenas quando a aplicação começa a rodar e em conexões a backing services.
- XII. Admin processes
    - Não foi realizado, até existem alguns scripts de inserção de usuários no Banco de dados e as migrations como histórico, porém não é seguido de forma explicíta.

## Microservices Patterns

- Serviços de domínio
    - O padrão de serviços de domínio é utilizado. Existem 3 services que podem ser considerados serviços de domínio, são eles Product, Account e Finance. Cada um com um escopo bem definido.
- Serviços de negócio
    - É implementado através da API de Order que depende dos services de Account e Finance.
- API Gateway
    - Não foi implementado.
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
