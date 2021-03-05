export default {
  PORT: process.env.PORT ?? 8000,
  LOCALSTACK_ENDPOINT: process.env.LOCALSTACK_ENDPOINT || 'http://localstack:4566'
}
