export class Livro {
    id: number;
    nome: string;
    autor: string;
    quantidadeDisponivel: number;
  
    constructor(id: number, nome: string, autor: string, quantidadeDisponivel: number) {
      this.id = id;
      this.nome = nome;
      this.autor = autor;
      this.quantidadeDisponivel = quantidadeDisponivel;
    }
}  