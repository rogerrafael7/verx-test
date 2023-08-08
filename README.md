### Para Rodar a Aplicação
> docker-compose up -d

### Para gerar massa de dados
> npm run generator-data

Esse comando irá gerar 100 registros de produtores rurais junto com seus dados relacionados.
**OBS:** Esse comando deve ser executado SOMENTE após a aplicação ser executada, devido a criação das estruturas do banco
de dados que serão geradas pelas migrations.

### Para testar os endpoints
Essa collection([link](./assets/Verx.postman_collection.json)) pode ser importada no Postman. Nela contém todos os endpoints da aplicação.

### Observações
- O arquivo `.env` está commitado apenas para fins de entendimento e testes.
