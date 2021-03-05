import dotenv from 'dotenv'
dotenv.config()

export default {
  PORT: process.env.PORT ?? 8000,
  LOCALSTACK_ENDPOINT: process.env.LOCALSTACK_ENDPOINT || 'http://0.0.0.0:4566'
}
