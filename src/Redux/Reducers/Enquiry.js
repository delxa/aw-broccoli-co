import {
  CREATE_ENQUIRY_FAILED,
  CREATED_ENQUIRY,
  CREATE_ENQUIRY,
  SHOW_ENQUIRY_MODAL,
  HIDE_ENQUIRY_MODAL,
  TOGGLE_ENQUIRY_MODAL
} from '../Actions/Enquiry'

const initialState = {
  failure: false,
  creating: false,
  success: false,
  showModal: false
}

export default function enquiryReducer (state = initialState, action) {
  switch (action.type) {

    case CREATED_ENQUIRY:
      return Object.assign({}, state, {
        creating: false,
        success: true
      })

    case CREATE_ENQUIRY:
      return Object.assign({}, state, {
        creating: true
      })

    case CREATE_ENQUIRY_FAILED:
      return Object.assign({}, state, {
        creating: false,
        failure: action.failure
      })

    case SHOW_ENQUIRY_MODAL:
      return Object.assign({}, state, {
        showModal: true
      })

    case HIDE_ENQUIRY_MODAL:
      return Object.assign({}, state, {
        showModal: false
      })

    case TOGGLE_ENQUIRY_MODAL:
      return Object.assign({}, state, {
        showModal: !state.showModal
      })

    default:
      return state
  }
}
