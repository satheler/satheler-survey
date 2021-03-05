import { AddAccountRepository } from '../../data/contracts/AddAccountRepository'
import { Account } from '../../models/Account'
import { DynamoDbHelper } from '../../../lib/database/dynamodb/DynamoDbHelper'

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
