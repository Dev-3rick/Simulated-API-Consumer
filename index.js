let trasactions = [];

function CreateElementDiv(id) {
 const div = document.createElement("div");
 div.classList.add("transaction");
 div.id = `trasaction-${id}`;
 return div;
}

function CreateElementTitle(name) {
 const title = document.createElement("span");
 title.classList.add(`trasaction-title`);
 title.textContent = name;
 return title;
}

function CreateElementSaldo(saldo) {
 const spanSaldo = document.createElement("span");

 const formater = Intl.NumberFormat("pt-BR", {
  compactDisplay: "long",
  currency: "BRL",
  style: "currency",
 });
 const FormatarSaldo = formater.format(saldo);
 if (saldo > 0) {
  spanSaldo.textContent = `${FormatarSaldo} C`;
  spanSaldo.classList.add("transaction-amount", "credit");
 } else {
  spanSaldo.textContent = `${FormatarSaldo} D`;
  spanSaldo.classList.add("transaction-amount", "debit");
 }
 return spanSaldo;
}

function createEditTransectionBtn(trasaction) {
 const editBtn = document.createElement("button");
 editBtn.classList.add("edit-btn");
 editBtn.textContent = "Editar";
 editBtn.addEventListener("click", () => {
  document.querySelector("#id").value = trasaction.id;
  document.querySelector("#name").value = trasaction.name;
  document.querySelector("#amount").value = trasaction.amount;
 });
 return editBtn;
}

// ...

function createDeleteTransactionButton(id) {
 const deleteBtn = document.createElement("button");
 deleteBtn.classList.add("delete-btn");
 deleteBtn.textContent = "Excluir";
 deleteBtn.addEventListener("click", async () => {
  await fetch(`http://localhost:3000/transfer/${id}`, { method: "DELETE" });
  deleteBtn.parentElement.remove();
  const indexToRemove = transactions.findIndex((t) => t.id === id);
  transactions.splice(indexToRemove, 1);
  updateBalance();
 });
 return deleteBtn;
}

// ...

function renderTrasaction(trasaction) {
 const container = CreateElementDiv(trasaction.id);
 const title = CreateElementTitle(trasaction.name);
 const amout = CreateElementSaldo(trasaction.amount);
 const editBtn = createEditTransectionBtn(trasaction);
 const deleteBtn = createDeleteTransactionButton(trasaction.id);

 document.querySelector("#transactions").append(container);
 container.append(title, amout, editBtn, deleteBtn);
 console.log(container);
}

async function saveTransaction(ev) {
 ev.preventDefault();
 const id = document.querySelector("#id").value;
 const name = document.querySelector("#name").value;
 const amount = parseFloat(document.querySelector("#amount").value);

 if (id) {
  const response = await fetch(`http://localhost:3000/transfer/${id}`, {
   method: "PUT",
   body: JSON.stringify({ name, amount }),
   headers: { "Content-Type": "application/json" },
  });
  const trasaction = await response.json();
  const indexToRemove = trasactions.findIndex((t) => t.id(id));
  trasaction.splice(indexToRemove, 1, trasaction);
  document.querySelector(`#transaction-${id}`).remove();
  renderTrasaction(trasaction);
 } else {
  const response = await fetch("http://localhost:3000/transfer", {
   method: "POST",
   body: JSON.stringify({ name, amount }),
   headers: { "Content-Type": "application/json" },
  });

  const trasaction = await response.json();
  trasactions.push(trasaction);
  renderTrasaction(trasaction);
 }

 ev.target.reset();
 updateBalance();
}

async function fetchData() {
 return await fetch("http://localhost:3000/transfer").then((res) => res.json());
}

function updateBalance() {
 const balanceSpan = document.querySelector("#balance");
 const balance = trasactions.reduce((sum, trasaction) => sum + trasaction.amount, 0);
 const formater = Intl.NumberFormat("pt-BR", {
  compactDisplay: "long",
  currency: "BRL",
  style: "currency",
 });
 balanceSpan.textContent = formater.format(balance);
}

async function setup() {
 const results = await fetchData();
 trasactions.push(...results);
 await results.forEach(renderTrasaction);
 updateBalance();
}

document.addEventListener("DOMContentLoaded", setup);
document.querySelector("form").addEventListener("submit", saveTransaction);
