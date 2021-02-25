# Boas vindas ao repositório do Projeto Jubs Cleiton's Cars!

Aqui serão encontrados os detalhes de como o projeto foi estruturado. #vqv 🚀


## Cenário fictício

Jubscleiton está lançando uma nova plataforma de vendas de carro. Nesta plataforma, desejamos realizar o cadastro de novos carros para os clientes consultarem.

Atributos de um Carro são:
- Marca
- Model
- Versão
- Ano
- Quilometragem
- Tipo de Câmbio
- Preço de venda


## Instruções para a instalação do projeto:

1. Clone o repositório
  * `git clone git@github.com:hleoc/Projeto-Carupi-Jubscleiton.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd Projeto-Carupi-Jubscleiton`

2. Instale as dependências
  * `npm install`

## O que foi desenvolvido

Foi desenvolvido uma plataforma utilizando a arquitetura MSC!

Nesse projeto é possível fazer o cadastramento e login de usuário, onde apenas esse usúario poderá Acessar, Criar, Listar, Editar, Visualizar um carro específico e Deletar um carro específico(ou `CRUD`, para os mais íntimos 😜).

Para realizar qualquer tipo de alteração no banco de dados como cadastro, edição ou exclusão de carros será necessário autenticar-se. 

A autenticação deverá ser feita via `JWT`.


### Data de Entrega

O projeto tem até a seguinte data para ser entregue: `25/02/2021 - 18:00h`.


## Requisitos Obrigatórios:

O Projeto Jubs Cleiton's Cars será realiado utilizando o mongoDB como banco de dados. 


### Conexão com o Banco:
A conexão do banco local deverá conter os seguintes parâmetros:

```javascript
const MONGO_DB_URL = 'mongodb://localhost:27017/Jubscleiton';
const DB_NAME = 'Jubscleiton';
```

### Tabelas

O banco terá duas coleções: usuários e carros.

A coleção de usuários terá o seguinte nome: `users`.

A coleção de carros terá o seguinte nome: `cars`.

O projeto deve rodar na porta 3000, podendo ser acessado em http://localhost/3000 .

### Cobertura de testes unitários

- A cobertura de testes unitários do back-end deve ser de, no mínimo, 90%.

### Melhorias Futuras

Adicionar dados sensíveis ao arquivo de ambiente(.env).
