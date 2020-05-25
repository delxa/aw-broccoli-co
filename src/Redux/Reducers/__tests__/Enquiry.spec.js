/* eslint-env jest, mocha */

import enquiryReducer from '../Enquiry'

const initialState = {
  failure: false,
  creating: false,
  success: false,
  showModal: false
}

describe('Enquiry Reducer', () => {
  let updatedState = {}

  test('handles SHOW_ENQUIRY_MODAL action', () => {
    updatedState = {
      failure: false,
      creating: false,
      success: false,
      showModal: true
    }
    expect(
      enquiryReducer(
        { ...initialState },
        { type: 'SHOW_ENQUIRY_MODAL' }
      )
    ).toEqual(updatedState)
  })

  test('handles HIDE_ENQUIRY_MODAL action', () => {
    expect(
      enquiryReducer(
        { ...initialState, showModal: true },
        { type: 'HIDE_ENQUIRY_MODAL' }
      )
    ).toEqual(initialState)
  })

  test('handles TOGGLE_ENQUIRY_MODAL action', () => {
    updatedState = {
      failure: false,
      creating: false,
      success: false,
      showModal: true
    }
    expect(
      enquiryReducer(
        { ...initialState },
        { type: 'TOGGLE_ENQUIRY_MODAL' }
      )
    ).toEqual(updatedState)
  })

  test('handles CREATED_ENQUIRY action', () => {
    updatedState = {
      failure: false,
      creating: false,
      success: true,
      showModal: false
    }
    expect(
      enquiryReducer(
        { ...initialState, creating: true },
        { type: 'CREATED_ENQUIRY' }
      )
    ).toEqual(updatedState)
  })

  test('handles CREATE_ENQUIRY action', () => {
    updatedState = {
      failure: false,
      creating: true,
      success: false,
      showModal: false
    }
    expect(
      enquiryReducer(
        { ...initialState },
        { type: 'CREATE_ENQUIRY' }
      )
    ).toEqual(updatedState)
  })

  test('handles CREATE_ENQUIRY_FAILED action', () => {
    updatedState = {
      failure: 'Because reasons',
      creating: false,
      success: false,
      showModal: false
    }
    expect(
      enquiryReducer(
        { ...initialState, creating: true },
        { type: 'CREATE_ENQUIRY_FAILED', failure: 'Because reasons' }
      )
    ).toEqual(updatedState)
  })
})
