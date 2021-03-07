import { Account } from '../../domain/entities/Account'
import { DynamoDbHelper } from '../../../lib/database/dynamodb/DynamoDbHelper'
import { AddAccountRepository } from '../contracts/accounts/AddAccountRepository'

export class AccountDynamoDbRepository implements AddAccountRepository {
  constructor (private readonly tableName: string = 'accounts') {}
  async add (account: Account): Promise<Account> {
    await DynamoDbHelper.client.put({
      TableName: this.tableName,
      Item: account
    }).promise()

    return account
  }
}
