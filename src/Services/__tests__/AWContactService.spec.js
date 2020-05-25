/* eslint-env jest */
import moxios from 'moxios'
import AWContactService, { API } from '../AWContactService'

const mockRequest = { name: 'Test', email: 'test@test.co', confirm: 'test@test.co' }

describe('AWContactService', () => {
  describe('Class definition', () => {
    test('returns a singleton of AWContactService', () => {
      expect(API).toBeInstanceOf(AWContactService)
    })
  })

  describe('createEnquiry()', () => {
    beforeEach(function () {
      moxios.install()
    })

    afterEach(function () {
      moxios.uninstall()
    })

    test('returns the payload of a successful request', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: { success: true }
        })
      })
      expect(API.createEnquiry(mockRequest)).resolves.toBe({ success: true })
    })

    test('throws a specific error for Email already register', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 400,
          response: { errorMessage: 'Bad Request: Email is already in use' }
        })
      })
      expect(API.createEnquiry(mockRequest)).rejects.toThrow('Email already registered')
    })

    test('throws a non-specific error for anything else', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 400,
          response: { errorMessage: 'Bad Request: Tragic Consequences' }
        })
      })
      expect(API.createEnquiry(mockRequest)).rejects.toThrow('Bad Request: Tragic Consequences')
    })
  })
})
