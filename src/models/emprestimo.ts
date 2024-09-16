export class Emprestimo {
    id: number;
    alunoId: number;
    livroId: number;
    dataInicio: Date;
    dataFim: Date;
    atrasado: boolean;
  
    constructor(id: number, alunoId: number, livroId: number, dataInicio: Date, dataFim: Date, atrasado: boolean) {
      this.id = id;
      this.alunoId = alunoId;
      this.livroId = livroId;
      this.dataInicio = dataInicio;
      this.dataFim = dataFim;
      this.atrasado = atrasado;
    }
}  