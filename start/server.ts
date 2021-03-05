import { DynamoDbHelper } from '../lib/database/dynamodb/DynamoDbHelper'
import app from './config/app'
import env from './config/env'

DynamoDbHelper.connect({ endpoint: env.LOCALSTACK_ENDPOINT, sslEnabled: false, region: 'local' })
app.listen(env.PORT, () => console.log(`⚡️ Server running at http://localhost:${env.PORT}`))
