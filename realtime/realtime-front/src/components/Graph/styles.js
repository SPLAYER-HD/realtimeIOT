import styled from 'styled-components'
import { fadeIn } from '../../styles/animation'

export const Div = styled.div`
  border: 1px solid #ddd;
  box-shadow: 0px 10px 14px rgba(0, 0, 0, .2);
  border-radius: 5%;
  height: auto;
  width: 455px;
  overflow: hidden;
  object-fit: cover; 
  position: relative;
  background-color: #F5F5F5;
  ${fadeIn({ time: '5s' })}
`

export const Img = styled.img`
  
  opacity: 0.3;
  padding-top: 1px;
  padding-left: 130px;
  height: 140px;
  width: 350px;
  position: absolute;
`