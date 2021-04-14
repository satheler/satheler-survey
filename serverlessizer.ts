import 'reflect-metadata'
import { ServerContract } from '@ioc:Adonis/Core/Server'
import { Ignitor } from '@adonisjs/core/build/standalone'
import Serverlessize from '@satheler/s12r'

let server: ServerContract

async function bootstrapServer () {
  const ignitor = new Ignitor(__dirname)
  const httpServer = ignitor.httpServer()

  httpServer.application.setup()
  httpServer.application.registerProviders()
  await httpServer.application.bootProviders()
  httpServer.application.requirePreloads()

  const server = httpServer.application.container.use('Adonis/Core/Server')
  server.optimize()
  server.errorHandler('App/Exceptions/ExceptionHandler')

  return server
}

export const handle = async (...args: any[]) => {
  if(!server) {
    server = await bootstrapServer()
  }

  const { request, response } = Serverlessize(args)
  return server.handle(request, response)
}
