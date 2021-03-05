import { AddAccountRepository } from '../../../../app/data/contracts/AddAccountRepository'
import { Account } from '../../../../app/models/Account'
import { DynamoDbHelper } from '../helpers/DynamoDbHelper'
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
