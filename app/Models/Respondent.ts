import { BaseModel, beforeCreate, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import { Account, Answer, Survey } from 'App/Models'

export default class Respondent extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public surveyId: string

  @belongsTo(() => Survey)
  public survey: BelongsTo<typeof Survey>

  @column()
  public accountId?: string

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @hasMany(() => Answer)
  public answers: HasMany<typeof Answer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID (model: Respondent) {
    model.id = uuid()
  }
}
