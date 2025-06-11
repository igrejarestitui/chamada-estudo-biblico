import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Criar membro
router.post("/", async (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ error: "Nome é obrigatório" });

  try {
    const membro = await prisma.membro.create({ data: { nome } });
    res.status(201).json(membro);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar membro" });
  }
});

// Listar membros
router.get("/", async (req, res) => {
  try {
    const membros = await prisma.membro.findMany();
    res.json(membros);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar membros" });
  }
});

// Top 10 membros com mais presenças
router.get("/top", async (req, res) => {
  try {
    const topMembros = await prisma.membro.findMany({
      orderBy: {
        presencas: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: { presencas: true },
        },
      },
      take: 10,
    });

    res.json(
      topMembros.map((m) => ({
        id: m.id,
        nome: m.nome,
        totalPresencas: m._count.presencas,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar top membros" });
  }
});
export default router;
