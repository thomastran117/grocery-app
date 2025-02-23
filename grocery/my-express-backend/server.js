const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let groceryList = [
  { id: 1, name: "Milk", quantity: 1 },
  { id: 2, name: "Bread", quantity: 2 }
];

app.get("/items", (req, res) => res.json(groceryList));

app.post("/items", (req, res) => {
  const newItem = { id: Date.now(), ...req.body };
  groceryList.push(newItem);
  res.status(201).json(newItem);
});

app.put("/items/:id", (req, res) => {
  const index = groceryList.findIndex(item => item.id === parseInt(req.params.id));
  if (index !== -1) {
    groceryList[index] = { id: parseInt(req.params.id), ...req.body };
    res.json(groceryList[index]);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

app.delete("/items/:id", (req, res) => {
  groceryList = groceryList.filter(item => item.id !== parseInt(req.params.id));
  res.json({ message: "Item deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
