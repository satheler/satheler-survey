const AWS = require('aws-sdk')

exports.handler = async (event) => {
  const lambda = new AWS.Lambda()

  const FunctionName = 'satheler-survey-develop-app'

  if (event.httpMethod === 'GET') {
    const { ReservedConcurrentExecutions } = await lambda.getFunctionConcurrency({ FunctionName }).promise()
    const isActive = ReservedConcurrentExecutions === null

    return {
      statusCode: 200,
      body: JSON.stringify({ is_active: isActive }),
    }
  }

  const body = event.body ? JSON.parse(event.body) : {}

  if (body.is_active && typeof body.is_active !== 'boolean') {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing or invalid `is_active` on body' }),
    }
  }

  if (body.is_active) {
    await lambda.deleteFunctionConcurrency({ FunctionName }).promise()
  } else {
    await lambda.putFunctionConcurrency({ FunctionName, ReservedConcurrentExecutions: 0 }).promise()
  }

  return {
    statusCode: 202,
    body: JSON.stringify({ is_active: body.is_active }),
  }
}
