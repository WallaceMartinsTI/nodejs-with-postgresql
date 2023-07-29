require("dotenv").config();

const db = require("./db");

const port = process.env.PORT;

const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "Funcionando!" });
});

// Select one customer
app.get("/clientes/:id", async (req, res) => {
  const clientes = await db.selectCustomer(req.params.id);
  res.json(clientes);
});

// Select all customers
app.get("/clientes", async (req, res) => {
  const clientes = await db.selectCustomers();
  res.json(clientes);
});

// Insert customer
app.post("/clientes", async (req, res) => {
  const clientes = await db.insertCustomer(req.body);
  res.sendStatus(201);
});

// Update customer
app.patch("/clientes/:id", async (req, res) => {
  await db.updateCustomer(req.params.id, req.body);
  res.sendStatus(200);
});

// Delete customer
app.delete("/clientes/:id", async (req, res) => {
  await db.deleteCustomer(req.params.id);
  res.sendStatus(204);
});

app.listen(port);

console.log("Backend rodando");
