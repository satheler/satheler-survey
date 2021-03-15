import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Questions extends BaseSchema {
  protected tableName = 'questions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 36).primary()
      table.string('question').notNullable()
      table.boolean('is_required')
      table.string('survey_id', 36).references('id').inTable('surveys').onDelete('CASCADE').notNullable()

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
