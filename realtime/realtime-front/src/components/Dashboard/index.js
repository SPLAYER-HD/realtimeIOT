'use strict'
import React from 'react'
import { ListOfFridge } from '../ListOfFridge'
import { Div } from './styles'

export const Dashboard = ({ devices }) => {
  return (
    <Div>
      <ListOfFridge />
    </Div>
  )
}
