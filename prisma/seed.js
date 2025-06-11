import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criar 15 membros
  const membros = await Promise.all(
    Array.from({ length: 15 }).map((_, i) =>
      prisma.membro.create({
        data: { nome: `Membro ${i + 1}` },
      })
    )
  );

  // Criar 5 chamadas (datas diferentes)
  const chamadas = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.chamada.create({
        data: {
          data: new Date(Date.now() - i * 86400000), // dias anteriores
        },
      })
    )
  );

  // Marcar presença aleatória
  for (const chamada of chamadas) {
    const presentes = membros
      .filter(() => Math.random() < 0.7) // 70% chance de presença
      .map((m) => ({
        membroId: m.id,
        chamadaId: chamada.id,
      }));

    for (const p of presentes) {
      await prisma.presenca.create({ data: p });
    }
  }

  console.log("Seed finalizado com sucesso.");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
