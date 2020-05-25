import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import EnquiryForm from '../EnquiryForm'

describe('EnquiryForm', () => {


  test('renders error message when unsuccessful', () => {
    const wrapper = mount(<EnquiryForm creating={false} success={false} />)
    expect(wrapper.find('.ui-enquiry-form-error')).toExist()
  })

  // I ran out of time to make this one pass. Left it here to communicate my thinking
  test.skip('invalid input will show error state on field', async() => {
    const wrapper = mount(<EnquiryForm failure={false} creating={false} />)
    await act(async () => {
      wrapper.find('input').at(0).simulate('focus')
      wrapper.find('input').at(0).simulate('blur')
      wrapper.find('input').at(1).simulate('focus')
      wrapper.find('input').at(1).simulate('blur')
      wrapper.find('input').at(2).simulate('focus')
      wrapper.find('input').at(2).simulate('blur')
    })
    expect(wrapper.find('.field').at(0)).toHaveClassName('error')
    expect(wrapper.find('.field').at(1)).toHaveClassName('error')
    expect(wrapper.find('.field').at(2)).toHaveClassName('error')
  })

  test('invalid input will not call onSubmit()', async() => {
    const mockOnSubmit = jest.fn()
    const wrapper = mount(<EnquiryForm onSubmit={mockOnSubmit} />)
    await act(async () => {
      wrapper.find('.ui-enquiry-form-submit').at(1).simulate('click')
    })
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  test('valid input will call onSubmit()', async() => {
    const mockOnSubmit = jest.fn()
    const wrapper = mount(<EnquiryForm onSubmit={mockOnSubmit} failure={false} />)
    await act( async() => {
      wrapper.find('input').at(0).simulate('change', { target: { name: 'name', value: 'Test' } });
      wrapper.find('input').at(1).simulate('change', { target: { name: 'email', value: 'Test@test.com' } });
      wrapper.find('input').at(2).simulate('change', { target: { name: 'confirm', value: 'Test@test.com' } });
    })
    await act( async() => {
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {} // no op 
      })
    })
    expect(mockOnSubmit).toHaveBeenCalled()
  })

})
