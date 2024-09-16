import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Livro } from '../models/livro';

const prisma = new PrismaClient();

// Busca todos os Livros
export const getLivros = async (request: FastifyRequest, reply: FastifyReply) => {
  const livros = await prisma.livro.findMany({});
  reply.send({ livros });
};

// Busca Livro pelo ID
export const getLivroById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const livro = await prisma.livro.findUnique({
    where: { id: Number(id) },
  });
  reply.send({ livro });
};

// Cria Livro
export const createLivro = async (request: FastifyRequest, reply: FastifyReply) => {
  const { nome, autor, quantidadeDisponivel } = request.body as { nome: string, autor: string, quantidadeDisponivel: number };
  const livro = await prisma.livro.create({
    data: { nome, autor, quantidadeDisponivel },
  });
  reply.send({ livro });
};

// Atualiza Livro
export const updateLivro = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const { nome, autor, quantidadeDisponivel } = request.body as { nome: string, autor: string, quantidadeDisponivel: number };
  const livro = await prisma.livro.update({
    where: { id: Number(id) },
    data: { nome, autor, quantidadeDisponivel },
  });
  reply.send({ livro });
};

// Deleta Livro
export const deleteLivro = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  await prisma.livro.delete({
    where: { id: Number(id) },
  });
  reply.send(`Livro ${id} DELETED`);
};
