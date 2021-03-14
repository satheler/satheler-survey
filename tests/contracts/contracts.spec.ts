import * as contracts from '../../contracts'

describe('Sanity of contracts', () => {
  test('Should export all types and interfaces from contracts', () => {
    expect(contracts).toBeTruthy()
  })
})
