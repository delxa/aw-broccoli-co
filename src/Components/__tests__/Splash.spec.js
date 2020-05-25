import React from 'react'
import { mount, shallow } from 'enzyme'

import { Splash } from '../Splash'

describe('Splash', () => {

  test('Contains required elements', () => {
    const wrapper = shallow(<Splash />)
    expect(wrapper.find('.ui-title')).toExist()
    expect(wrapper.find('.ui-subtitle')).toExist()
    expect(wrapper.find('.ui-button-request-access')).toExist()
  }) 

  test('clicking Request an invite triggers showEnquiryModal()', () => {
    const mockShowEnquiryModal = jest.fn()
    const wrapper = shallow(<Splash showEnquiryModal={mockShowEnquiryModal} />)
    wrapper.find('.ui-button-request-access').at(0).simulate('click')
    expect(mockShowEnquiryModal).toHaveBeenCalled()
  })
})
