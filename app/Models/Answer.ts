import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { Question, Respondent } from 'App/Models'
import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'

export default class Answer extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public questionId: string

  @belongsTo(() => Question)
  public question: BelongsTo<typeof Question>

  @column()
  public respondentId: string

  @belongsTo(() => Respondent)
  public respondents: BelongsTo<typeof Respondent>

  @column()
  public answer: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID (model: Answer) {
    model.id = uuid()
  }
}
