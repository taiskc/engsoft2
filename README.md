# Trabalho Prático - Engenharia de Software 2


## Membros do grupo

* Taís Christofani - 2020420648

## Sistema de Gerenciamento de Finanças

O sistema implementado é uma simples API Rest para controle de finanças pessoais.

### Tecnologias utilizadas

* Back-end: foi desenvolvido na linguagem Node.js, utilizando o framework Express.
* Banco de dados: foi utilizada a base de dados não relacional MongoDB.

### Funcionalidades

A aplicação consiste de endpoints do tipo GET, POST, UPDATE e DELETE que tornam possível visualizar, criar, editar e remover categorias de despesas e as despesas em si.
Cada categoria possui apenas um nome, enquanto uma despesa possui nome, categoria, valor e data.
A partir daí é possível também obter o valor médio gasto por categoria, o valor total gasto por categoria e a variação de gastos em cada categoria com relação ao mês anterior.
Todos endpoint do tipo GET com rota 'api/expenses/...', exceto o de uma despesa específica e o da variação de gastos no último mês, também aceita como query um período de data para o qual se deseja obter os dados.
