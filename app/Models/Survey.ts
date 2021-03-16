import { BaseModel, beforeCreate, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import { Account, Question } from 'App/Models'

export default class Survey extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public accountId: string

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @hasMany(() => Question)
  public questions: HasMany<typeof Question>

  @column()
  public name: string

  @column({
    serialize: (value) => value ?? null,
  })
  public description?: string

  @column.dateTime()
  public openingTime?: DateTime

  @column.dateTime()
  public closingTime?: DateTime

  @column({
    serialize: (value) => value ? Boolean(value) : false,
  })
  public authenticatedAccountOnly: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID (model: Survey) {
    model.id = uuid()
  }

  @beforeCreate()
  public static setDefaultValues (model: Survey) {
    model.openingTime = model.openingTime ?? DateTime.now()
    model.authenticatedAccountOnly = model.authenticatedAccountOnly ?? true
  }
}
