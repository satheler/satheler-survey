import Event from '@ioc:Adonis/Core/Event'

import Database, { ConnectionNode } from '@ioc:Adonis/Lucid/Database'

type DataRedendancy = {
  sql: string
  bindings?: any[]
}

const REPLICATION_DATA_METHODS = ['insert', 'update', 'delete']
const replicationDataQueue: DataRedendancy[] = []

const { connectionName: mainConnection } = Database.connection()
const databaseConnections = new Map(Database.manager.connections)
databaseConnections.delete(mainConnection)

setInterval(() => {
  if (replicationDataQueue.length === 0) {
    return
  }

  const { sql, bindings } = replicationDataQueue[0]!

  databaseConnections.forEach(connection => {
    replicateData(connection, sql, bindings)
      .then(() => replicationDataQueue.shift())
      .catch(() => {})
  })
}, 1000)

async function replicateData (connection: ConnectionNode, sql: string, bindings?: any[]) {
  return Database.connection(connection.name).rawQuery(sql, bindings)
}

Event.on('db:query', ({ method, sql, bindings }) => {
  if (!REPLICATION_DATA_METHODS.includes(method)) {
    return
  }

  replicationDataQueue.push({ sql, bindings })
})
