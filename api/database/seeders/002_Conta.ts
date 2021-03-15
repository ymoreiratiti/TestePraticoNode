import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Conta from 'App/Models/Conta'
import { DateTime } from 'luxon'

export default class ContaSeeder extends BaseSeeder {
  public async run() {
    //  Para efetuar a inserção de modo sincrono
    for (const objConta of contas) {
      const conta: Conta = new Conta()
      conta.nome = objConta.nome
      conta.valorOriginal = objConta.valorOriginal
      conta.dataVencimento = DateTime.fromISO(objConta.dataVencimento)
      conta.dataPagamento = DateTime.fromISO(objConta.dataPagamento)

      await conta.save()
    }
  }
}

const contas = [
  {
    nome: 'Aluguel',
    valorOriginal: 1000,
    dataVencimento: '2021-03-15',
    dataPagamento: '2021-03-10',
  },

  //  Pagou em dia, não tem multa
  {
    nome: 'Cartão de Crédito',
    valorOriginal: 2569.38,
    dataVencimento: '2021-03-10',
    dataPagamento: '2021-03-10',
  },

  //  Pagou 2 dias atrasado.
  //  2% de multa + 0,1% de mora
  //  52,69 + 1,0538 (Multa) + 0,05269 * 2 (Dias) = 53,84918 = 53,85
  {
    nome: 'Claro - Celular',
    valorOriginal: 52.69,
    dataVencimento: '2021-03-08',
    dataPagamento: '2021-03-10',
  },

  //  Pagou 4 dias atrasado
  //  3% de multa + 0,2% de mora
  //  144,99 + 4,3497 (Multa) + 0,28998 * 4 (Dias) = 150,49962 = 150,50
  {
    nome: 'GVT - Internet',
    valorOriginal: 144.99,
    dataVencimento: '2021-03-06',
    dataPagamento: '2021-03-10',
  },

  //  Pagou 10 dias atrasado
  //  5% de multa + 0,3% de mora
  //  350,33 + 17,5165 (Multa) + 1,05099 * 10 (Dias) = 378,3564 = 378,36
  {
    nome: 'Energia Elétrica',
    valorOriginal: 350.33,
    dataVencimento: '2021-03-01',
    dataPagamento: '2021-03-11',
  },
]
