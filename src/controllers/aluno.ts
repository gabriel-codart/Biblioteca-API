import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Aluno } from '../models/aluno';

const prisma = new PrismaClient();

// Busca todos os Alunos
export const getAlunos = async (request: FastifyRequest, reply: FastifyReply) => {
  const alunos = await prisma.aluno.findMany({});
  reply.send({ alunos });
};

// Busca Aluno pelo ID
export const getAlunoById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const aluno = await prisma.aluno.findUnique({
    where: { id: Number(id) },
  });
  reply.send({ aluno });
};

// Cria Aluno
export const createAluno = async (request: FastifyRequest, reply: FastifyReply) => {
  const { matricula, nome, email } = request.body as { matricula: string, nome: string, email: string };
  const aluno = await prisma.aluno.create({
    data: { matricula, nome, email },
  });
  reply.send({ aluno });
};

// Atualiza Aluno
export const updateAluno = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const { matricula, nome, email } = request.body as { matricula: string, nome: string, email: string };
  const aluno = await prisma.aluno.update({
    where: { id: Number(id) },
    data: { matricula, nome, email },
  });
  reply.send({ aluno });
};

// Deleta Aluno
export const deleteAluno = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  await prisma.aluno.delete({
    where: { id: Number(id) },
  });
  reply.send(`Aluno ${id} DELETED`);
};
