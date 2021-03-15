import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contas extends BaseSchema {
  protected tableName = 'contas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nome').notNullable()
      table.decimal('valor_original', 10, 2).notNullable()
      table.decimal('valor_corrigido', 10, 2).notNullable()
      table.date('data_vencimento').notNullable()
      table.date('data_pagamento').notNullable()
      table.bigInteger('dias_atrasado').notNullable().unsigned() //  unsigned poís não existe dias atrasados negativo

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
