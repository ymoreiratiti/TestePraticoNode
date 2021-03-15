import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Multas extends BaseSchema {
  protected tableName = 'multas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('dias_atraso').notNullable()
      table.decimal('multa', 10, 2).notNullable()
      table.decimal('juros_dia', 10, 2).notNullable()

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
