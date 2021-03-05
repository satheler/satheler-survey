import DynamoDB, { DocumentClient } from 'aws-sdk/clients/dynamodb'

type ConnectParams = DocumentClient.DocumentClientOptions & DynamoDB.Types.ClientConfiguration

export const DynamoDbHelper = {
  connect (params?: ConnectParams): void {
    const config = params ?? {}
    this.client = new DocumentClient(config)
  },

  client: null as DocumentClient
}
