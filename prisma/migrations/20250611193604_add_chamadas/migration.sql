-- CreateTable
CREATE TABLE "Chamada" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chamada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presenca" (
    "id" SERIAL NOT NULL,
    "membroId" INTEGER NOT NULL,
    "chamadaId" INTEGER NOT NULL,

    CONSTRAINT "Presenca_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Presenca" ADD CONSTRAINT "Presenca_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "Membro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presenca" ADD CONSTRAINT "Presenca_chamadaId_fkey" FOREIGN KEY ("chamadaId") REFERENCES "Chamada"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
