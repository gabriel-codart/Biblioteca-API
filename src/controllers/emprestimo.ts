import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Emprestimo } from '../models/emprestimo';

const prisma = new PrismaClient();

// Busca todos os Emprestimos
export const getEmprestimos = async (request: FastifyRequest, reply: FastifyReply) => {
  const emprestimos = await prisma.emprestimo.findMany({
    include: {
      aluno: true,   // Inclui o aluno relacionado ao empréstimo
      livro: true,  // Inclui o livro relacionado ao empréstimo
      atrasos: true,  // Inclui os atrasos relacionados ao empréstimo
    },
    orderBy: {
      id: 'desc'
    }
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
      aluno: true,   // Inclui o aluno relacionado ao empréstimo
      livro: true,  // Inclui o livro relacionado ao empréstimo
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
  const { alunoId, livroId, dataInicio, dataFim } = request.body as { alunoId: number, livroId: number, dataInicio: string, dataFim: string };

  try {
    // Converte strings para objetos Date
    const dataInicioDate = new Date(dataInicio);
    const dataFimDate = new Date(dataFim);

    // Cria o empréstimo
    const emprestimo = await prisma.emprestimo.create({
      data: {
        alunoId,
        livroId,
        dataInicio: dataInicioDate,
        dataFim: dataFimDate,
      },
    });

    // Decrementa a quantidade disponível do livro
    await prisma.livro.update({
      where: { id: livroId },
      data: {
        quantidadeDisponivel: {
          decrement: 1,
        },
      },
    });

    reply.send({ emprestimo });
  } catch (error) {
    console.error('Erro ao criar emprestimo:', error);
    reply.status(500).send({ error: 'Erro ao criar o empréstimo' });
  }
};

// Finaliza Emprestimo
export const finalizarEmprestimo = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
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

    // Insere a data de devolução
    await prisma.emprestimo.update({
      where: { id: emprestimo.id },
      data: {
        dataDevolucao: dataDevolucao,
        atrasado: dataDevolucao > emprestimo.dataFim,
      },
    });

    // Incrementa a quantidade disponível do livro
    await prisma.livro.update({
      where: { id: emprestimo.livroId },
      data: {
        quantidadeDisponivel: {
          increment: 1,
        },
      },
    });

    reply.send({ message: 'Empréstimo finalizado com sucesso', atraso });
  } catch (error) {
    console.error('Erro ao finalizar o empréstimo:', error);
    reply.status(500).send({ error: 'Erro ao finalizar o empréstimo' });
  }
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
