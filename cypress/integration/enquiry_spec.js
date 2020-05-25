/* global cy, it, describe, beforeEach */

const defaultRouteConfig = {
  url: '/prod/fake-auth',
  method: 'POST',
  status: 200,
  response: {
    message: 'All done'
  }
}

describe('Broccoli Landing:', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  describe('Successful Enquiry:', () => {
    it('shows and hides the modal appropriately', () => {
      cy.server()
      cy.route(defaultRouteConfig)

      // Click on the Request Access button
      cy.get(selectors.requestAccessButton).contains('Request an invite').click()

      // Is the modal there?
      cy.get(selectors.modal).should('be.visible')

      // Add some input and hit go
      cy.get(selectors.nameField).type('Test Person')
      cy.get(selectors.emailField).type('test@test.com')
      cy.get(selectors.confirmField).type('test@test.com')
      cy.get(selectors.submitButton).contains('Submit').click()

      // Check for Modal text
      cy.get(selectors.modalThankyou).should('be.visible')
      cy.get(selectors.modalThankyouClose).contains('Close this dialog').click()

      // Is the modal gone?
      cy.get(selectors.modal).should('not.exist')
    })
  })

  describe('Unsuccessful Enquiries:', () => {
    it('shows validation errors if no input is added', () => {
      // Click on the Request Access button
      cy.get(selectors.requestAccessButton).contains('Request an invite').click()

      // Is the modal there?
      cy.get(selectors.modal).should('be.visible')

      // Add some input and hit go
      cy.get(selectors.submitButton).contains('Submit').click()

      // Check the field wrappers for the error states
      cy.get(selectors.nameField)
        .closest('div.field')
        .should('have.class', 'error')
      cy.get(selectors.emailField)
        .closest('div.field')
        .should('have.class', 'error')
      cy.get(selectors.confirmField)
        .closest('div.field')
        .should('have.class', 'error')
    })

    it('shows validation errors if the confirm email doesn\'t match', () => {
      // Click on the Request Access button
      cy.get(selectors.requestAccessButton).contains('Request an invite').click()

      // Is the modal there?
      cy.get(selectors.modal).should('be.visible')

      // Add some input and hit go
      cy.get(selectors.nameField).type('Test Person')
      cy.get(selectors.emailField).type('test@test.com')
      cy.get(selectors.confirmField).type('NOTcorrect@test.com')
      cy.get(selectors.submitButton).contains('Submit').click()

      // Check the field wrappers for the error states
      cy.get(selectors.nameField)
        .closest('div.field')
        .should('not.have.class', 'error')
      cy.get(selectors.emailField)
        .closest('div.field')
        .should('not.have.class', 'error')
      cy.get(selectors.confirmField)
        .closest('div.field')
        .should('have.class', 'error')
    })

    it('shows an email already registered message if used', () => {
      cy.server()
      cy.route({ ...defaultRouteConfig, status: 400, response: { errorMessage: 'Bad Request: Email is already in use' } })

      // Click on the Request Access button
      cy.get(selectors.requestAccessButton).contains('Request an invite').click()

      // Is the modal there?
      cy.get(selectors.modal).should('be.visible')

      // Add some input and hit go
      cy.get(selectors.nameField).type('Test Person')
      cy.get(selectors.emailField).type('usedemail@airwallex.com')
      cy.get(selectors.confirmField).type('usedemail@airwallex.com')
      cy.get(selectors.submitButton).contains('Submit').click()

      // Check the error message
      cy.get(selectors.modalErrorMessage).should('be.visible').find('p').should('contain', 'Email already registered')
    })

    it('shows a message matching the output from the server if otherwise is a bad request.', () => {
      cy.server()
      cy.route({ ...defaultRouteConfig, status: 400, response: { errorMessage: 'Bad Request: Maximum borkage has been achieved' } })

      // Click on the Request Access button
      cy.get(selectors.requestAccessButton).contains('Request an invite').click()

      // Is the modal there?
      cy.get(selectors.modal).should('be.visible')

      // Add some input and hit go
      cy.get(selectors.nameField).type('Test Person')
      cy.get(selectors.emailField).type('Test@person.com')
      cy.get(selectors.confirmField).type('Test@person.com')
      cy.get(selectors.submitButton).contains('Submit').click()

      // Check the error message
      cy.get(selectors.modalErrorMessage).should('be.visible').find('p').should('contain', 'Bad Request: Maximum borkage has been achieved')
    })
  })
})
export const selectors = {
  requestAccessButton: '.ui-button-request-access',
  modal: '.ui-modal-enquiry',
  modalHeader: '.ui-modal-header',
  nameField: 'input[name="name"]',
  emailField: 'input[name="email"]',
  confirmField: 'input[name="confirm"]',
  submitButton: '.ui-enquiry-form-submit',
  modalThankyou: '.ui-modal-thankyou',
  modalThankyouClose: '.ui-modal-button-thanks-close',
  modalErrorMessage: '.ui-enquiry-form-error'
}
