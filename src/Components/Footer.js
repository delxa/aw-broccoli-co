import React from 'react'
import {
  Container,
  Icon
} from 'semantic-ui-react'
import styled from 'styled-components'

import { VFlex } from './Styled/StyledComponents'

const FooterWrapper = styled(VFlex)`
  min-height: 40px;
  max-height: 86px;
  background-color: #101010;
`

const FooterCopy = styled.p`
  color: white;
  text-align: center;
`

const Footer = () => (
  <FooterWrapper>
    <Container>
      <FooterCopy>Made with <Icon color='red' name='heart' /><Icon name='react' color='blue' /> and <Icon name='js' color='yellow' /> in Melbourne.</FooterCopy>
      <FooterCopy>&copy; 2020 Brocolli & Co - All rights reserved</FooterCopy>
    </Container>
  </FooterWrapper>
)

export default Footer
