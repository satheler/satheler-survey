import { DynamoDB } from '@aws-sdk/client-dynamodb'

export const DynamoDbHelper = {
  connect (params?: any): void {
    const config = params ?? {}
    this.client = new DynamoDB(config)
  },

  client: null as DynamoDB
}
