'use strict'
import React, { Fragment } from 'react'
import { Fridge } from '../Fridge'
import { useFridgesData } from '../../hooks/useFridgesData'
import { Div } from './styles'
import { Loader } from '../../styles/loader'
import { Container, Row, Col } from 'react-bootstrap';

export const ListOfFridge = () => {
  const { fridges, loading } = useFridgesData()
  const renderList = () => (
    <Container fluid="true">
    <Row lg={3} >
      {loading ? (
        <Col key='loading'>
          <Fridge />
        </Col>
      ) : (
        fridges.map((fridge) => (
          <Col key={fridge.name}>
            <Fridge fridge={fridge} />
          </Col>
        ))
      )}
      </Row>
    </Container>
  )

  if (loading) return <Loader size={60} />

  return <Div>{renderList()}</Div>
}
