export class Atraso {
    id: number;
    emprestimoId: number;
    dataDevolucao: Date;
    valor: number;
    pago: boolean;
  
    constructor(id: number, emprestimoId: number, dataDevolucao: Date, valor: number, pago: boolean) {
      this.id = id;
      this.emprestimoId = emprestimoId;
      this.dataDevolucao = dataDevolucao;
      this.valor = valor;
      this.pago = pago;
    }
}  