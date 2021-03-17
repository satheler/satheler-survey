import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Respondents extends BaseSchema {
  protected tableName = 'respondents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 36).primary()
      table.string('account_id', 36).references('id').inTable('accounts').onDelete('CASCADE').nullable()
      table.string('survey_id', 36).references('id').inTable('surveys').onDelete('CASCADE').notNullable()

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
