import styled from 'styled-components'

export const Page = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const VFlex = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export const CustomButton = styled.button`
  background-color: transparent;
  font-size: 1.3em;
  cursor: pointer;
  display: inline-block;
  min-height: 1em;
  margin: 0 .25em 0 0;
  padding: .8em 1.5em .8em;
  outline: 0;
  border: none;
  vertical-align: baseline;
  font-weight: 700;
  line-height: 1em;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  border-radius: .28em;
  user-select: none;
  transition: opacity .1s ease,background-color .1s ease, color .1s ease,box-shadow .1s ease, background .1s ease;
  -webkit-tap-highlight-color: transparent;
`

export const LeadParagraph = styled.p`
  font-size: 1.1rem;
`
