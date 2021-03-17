import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Answers extends BaseSchema {
  protected tableName = 'answers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 36).primary()
      table.string('respondent_id', 36).references('id').inTable('respondents').onDelete('CASCADE').notNullable()
      table.string('question_id', 36).references('id').inTable('questions').onDelete('CASCADE').notNullable()
      table.string('answer').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
