import Event from '@ioc:Adonis/Core/Event'

import Database, { ConnectionNode } from '@ioc:Adonis/Lucid/Database'

const REPLICATION_DATA_METHODS = ['insert', 'update', 'delete']

async function replicateData (connection: ConnectionNode, sql: string, bindings?: any[]) {
  const { connectionName } = Database.connection()

  if(connection.name === connectionName) {
    return
  }

  await Database.connection(connection.name).rawQuery(sql, bindings)
}

Event.on('db:query', ({ method, sql, bindings }) => {
  if(!REPLICATION_DATA_METHODS.includes(method)) {
    return
  }

  Database.manager.connections.forEach(connection => {
    setTimeout(async () => await replicateData(connection, sql, bindings), 2000)
  })
})
