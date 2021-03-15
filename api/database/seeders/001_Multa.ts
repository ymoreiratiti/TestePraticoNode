import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Multa from 'App/Models/Multa'

export default class MultaSeeder extends BaseSeeder {
  public async run() {
    Multa.createMany([
      //  Até 3 dias
      { diasAtraso: 1, multa: 2, jurosDia: 0.1 },
      //  Superior a 3 dias
      { diasAtraso: 4, multa: 3, jurosDia: 0.2 },
      //  Superior a 5 dias
      { diasAtraso: 6, multa: 5, jurosDia: 0.3 },
    ])
  }
}
