import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Surveys extends BaseSchema {
  protected tableName = 'surveys'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 36).primary()
      table.string('name').notNullable()
      table.string('description').nullable()

      table.timestamp('opening_time', { useTz: true }).nullable()
      table.timestamp('closing_time', { useTz: true }).nullable()

      table.string('account_id', 36).references('id').inTable('accounts').onDelete('CASCADE').notNullable()
      table.boolean('authenticated_account_only').defaultTo(false)

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
