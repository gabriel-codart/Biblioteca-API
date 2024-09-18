import { Livro } from "./livro";
import { Aluno } from "./aluno";
import { Atraso } from "./atraso";

export class Emprestimo {
    id: number;
    alunoId: number;
    aluno: Aluno;
    livroId: number;
    livro: Livro;
    dataInicio: Date | string;
    dataFim: Date | string;
    dataDevolucao: Date | string;
    atrasado: boolean;
    atraso: Atraso;
  
    constructor(id: number, alunoId: number, aluno: Aluno, livroId: number, livro: Livro, dataInicio: Date | string, dataFim: Date | string, dataDevolucao: Date | string, atrasado: boolean, atraso: Atraso) {
      this.id = id;
      this.alunoId = alunoId;
      this.aluno = aluno;
      this.livroId = livroId;
      this.livro = livro;
      this.dataInicio = dataInicio;
      this.dataFim = dataFim;
      this.dataDevolucao = dataDevolucao;
      this.atrasado = atrasado;
      this.atraso = atraso;
    }
}  