# Beckend para a empresa FacilitaJuri

Esse projeto foi feito usando nodejs

# Como usar

Clone esse repositório git no seu computador, então acesse a pasta e execute o comando `npm install --only=dev`.
Esse comando fará com que as dependências necessárias sejam instaladas.

# Variáveis de ambiente

Vá na pasta raiz do projeto e crie um arquivo chamado `.env`. E nele escreva as seguintes variáveis

`URL = "URL-DO-BANCO"`
`USER= 'seu-usuario'`
`HOST= 'localhost'`
`PRIVATE_KEY = "SUA-CHAVE"`
`DATABASE= 'seu-banco-de-dados'`
`PASSWORD= 'sua-senha'`
`PORT= 7000`

O beckend esta configurado para tentar se conectar primeiramente a `url`. Caso o espaço da url estaja vazio (`""`) ele então tentara se conectar 
usando o `USER`, `HOST`, `DATABASE`, `PASSWORD` e `PORT` que estiverem escritos.
A `PRIVATE_KEY` é a chave que será usada para gerar os `Tokens JWT` que serão criados no ato do login do usuário.

Para facilitar na criação do ambiente você pode fazer a criação do banco de dados ór meio de uma api. É preciso apenas chamar `sua-url/api/criar` e ele irá criar as tabelas
mas caso queira de outra forma abaixo segue a DDL necessária para o banco de dados

# DDL POSTGRESQL
`CREATE TABLE Usuarios ( id SERIAL PRIMARY KEY, usuario VARCHAR(255) UNIQUE NOT NULL, senha VARCHAR(255) NOT NULL)`
`CREATE TABLE Clientes ( id SERIAL PRIMARY KEY, id_empresa INTEGER, nome VARCHAR(255), email VARCHAR(255) NOT NULL, telefone VARCHAR(255) NOT NULL, pos_x INTEGER, pos_y INTEGER, distancia INTEGER )`


