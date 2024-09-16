import { FastifyInstance } from 'fastify';

import { getLivros, getLivroById, createLivro, updateLivro, deleteLivro } from '../controllers/livro.ts';

export default async function livroRoutes(server: FastifyInstance) {
  server.get('/livros', {
    schema: {
      description: 'Get all Livros',
      tags: ['Livros'],
    }
  }, getLivros);

  server.get('/livros/:id', {
    schema: {
      description: 'Get Livro by ID',
      tags: ['Livros'],
    }
  }, getLivroById);

  server.post('/livros', {
    schema: {
      description: 'Create Livro',
      tags: ['Livros'],
      body: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          autor: { type: 'string' },
          quantidadeDisponivel: { type: 'number' }
        },
        required: ['nome', 'autor', 'quantidadeDisponivel']
      }
    }
  }, createLivro);

  server.put('/livros/:id', {
    schema: {
      description: 'Update Livro',
      tags: ['Livros'],
    }
  }, updateLivro);

  server.delete('/livros/:id', {
    schema: {
      description: 'Delete Livro',
      tags: ['Livros'],
    }
  }, deleteLivro);
}
