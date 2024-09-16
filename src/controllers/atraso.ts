import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Atraso } from '../models/atraso';

const prisma = new PrismaClient();

// Busca todos os Atrasos
export const getAtrasos = async (request: FastifyRequest, reply: FastifyReply) => {
  const atrasos = await prisma.atraso.findMany({});
  reply.send({ atrasos });
};

// Busca Atraso pelo ID
export const getAtrasoById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const atraso = await prisma.atraso.findUnique({
    where: { id: Number(id) },
  });
  reply.send({ atraso });
};

// Cria Atraso
export const createAtraso = async (request: FastifyRequest, reply: FastifyReply) => {
  const { emprestimoId, dataDevolucao, valor, pago } = request.body as { emprestimoId: number, dataDevolucao: Date, valor: number, pago: boolean };
  const atraso = await prisma.atraso.create({
    data: { emprestimoId, dataDevolucao, valor, pago },
  });
  reply.send({ atraso });
};

// Atualiza Atraso
export const updateAtraso = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const { emprestimoId, dataDevolucao, valor, pago } = request.body as { emprestimoId: number, dataDevolucao: Date, valor: number, pago: boolean };
  const atraso = await prisma.atraso.update({
    where: { id: Number(id) },
    data: { emprestimoId, dataDevolucao, valor, pago },
  });
  reply.send({ atraso });
};

// Deleta Atraso
export const deleteAtraso = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  await prisma.atraso.delete({
    where: { id: Number(id) },
  });
  reply.send(`Atraso ${id} DELETED`);
};
