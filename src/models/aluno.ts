export class Aluno {
	id: number;
	matricula: string;
	nome: string;
	email: string;
  
	constructor(id: number, matricula: string, nome: string, email: string) {
	  this.id = id;
	  this.matricula = matricula;
	  this.nome = nome;
	  this.email = email;
	}
}