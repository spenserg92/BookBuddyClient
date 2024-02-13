import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getOneBook, updateBook } from '../../api/book'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'
import messages from '../shared/AutoDismissAlert/messages'
import EditBookModal from './EditBookModal'

const BookShow = (props) => {
    const {bookId} = useParams()
    const { user, msgAlert } = props


    const [book, setBook] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    
    useEffect(() => {
        getOneBook(bookId)
            .then(res => setBook(res.data.book))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }, [updated])

    if (!book) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className='m-3'>
                <Card>
                    <Card.Header>
                        { book.name }
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Genre: {book.genre}</small><br/>
                            <small>Published: {book.published}</small><br/>
                            <small>
                                In a series? {book.inSeries ? 'yes' : 'no'}
                            </small>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            // className='m-2'
                            // variant='info'
                            // onClick={() => setAuthorModalShow(true)}
                        >
                            Add an Author!
                        </Button>
                        {
                            book.owner && user && book.owner._id === user._id
                            ?
                            <>
                                <Button
                                    className='m-2'
                                    variant='warning'
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit Book
                                </Button>
                                <Button
                                    // className='m-2'
                                    // variant='danger'
                                    // onClick={() => setPetFree()}
                                >
                                    Donate Book
                                </Button>
                            </>
                            :
                            null
                        }
                        <br/>
                        {
                            book.owner ? `owner: ${book.owner.email}` : null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            {/* <Container className='m-2' style={toyCardContainerLayout}>
                {toyCards}
            </Container> */}
            <EditBookModal 
                user={user}
                show={editModalShow}
                updateBook={updateBook}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                book={book}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
            {/* <NewToyModal 
                pet={pet}
                show={toyModalShow}
                msgAlert={msgAlert}
                handleClose={() => setToyModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
            /> */}
        </>
    )
}

export default BookShow