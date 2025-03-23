const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // Habilita CORS
// ou defina assim para aceitar apenas a origem específica:
// app.use(cors({ origin: "http://localhost:3000" }));

app.get("/api/produtos", (req, res) => {
    res.json([
        { id: 1, nome: "Produto 1", preco: 10.0 },
        { id: 2, nome: "Produto 2", preco: 20.0 },
        { id: 3, nome: "Produto 3", preco: 30.0 },
    ]);
});

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));