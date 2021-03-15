import { BaseModel, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { BelongsTo } from '@ioc:Adonis/Lucid/Relations'
import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import { Question } from '.'

export default class SurveyAnswer extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public questionId: string

  @belongsTo(() => Question)
  public question: BelongsTo<typeof Question>

  @column()
  public answer: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID (model: SurveyAnswer) {
    model.id = uuid()
  }
}
