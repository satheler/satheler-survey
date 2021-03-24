import 'reflect-metadata'
import { ServerContract } from '@ioc:Adonis/Core/Server'
import { Ignitor } from '@adonisjs/core/build/standalone'
import AwsAdapter from './start/adapters/AwsLambdaAdapter'

let server: ServerContract

async function bootstrapServer () {
  const ignitor = new Ignitor(__dirname)
  const httpServer = ignitor.httpServer()

  httpServer.application.setup()
  httpServer.application.registerProviders()
  httpServer.application.requirePreloads()
  await httpServer.application.bootProviders()

  const server = httpServer.application.container.use('Adonis/Core/Server')
  server.optimize()

  return server
}

export const handle = async (event: any, _context: any, callback: any) => {
  const { request, response } = AwsAdapter(event, callback)

  if(!server) {
    server = await bootstrapServer()
  }

  return server.handle(request, response)
}
