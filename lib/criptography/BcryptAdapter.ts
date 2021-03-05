import bcrypt from 'bcrypt'
import { Encrypter } from '../../contracts'

export class BcryptAdapter implements Encrypter {
  constructor (
    private readonly salt: number = 12
  ) {}

  async encrypt (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
