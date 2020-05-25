/* eslint-disable react/jsx-handler-names */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import EnquiryForm from './EnquiryForm'
import { createEnquiry, hideEnquiryModal } from '../Redux/Actions/Enquiry'

export class EnquiryModal extends Component {
  onSubmit = (data) => {
    this.props.createEnquiry(data)
  }

  render () {
    const { success, creating, failure, hideEnquiryModal, showModal } = this.props
    return (
      <Modal
        open={showModal}
        onClose={hideEnquiryModal}
        className='ui-modal-enquiry'
      >
        <Modal.Header className='ui-modal-header'>{success ? 'All donesky!' : 'Request Early Access'}</Modal.Header>
        <Modal.Content>
          {!success && <EnquiryForm onSubmit={this.onSubmit} creating={creating} failure={failure} success={success} onClose={hideEnquiryModal} />}
          {success &&
            <div className='ui-modal-thankyou'>
              <Message
                success
                header='Aw yis! You are in!'
                content='Your details were successfully registered!'
              />
              <p>You've just been elevetated to legendary status. We can't wait to show you what we've been up to. But we're going to have to because the work must go on.</p>
              <p>But rest assured, you'll be one of the first to get a taste of how good broccoli can change your life.</p>
              <p>
                <Button
                  className='ui-modal-button-thanks-close'
                  color='green'
                  size='large'
                  onClick={hideEnquiryModal}
                >
                  Close this dialog
                </Button>
              </p>
            </div>}
        </Modal.Content>
        <Modal.Actions>
          <Button className='ui-modal-button-cancel' onClick={hideEnquiryModal}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

EnquiryModal.propTypes = {
  success: PropTypes.bool.isRequired,
  creating: PropTypes.bool.isRequired,
  failure: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]).isRequired,
  showModal: PropTypes.bool.isRequired,
  createEnquiry: PropTypes.func.isRequired,
  hideEnquiryModal: PropTypes.func.isRequired
}

export default connect(
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
