import React, { Component } from 'react'
import { Button, Modal, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import EnquiryForm from './EnquiryForm'
import { createEnquiry, hideEnquiryModal } from '../Redux/Actions/Enquiry'

class EnquiryModal extends Component {

  onSubmit = (data) => {
    this.props.createEnquiry(data)
  }

  render () {
    let { success, creating, failure, hideEnquiryModal, showModal } = this.props
    return (
      <Modal
        open={showModal}
        onClose={hideEnquiryModal}
      >
        <Modal.Header>{success ? 'All donesky!' : 'Request Early Access'}</Modal.Header>
        <Modal.Content>
          { !success && <EnquiryForm onSubmit={this.onSubmit} creating={creating} failure={failure} success={success} onClose={hideEnquiryModal} /> }
          { success && <div>
            <Message
              success
              header='Aw yis! You are in!'
              content='Your details were successfully registered!'
            />
            <p>You've just been elevetated to legendary status. We can't wait to show you what we've been up to. But we're going to have to because the work must go on.</p>
            <p>But rest assured, you'll be one of the first to get a taste of how good broccoli can change your life.</p>
            <p><Button color='green' size='large' onClick={hideEnquiryModal}>Close this dialog</Button></p>
          </div> }
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={hideEnquiryModal}>Cancel</Button> 
        </Modal.Actions>
      </Modal>
    )
  }
}


EnquiryModal = connect(
  (state, ownProps) => ({
    success: state.enquiry.success,
    creating: state.enquiry.creating,
    failure: state.enquiry.failure,
    showModal: state.enquiry.showModal
  }),
  dispatch => ({
    createEnquiry: (body) => dispatch(createEnquiry(body)),
    hideEnquiryModal: () => dispatch(hideEnquiryModal())
  })
)(EnquiryModal)

export default EnquiryModal
