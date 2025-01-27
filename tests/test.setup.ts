import * as expect from 'expect'
import { cleanup } from '@testing-library/react'
import { MessageChannel } from 'worker_threads'

expect.extend({
  toBeAround (actual, expected, precision = 2) {
    const pass = (actual <= expected + precision && actual >= expected - precision)
    if (pass) {
      return {
        message: () => `expected ${actual} to not be within ${precision} of ${expected}`,
        pass: true
      }
    } else {
      return {
        message: () => `expected ${actual} to be within ${precision} of ${expected}`,
        pass: false
      }
    }
  }
})

jest.mock('worker-timers', () => ({
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval
}))

beforeAll(() => {
  // @ts-ignore
  global.MessageChannel = MessageChannel
})

afterAll(cleanup)
