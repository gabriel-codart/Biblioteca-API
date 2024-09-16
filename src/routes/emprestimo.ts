import { FastifyInstance } from 'fastify';

import { getEmprestimos, getEmprestimoById, createEmprestimo, updateEmprestimo, deleteEmprestimo } from '../controllers/emprestimo.ts';

export default async function emprestimoRoutes(server: FastifyInstance) {
  server.get('/emprestimos', {
    schema: {
      description: 'Get all Emprestimos',
      tags: ['Emprestimos'],
    }
  }, getEmprestimos);

  server.get('/emprestimos/:id', {
    schema: {
      description: 'Get Emprestimo by ID',
      tags: ['Emprestimos'],
    }
  }, getEmprestimoById);

  server.post('/emprestimos', {
    schema: {
      description: 'Create Emprestimo',
      tags: ['Emprestimos'],
      body: {
        type: 'object',
        properties: {
          alunoId: { type: 'number' },
          livroId: { type: 'number' },
          dataInicio: { type: 'string', format: 'date' },
          dataFim: { type: 'string', format: 'date' },
          atrasado: { type: 'boolean' }
        },
        required: ['alunoId', 'livroId', 'dataInicio', 'dataFim', 'atrasado']
      }
    }
  }, createEmprestimo);

  server.put('/emprestimos/:id', {
    schema: {
      description: 'Update Emprestimo',
      tags: ['Emprestimos'],
    }
  }, updateEmprestimo);

  server.delete('/emprestimos/:id', {
    schema: {
      description: 'Delete Emprestimo',
      tags: ['Emprestimos'],
    }
  }, deleteEmprestimo);
}
