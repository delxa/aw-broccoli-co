import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { API } from '../../../Services/AWContactService'
import * as actions from '../Enquiry'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({ enquiry: {} })

describe('Enquiry actions', () => {

  afterEach(() => {
    store.clearActions()
  });

  test('creates CREATED_ENQUIRY after successfully submitting post data', () => {
    const expectedActions = [
      { type: actions.CREATE_ENQUIRY },
      { type: actions.CREATED_ENQUIRY },
    ]

    API.createEnquiry = jest.fn(() => Promise.resolve({result: 'ok'}))

    return store.dispatch(actions.createEnquiry({ name: 'Test', email: 'test@test.co', confirm: 'test@test.co' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        API.createEnquiry.mockReset()
    })
  })

  test('creates CREATE_ENQUIRY_FAILED after failure during submission of post data', () => {
    const expectedActions = [
      { type: actions.CREATE_ENQUIRY },
      { type: actions.CREATE_ENQUIRY_FAILED, failure: 'Because reasons' },
    ]

    API.createEnquiry = jest.fn(() => Promise.reject(new Error('Because reasons')))
    return store.dispatch(actions.createEnquiry({ name: 'Test', email: 'test@test.co', confirm: 'test@test.co' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        API.createEnquiry.mockReset()
    })
  })

})
