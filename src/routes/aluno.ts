import { FastifyInstance } from 'fastify';

import { getAlunos, getAlunoById, createAluno, updateAluno, deleteAluno } from '../controllers/aluno.ts';

export default async function alunoRoutes(server: FastifyInstance) {
  server.get('/alunos', {
    schema: {
      description: 'Get all Alunos',
      tags: ['Alunos'],
    }
  }, getAlunos);

  server.get('/alunos/:id', {
    schema: {
      description: 'Get Aluno by ID',
      tags: ['Alunos'],
    }
  }, getAlunoById);

  server.post('/alunos', {
    schema: {
      description: 'Create Aluno',
      tags: ['Alunos'],
      body: {
        type: 'object',
        properties: {
          matricula: { type: 'string' },
          nome: { type: 'string' },
          email: { type: 'string' }
        },
        required: ['matricula', 'nome', 'email']
      }
    }
  }, createAluno);

  server.put('/alunos/:id', {
    schema: {
      description: 'Update Aluno',
      tags: ['Alunos'],
    }
  }, updateAluno);

  server.delete('/alunos/:id', {
    schema: {
      description: 'Delete Aluno',
      tags: ['Alunos'],
    }
  }, deleteAluno);
}
