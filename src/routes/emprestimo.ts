import { FastifyInstance } from 'fastify';
import { 
  getEmprestimos, 
  getEmprestimoById, 
  createEmprestimo, 
  finalizarEmprestimo, 
  finalizarAtraso, 
  deleteAtraso, 
  deleteEmprestimo, 
} from '../controllers/emprestimo.ts';

export default async function emprestimoRoutes(server: FastifyInstance) {
  // Busca todos os Emprestimos
  server.get('/emprestimos', {
    schema: {
      description: 'Get all Emprestimos',
      tags: ['Emprestimos'],
    }
  }, getEmprestimos);

  // Busca Emprestimo pelo ID
  server.get('/emprestimos/:id', {
    schema: {
      description: 'Get Emprestimo by ID',
      tags: ['Emprestimos'],
    }
  }, getEmprestimoById);

  // Cria Emprestimo
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
          dataFim: { type: 'string', format: 'date' }
        },
        required: ['alunoId', 'livroId', 'dataInicio', 'dataFim']
      }
    }
  }, createEmprestimo);

  // Finaliza Emprestimo (e cria atraso, se necessário)
  server.put('/emprestimos/:id/finalizar', {
    schema: {
      description: 'Finaliza Emprestimo e cria Atraso se necessário',
      tags: ['Emprestimos'],
    }
  }, finalizarEmprestimo);

  // Finaliza Atraso (marca como pago)
  server.put('/emprestimos/:id/atraso/finalizar', {
    schema: {
      description: 'Finaliza o Atraso relacionado ao Emprestimo',
      tags: ['Emprestimos'],
    }
  }, finalizarAtraso);

  // Deleta Emprestimo
  server.delete('/emprestimos/:id/atraso', {
    schema: {
      description: 'Delete Atraso',
      tags: ['Emprestimos'],
    }
  }, deleteAtraso);

  // Deleta Emprestimo
  server.delete('/emprestimos/:id', {
    schema: {
      description: 'Delete Emprestimo',
      tags: ['Emprestimos'],
    }
  }, deleteEmprestimo);
}
