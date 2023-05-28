# Simulando um Banco de Dados com Live Server e Consumindo uma API

Este é um exemplo de código que utiliza o Live Server para simular um banco de dados e consome uma API para realizar operações de adicionar, editar, excluir e visualizar transações em uma página da web.

## Funcionalidades

1. Adicionar transações: Preencha o formulário com o nome e o valor da transação e clique em "Salvar". A transação será adicionada à lista de transações exibida na página e enviada para a API.

2. Editar transações: Clique no botão "Editar" ao lado de uma transação para preencher o formulário com os detalhes dessa transação. Você pode editar o nome e o valor da transação e clicar em "Salvar" novamente. A transação será atualizada na lista e enviada para a API.

3. Excluir transações: Clique no botão "Excluir" ao lado de uma transação para removê-la da lista e enviar uma solicitação para a API para excluí-la permanentemente.

4. Atualização do saldo: O saldo total é calculado com base nas transações existentes e exibido na página.

## Iniciando

1. Certifique-se de ter o Live Server instalado em sua máquina. O Live Server é uma extensão do Visual Studio Code que permite executar um servidor local para o desenvolvimento web.

2. Abra o arquivo HTML no Visual Studio Code.

3. Clique com o botão direito do mouse dentro do arquivo HTML e selecione "Open with Live Server".

4. O servidor será iniciado e a página da web será aberta em seu navegador padrão.

## Entendendo o código

O código JavaScript contém várias funções para criar elementos HTML, renderizar transações, salvar transações, buscar dados do servidor e atualizar o saldo. Destacaremos a parte relacionada ao manuseio da API:

### Função para salvar transação

```javascript
async function saveTransaction(ev) {
  // ...

  if (id) {
    const response = await fetch(`http://localhost:3000/transfer/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, amount }),
      headers: { "Content-Type": "application/json" },
    });
    const transaction = await response.json();
    // ...
  } else {
    const response = await fetch("http://localhost:3000/transfer", {
      method: "POST",
      body: JSON.stringify({ name, amount }),
      headers: { "Content-Type": "application/json" },
    });

    const transaction = await response.json();
    // ...
  }

  // ...
}
