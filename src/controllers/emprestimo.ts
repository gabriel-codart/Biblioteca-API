import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Emprestimo } from '../models/emprestimo';

const prisma = new PrismaClient();

// Busca todos os Emprestimos
export const getEmprestimos = async (request: FastifyRequest, reply: FastifyReply) => {
  const emprestimos = await prisma.emprestimo.findMany({});
  reply.send({ emprestimos });
};

// Busca Emprestimo pelo ID
export const getEmprestimoById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const emprestimo = await prisma.emprestimo.findUnique({
    where: { id: Number(id) },
  });
  reply.send({ emprestimo });
};

// Cria Emprestimo
export const createEmprestimo = async (request: FastifyRequest, reply: FastifyReply) => {
  const { alunoId, livroId, dataInicio, dataFim, atrasado } = request.body as { alunoId: number, livroId: number, dataInicio: Date, dataFim: Date, atrasado: boolean };
  const emprestimo = await prisma.emprestimo.create({
    data: { alunoId, livroId, dataInicio, dataFim, atrasado },
  });
  reply.send({ emprestimo });
};

// Atualiza Emprestimo
export const updateEmprestimo = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const { alunoId, livroId, dataInicio, dataFim, atrasado } = request.body as { alunoId: number, livroId: number, dataInicio: Date, dataFim: Date, atrasado: boolean };
  const emprestimo = await prisma.emprestimo.update({
    where: { id: Number(id) },
    data: { alunoId, livroId, dataInicio, dataFim, atrasado },
  });
  reply.send({ emprestimo });
};

// Deleta Emprestimo
export const deleteEmprestimo = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  await prisma.emprestimo.delete({
    where: { id: Number(id) },
  });
  reply.send(`Emprestimo ${id} DELETED`);
};
