import styled from 'styled-components'

export const Div = styled.div`
  display: flex;
`
export const Constraint = styled.div`
  padding-top:15px;
`
export const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
  padding-top:0px;
`
export const Range = styled.h2`
  font-size: 16px;
  font-weight: 500;
  margin-right: 10px;
  padding-top:0px;
`

export const metricValue = (metric, min, max) => {
  if(metric < min || metric > max){
    return 'red'
  }
  return 'grey'
}

export const Alert = styled.span`
  font-size: 45px;
  margin-left: 20px;
  color: ${props => metricValue(props.metric, props.min,props.max)};
`

