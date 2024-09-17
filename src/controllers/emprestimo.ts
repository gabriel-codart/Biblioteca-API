import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Emprestimo } from '../models/emprestimo';

const prisma = new PrismaClient();

// Busca todos os Emprestimos
export const getEmprestimos = async (request: FastifyRequest, reply: FastifyReply) => {
  const emprestimos = await prisma.emprestimo.findMany({
    include: {
      atrasos: true,  // Inclui os atrasos relacionados ao empréstimo
    },
  });
  reply.send({ emprestimos });
};

// Busca Emprestimo pelo ID
export const getEmprestimoById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const emprestimo = await prisma.emprestimo.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      atrasos: true,  // Inclui os atrasos relacionados ao empréstimo
    },
  });

  if (!emprestimo) {
    return reply.status(404).send({ message: 'Empréstimo não encontrado' });
  }
  
  reply.send({ emprestimo });
};

// Cria Emprestimo
export const createEmprestimo = async (request: FastifyRequest, reply: FastifyReply) => {
  const { alunoId, livroId, dataInicio, dataFim } = request.body as { alunoId: number, livroId: number, dataInicio: Date, dataFim: Date };
  const emprestimo = await prisma.emprestimo.create({
    data: { alunoId, livroId, dataInicio, dataFim },
  });
  reply.send({ emprestimo });
};

// Finaliza Emprestimo
export const finalizarEmprestimo = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  
  // Buscar o empréstimo atual
  const emprestimo = await prisma.emprestimo.findUnique({
    where: { id: Number(id) },
  });

  if (!emprestimo) {
    return reply.status(404).send({ message: 'Empréstimo não encontrado' });
  }

  // Obter a data atual
  const dataDevolucao = new Date();

  // Verificar se a data atual está após a data de fim
  let atraso = null;
  if (dataDevolucao > emprestimo.dataFim) {
    const diasAtraso = Math.ceil((dataDevolucao.getTime() - emprestimo.dataFim.getTime()) / (1000 * 60 * 60 * 24));
    const valorAtraso = diasAtraso * 1; // R$1 por dia de atraso
    
    // Criar o registro de atraso
    atraso = await prisma.atraso.create({
      data: {
        emprestimoId: emprestimo.id,
        valor: valorAtraso,
        pago: false,
      },
    });
  }

  // Atualizar a data de devolução no empréstimo
  const emprestimoAtualizado = await prisma.emprestimo.update({
    where: { id: Number(id) },
    data: {
      dataDevolucao: dataDevolucao,
      atrasado: dataDevolucao > emprestimo.dataFim, // marcar como atrasado, se aplicável
    },
  });

  reply.send({ emprestimoAtualizado, atraso });
};

// Finaliza Atraso
export const finalizarAtraso = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  // Buscar o atraso relacionado ao empréstimo
  const atraso = await prisma.atraso.findFirst({
    where: { emprestimoId: Number(id) },
  });

  if (!atraso) {
    return reply.status(404).send({ message: 'Atraso não encontrado para o empréstimo' });
  }

  // Atualizar o campo "pago" para true
  const atrasoFinalizado = await prisma.atraso.update({
    where: { id: atraso.id },
    data: { pago: true },
  });

  reply.send({ message: 'Atraso finalizado com sucesso', atrasoFinalizado });
};

// Deleta Atraso
export const deleteAtraso = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  // Buscar o atraso relacionado ao empréstimo
  const atraso = await prisma.atraso.findFirst({
    where: { emprestimoId: Number(id) },
  });

  if (!atraso) {
    return reply.status(404).send({ message: 'Atraso não encontrado para o empréstimo' });
  }

  await prisma.atraso.delete({
    where: { id: atraso.id },
  });
  reply.send(`Atraso ${id} DELETED`);
};


// Deleta Emprestimo
export const deleteEmprestimo = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  await prisma.emprestimo.delete({
    where: { id: Number(id) },
  });
  reply.send(`Emprestimo ${id} DELETED`);
};
