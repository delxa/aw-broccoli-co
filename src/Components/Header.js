import React from 'react'
import {
  Container,
  Image,
  Menu,
  Label
} from 'semantic-ui-react'
import styled from 'styled-components'

import BCLogo from '../broccoli2.png'
import { VFlex } from './Styled/StyledComponents'

const HeaderContainer = styled(VFlex)`
  max-height: 46px;
  position: fixed;
  top: 0;
  left: 0;
  right:0;
`
const StyledMenu = styled(Menu)`
  && {
    margin-bottom: 0;
    background-color: #101010;
    border-radius: 0;
  }
`

const StyledMenuItem = styled(Menu.Item)`
  &&&&::before {
    background: transparent;
  }
`

const LogoImage = styled(Image)`
  margin-right: 0.8em;
  width: 28px;
`

const Header = () => (
  <HeaderContainer>
    <StyledMenu inverted>
      <Container>
        <StyledMenuItem header>
          <LogoImage src={BCLogo} />
          Broccoli & Co <Label color='orange'>BETA</Label>
        </StyledMenuItem>
      </Container>
    </StyledMenu>
  </HeaderContainer>
)

export default Header
