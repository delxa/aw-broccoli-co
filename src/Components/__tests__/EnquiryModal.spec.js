import React from 'react'
import { mount } from 'enzyme'

import { EnquiryModal } from '../EnquiryModal'

const noop = () => {}

describe('EnquiryModal', () => {

  test('renders modal if showModal=true', () => {
    const wrapper = mount(<EnquiryModal showModal={true} success={false} failure={false} creating={false} createEnquiry={noop} hideEnquiryModal={noop} />)
    expect(wrapper.find('.modal')).toExist()
  }) 

  test('does not render modal if showModal=false', () => {
    const wrapper = mount(<EnquiryModal showModal={false} success={false} failure={false} creating={false} createEnquiry={noop} hideEnquiryModal={noop} />)
    expect(wrapper.find('.modal')).not.toExist()
  }) 

  test('renders form when not yet successful', () => {
    const wrapper = mount(<EnquiryModal showModal={true} success={false} failure={false} creating={false} createEnquiry={noop} hideEnquiryModal={noop} />)
    expect(wrapper.find('.ui-modal-header').first()).toIncludeText('Request Early Access')
    expect(wrapper.find('form.form')).toExist()
    expect(wrapper.find('.ui-modal-thankyou')).not.toExist()
  })

  test('renders thank you when successful', () => {
    const wrapper = mount(<EnquiryModal showModal={true} success={true} failure={false} creating={false} createEnquiry={noop} hideEnquiryModal={noop} />)
    expect(wrapper.find('.ui-modal-header').first()).toIncludeText('All donesky!')
    expect(wrapper.find('form.form')).not.toExist()
    expect(wrapper.find('.ui-modal-thankyou')).toExist()
  })

  test('clicking cancel button calls onClose Prop', () => {
    const mockOnClose = jest.fn()
    const wrapper = mount(<EnquiryModal showModal={true} success={false} failure={false} creating={false} createEnquiry={noop} hideEnquiryModal={mockOnClose} />)
    wrapper.find('.ui-modal-button-cancel').at(1).simulate('click')
    expect(mockOnClose).toHaveBeenCalled()
  })

  test('clicking Close this dialogue calls onClose Prop', () => {
    const mockOnClose = jest.fn()
    const wrapper = mount(<EnquiryModal showModal={true} success={true} failure={false} creating={false} createEnquiry={noop} hideEnquiryModal={mockOnClose} />)
    wrapper.find('.ui-modal-button-thanks-close').at(1).simulate('click')
    expect(mockOnClose).toHaveBeenCalled()
  })
})
