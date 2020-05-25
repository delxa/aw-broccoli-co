import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, } from 'formik'
import { Button, Form, Message } from 'semantic-ui-react'

import { LeadParagraph } from './Styled/StyledComponents'

class EnquiryForm extends Component {

  validate = values => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Required'
    }
    if (!values.email) {
      errors.email = 'Required'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address'
    }
    if (!values.confirm) {
      errors.confirm = 'Required';
    } else if (values.email !== values.confirm) errors.confirm = 'Confirmation must match provided email address.'
    return errors
  }

  render () {
    const { failure, onSubmit, creating } = this.props
    return (
      <div>
        <Formik
          initialValues={{ name: '', email: '', confirm: ''}}
          validate={this.validate}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit
          }) => (
            <Form
              onSubmit={handleSubmit}
              error={failure !== false}
            >
              <LeadParagraph>Hey, Legend. Thanks for your interest in Broccoli &amp; Co. To be one of the first to witness the power of this full armed and operational battle-station, enter your details below.</LeadParagraph>
              <p>All of your privacies are important to us. Yes all of the privacies. Every single one.</p>
              <Form.Field error={touched.name && errors.name} required>
                <label>Your full name</label>
                <Field name='name' placeholder='Your full name' />
              </Form.Field>
              <Form.Field error={touched.email && errors.email} required>
                <label>Your email address</label>
                <Field type='email' name='email' placeholder='allofthe@broccoli.zomg' />    
              </Form.Field>
              <Form.Field error={touched.confirm && errors.confirm} required>
                <label>Confirm email address</label>
                <Field type='email' name='confirm' placeholder='Yeah, we know it is 2020. Do it anyway.'  />
              </Form.Field>

              { failure && <Message
                className='ui-enquiry-form-error'
                error
                header='Oh snap. It broked!'
                content={failure}
              /> }
              <Button
                className='ui-enquiry-form-submit'
                type='submit'
                size='large'
                color='green'
                disabled={creating}
                loading={creating}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

EnquiryForm.propTypes = {
  failure: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  creating: PropTypes.bool.isRequired
}

export default EnquiryForm
