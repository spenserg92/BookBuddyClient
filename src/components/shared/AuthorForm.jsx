import { Form, Button, Container } from 'react-bootstrap'

const AuthorForm = (props) => {

    const { author, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control 
                        placeholder="What is the author's name?"
                        id="name"
                        name="name"
                        value={ author.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Bio:  </Form.Label>
                    <Form.Control 
                        placeholder="Write a short bio here"
                        id="bio"
                        name="bio"
                        value={ author.bio }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Check 
                        label="Is this author active?"
                        name="isActive"
                        defaultChecked={ author.isActive }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Select
                        aria-label='author awards'
                        name="awards"
                        defaultValue={ author.awards }
                        onChange={handleChange}
                    >
                        <option>Open this select menu</option>
                        <option value="New York Times bestseller">New York Times bestseller</option>
                        <option value="Hugo Award">Hugo Award</option>
                        <option value="Other">Other</option>
                    </Form.Select>
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default AuthorForm 