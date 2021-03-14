import { ParsedTypedSchema } from '@ioc:Adonis/Core/Validator'

export type Validator = {
  schema: ParsedTypedSchema<any>
  cacheKey: string
  messages: Record<string, string>
}
