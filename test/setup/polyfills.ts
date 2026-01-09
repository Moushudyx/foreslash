// Jest setup polyfills for Node/jsdom environment
// - Provide global TextEncoder/TextDecoder used by encodeBase64/decodeBase64
// - Keep it minimal to avoid interfering with other tests

// Use Node's util implementations
import { TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder } from 'util'

if (!(globalThis as any).TextEncoder) {
  ;(globalThis as any).TextEncoder = NodeTextEncoder
}

if (!(globalThis as any).TextDecoder) {
  ;(globalThis as any).TextDecoder = NodeTextDecoder as unknown as typeof TextDecoder
}
