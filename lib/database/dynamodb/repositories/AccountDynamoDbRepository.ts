import { AddAccountRepository } from '../../../../app/data/contracts/AddAccountRepository'
import { Account } from '../../../../app/models/Account'
import { DynamoDbHelper } from '../helpers/DynamoDbHelper'

export class AccountDynamoDbRepository implements AddAccountRepository {
  async add (account: Account): Promise<Account> {
    await DynamoDbHelper.client.put({
      TableName: 'accounts',
      Item: account
    }).promise()

    return account
  }
}
