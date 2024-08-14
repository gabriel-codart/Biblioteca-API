import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

// Cliente Prisma
const prisma = new PrismaClient();

// Repositorio de Usuários
let alunos = prisma.aluno;

// Busca todos os Usuários
export const getAlunos = async (request: FastifyRequest, reply: FastifyReply) => {
  let res = await alunos.findMany();
  reply.send(res);
};

// Busca Usuário pelo ID
export const getAlunoById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  let res = await alunos.findFirst({
    where: {
      id: id
    }
  });

  reply.send(res);
};

// Cria Usuário
export const createAluno = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, email, password } = request.body as { name: string, email: string, password: string };

  users.push(new User((users.length), name, email, password));
  
  reply.send(`User ${name} CREATED`);
};

// Atualiza Usuário
export const updateAluno = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const { name, email, password } = request.body as { name: string, email: string, password: string };

  users[Number(id)] = new User(Number(id), name, email, password);
  
  reply.send(`User ${id} UPDATED`);
};

// Deleta Usuário
export const deleteAluno = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  users.splice(Number(id), 1);
  
  reply.send(`User ${id} DELETED`);
};