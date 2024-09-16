import { FastifyInstance } from 'fastify';

import { getAtrasos, getAtrasoById, createAtraso, updateAtraso, deleteAtraso } from '../controllers/atraso.ts';

export default async function atrasoRoutes(server: FastifyInstance) {
  server.get('/atrasos', {
    schema: {
      description: 'Get all Atrasos',
      tags: ['Atrasos'],
    }
  }, getAtrasos);

  server.get('/atrasos/:id', {
    schema: {
      description: 'Get Atraso by ID',
      tags: ['Atrasos'],
    }
  }, getAtrasoById);

  server.post('/atrasos', {
    schema: {
      description: 'Create Atraso',
      tags: ['Atrasos'],
      body: {
        type: 'object',
        properties: {
          emprestimoId: { type: 'number' },
          dataDevolucao: { type: 'string', format: 'date' },
          valor: { type: 'number' },
          pago: { type: 'boolean' }
        },
        required: ['emprestimoId', 'dataDevolucao', 'valor', 'pago']
      }
    }
  }, createAtraso);

  server.put('/atrasos/:id', {
    schema: {
      description: 'Update Atraso',
      tags: ['Atrasos'],
    }
  }, updateAtraso);

  server.delete('/atrasos/:id', {
    schema: {
      description: 'Delete Atraso',
      tags: ['Atrasos'],
    }
  }, deleteAtraso);
}
