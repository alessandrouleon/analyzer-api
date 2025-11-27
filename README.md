## RODAR O PROJETO VIA DOCKER

## O banco usado e mongoDB

### Execulte  docker-compose.yml 
#### docker compose up -d --build

### QUANDO ACESSAR O MongoDB Compass informar o nome do banco "service-order", vefificar se o usuario foi criado.
#### Caso o usuario não seja criado executar o passo abaixo, 

### APOS CRIAR O PROJETO RODAR O ARQUIVO "seed" no terminal
#### npm run seed
##### Essse arquivo cria um usuario
##### As credenciais do usuario SEED: "username": "admin", e "password": "Admin@123"






## CREATE MOGRATION MANUAL, SE USAR DOCKER NAO PRECISA, JA RODA ALTOMÀTICO
#### npm run migrate:create create-users-collection
####  npm run migrate-local-db
