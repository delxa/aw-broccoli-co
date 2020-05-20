import { API } from '../../Services/AWContactService'

/*
 * action types
 */

export const CREATE_ENQUIRY_FAILED = 'CREATE_ENQUIRY_FAILED'
export const CREATED_ENQUIRY = 'CREATED_ENQUIRY'
export const CREATE_ENQUIRY = 'CREATE_ENQUIRY'
export const SHOW_ENQUIRY_MODAL = 'SHOW_ENQUIRY_MODAL'
export const HIDE_ENQUIRY_MODAL = 'HIDE_ENQUIRY_MODAL'
export const TOGGLE_ENQUIRY_MODAL = 'TOGGLE_ENQUIRY_MODAL'

/*
 * action creators
 */

export function createFailed (failure) {
  return { type: CREATE_ENQUIRY_FAILED, failure }
}

export function createdEnquiry () {
  return { type: CREATED_ENQUIRY }
}

export function creatingEnquiry () {
  return { type: CREATE_ENQUIRY }
}

export function showEnquiryModal () {
  return { type: SHOW_ENQUIRY_MODAL }
}

export function hideEnquiryModal () {
  return { type: HIDE_ENQUIRY_MODAL }
}

export function toggleEnquiryModal () {
  return { type: TOGGLE_ENQUIRY_MODAL }
}

/*
 * async action creators
 */

export function createEnquiry (body) {
  return function (dispatch) {
    dispatch(creatingEnquiry())
    API.createEnquiry(body)
      .then(data => dispatch(createdEnquiry()))
      .catch(err => dispatch(createFailed(err.message)))
  }
}

