import React, { useState } from 'react'
import {BrowserRouter as Router, Link, Switch, Route, useParams, useHistory} from 'react-router-dom'
import { useField } from './hooks/indexs'
import { Table, Form, Button, Alert, Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'

const ButtonStyled = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to="/" style={padding}>
              anecdotes
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/newanecdote" style={padding}>
              create new
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/about" style={padding}>
              about
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
    <tbody>
      {anecdotes.map(anecdote => 
      <tr key={anecdote.id} >
        <td>
        <Link to={`/anecdotes/${anecdote.id}`}>
        {anecdote.content}
        </Link>
        </td>
      </tr>
      )}
    </tbody>
    </Table>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(n => n.id === id)
  console.log(anecdote)
  return (
    <div>
      <h2>{anecdote.content}</h2>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const history = useHistory()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
    props.handleNotification(content.value)
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.onReset()
    author.onReset()
    info.onReset()
  }
  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form  onSubmit={handleSubmit}>
      <Form.Group>
        <div>
        <Form.Label>content</Form.Label>
          <Form.Control {...content} />
        </div>
        <div>
        <Form.Label>author</Form.Label>
        <Form.Control {...author} />
        </div>
        <div>
        <Form.Label>url for more info</Form.Label>
          <Input {...info} />
        </div>
        <Button variant="primary" type="submit">create</Button>
        <ButtonStyled onClick={handleReset}>reset</ButtonStyled>
        </Form.Group>
      </Form>
    </div>
  )

}

const Notification = ({message}) => {
  if( message === null ) {
    return null
  }
  return (
    <div className='container'>
    {(message &&
      <Alert variant="success">
        {message}
      </Alert>
    )}
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const handleNotification = (anecdote) => {
    setNotification(`a new anecdote ${anecdote}`)
    setTimeout(() => {
      setNotification(null)      
    }, 10000);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
    <div className="container">
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification}/>
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdotes={anecdotes} />
        </Route>
        <Route path="/about">
        <About />
        </Route>
        <Route path="/newanecdote">
        <CreateNew addNew={addNew}  handleNotification={handleNotification}/>
        </Route>
        <Route path="/">
        <AnecdoteList anecdotes={anecdotes}/>
        </Route>
      </Switch>
      <Footer />
    </div>
    </Router>    
  )
}

export default App;