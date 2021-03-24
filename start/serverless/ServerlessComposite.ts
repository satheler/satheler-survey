import { IncomingMessage, ServerResponse } from 'http'
import { AWSLambdaAdapter } from './AWSLambdaAdapter'

export type ServerlessResponse = {
  request: IncomingMessage
  response: ServerResponse
}

export type ServerlessHandlerParams = any[]

export interface ServerlessHandler {
  handle: (params: ServerlessHandlerParams) => ServerlessResponse
}

export class ServerlessComposite implements ServerlessHandler {
  public handle (params: ServerlessHandlerParams): ServerlessResponse {
    return this.aws(params)
  }

  private aws (params: ServerlessHandlerParams): ServerlessResponse {
    const awsAdapter = new AWSLambdaAdapter()
    return awsAdapter.handle(params)
  }
}
