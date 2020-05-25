import React from 'react'
import styled from 'styled-components'
import { Container, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { showEnquiryModal } from '../Redux/Actions/Enquiry'
import { VFlex, CustomButton } from './Styled/StyledComponents'
import EnquiryModal from './EnquiryModal'

// This property could easily exist as an exportable from a separate file if we wanted to share it throughout the app.
// The ThemeProvider included in styled-components also serves this purpose and is probably a cleaner way to do it.
const Verdant = '#bbff00'

const SplashBack = styled(VFlex)`
  background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url("/broccoli1.jpg");
  background-position: center;
  background-repeat: no-repeat;
  padding-top: 46px;
`

const HeroTitle = styled.h1`
  color: white;
  font-size: 3rem;
  @media (min-width: 768px) {
    font-size: 4rem;
  }
`

const HeroSubtitle = styled.h2`
  color: white;
  font-size: 1.7rem;
  margin-bottom: 40px;
  @media (min-width: 768px) {
    font-size: 2.3rem;
  }
`

const Emphasis = styled.span`
  color: ${Verdant};
`

const SexyButton = styled(CustomButton)`
  color: ${Verdant};
  box-shadow: 0 0 0 2px ${Verdant} inset;
  &:hover {
    color: white;
    box-shadow: 0 0 0 2px white inset;
  }
`

export const Splash = (props) => (
  <SplashBack>
    <Container>
      <Grid stretched>
        <Grid.Row stretched>
          <Grid.Column textAlign='center' verticalAlign='middle'>
            <HeroTitle className='ui-title'>Broccoli, but not as you know it.</HeroTitle>
            <HeroSubtitle className='ui-subtitle'>Leveraging the latest <Emphasis>machine learning</Emphasis> and <Emphasis>A.I. technologies</Emphasis> to bring you the <Emphasis>most-epic</Emphasis> broccoli, ever.</HeroSubtitle>
            <p>
              <SexyButton
                className='ui-button-request-access'
                onClick={props.showEnquiryModal}
                color='green'
                size='large'
                inverted
              >
                Request an invite
              </SexyButton>
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    <EnquiryModal />
  </SplashBack>
)

export default connect(
  null,
  dispatch => ({
    showEnquiryModal: () => dispatch(showEnquiryModal())
  })
)(Splash)
