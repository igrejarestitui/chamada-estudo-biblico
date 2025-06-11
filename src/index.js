import express from "express";
import dotenv from "dotenv";
import membrosRoutes from "./routes/membros.js";
import chamadasRoutes from "./routes/chamadas.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/chamadas", chamadasRoutes);
app.use("/membros", membrosRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
