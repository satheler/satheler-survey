export interface TokenGenerator {
  generate: (value: string) => Promise<string>
}
