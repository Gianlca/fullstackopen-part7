import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import { SetUser } from '../reducers/loginReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const LoginForm = () => {

  const dispatch = useDispatch()
  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const username = event.target[0].value
      const password = event.target[1].value
      const user = {
        username,
        password
      }
      const response = await loginService.login(user)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(response)
      )
      dispatch(SetUser(response))
      event.target[0].value = ''
      event.target[1].value = ''
    } catch (error) { 
      console.log(error)
    }
  }
  


  return (
    <Form onSubmit={handleLogin}>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
              username
            </Form.Label>
            <Form.Control id="title" placeholder="username" />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
              password
            </Form.Label>
            <Form.Control id="password" placeholder="password" />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Button type="submit" className="mb-3">
            Login
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default LoginForm