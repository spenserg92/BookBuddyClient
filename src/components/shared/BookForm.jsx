
import { Form, Button, Container } from 'react-bootstrap'

const BookForm = (props) => {
    const { book, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Title: </Form.Label>
                    <Form.Control 
                        placeholder="What is the books title?"
                        id="name"
                        name="name"
                        value={ book.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Genre: </Form.Label>
                    <Form.Control 
                        placeholder="What is the book's genre?"
                        id="genre"
                        name="genre"
                        value={ book.genre }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Published: </Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="What year was this book published?"
                        id="published"
                        name="published"
                        value={ book.published }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Check 
                        label="Is this book in a series?"
                        name="inSeries"
                        defaultChecked={ book.inSeries }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default BookForm 