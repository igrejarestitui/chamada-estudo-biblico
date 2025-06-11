import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Criar uma chamada
router.post("/", async (req, res) => {
  try {
    const chamada = await prisma.chamada.create({});
    res.status(201).json(chamada);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar chamada" });
  }
});

// Marcar presença para membros na chamada
router.post("/:id/presencas", async (req, res) => {
  const chamadaId = parseInt(req.params.id);
  const { membros } = req.body; // Ex: [1, 2, 3]

  try {
    const presencas = await Promise.all(
      membros.map((membroId) =>
        prisma.presenca.create({
          data: { membroId, chamadaId },
        })
      )
    );
    res.json(presencas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar presenças" });
  }
});

// Listar chamadas com presenças
router.get("/", async (req, res) => {
  try {
    const chamadas = await prisma.chamada.findMany({
      include: {
        presencas: {
          include: { membro: true },
        },
      },
      orderBy: { data: "desc" },
    });
    res.json(chamadas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar chamadas" });
  }
});

export default router;
