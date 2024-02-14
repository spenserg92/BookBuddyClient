import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneBook, updateBook, removeBook } from '../../api/book'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import EditBookModal from './EditBookModal'
import AuthorShow from '../authors/AuthorShow'
import NewAuthorModal from '../authors/NewAuthorModal'

const authorCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const BookShow = (props) => {
    const { bookId } = useParams()
    const { user, msgAlert } = props


    const [book, setBook] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [authorModalShow, setAuthorModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()

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

    const donateBook = () => {
        // we want to remove the pet
        removeBook(user, book._id)
            // display a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deleteBookSuccess,
                    variant: 'success'
                })
            })
            // navigate the user back to the index page(Home)(/)
            .then(() => navigate('/'))
            // if an error occurs, tell the user
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    let authorCards
    if (book) {
        if (book.authors.length > 0) {
            authorCards = book.authors.map(author => (
                <AuthorShow
                    key={author.id}
                    author={author}
                    book={book}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        } else {
            authorCards = <p>Book has no author, better add one!</p>
        }
    }

    if (!book) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className='m-3'>
                <Card>
                    <Card.Header>
                        {book.name}
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Genre: {book.genre}</small><br />
                            <small>Published: {book.published}</small><br />
                            <small>
                                In a series? {book.inSeries ? 'yes' : 'no'}
                            </small>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            className='m-2'
                            variant='info'
                            onClick={() => setAuthorModalShow(true)}
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
                                        className='m-2'
                                        variant='danger'
                                        onClick={() => donateBook()}
                                    >
                                        Donate Book
                                    </Button>
                                </>
                                :
                                null
                        }
                        <br />
                        {
                            book.owner ? `owner: ${book.owner.email}` : null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container className='m-2' style={authorCardContainerLayout}>
                {authorCards}
            </Container>
            <EditBookModal
                user={user}
                show={editModalShow}
                updateBook={updateBook}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                book={book}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
            <NewAuthorModal
                book={book}
                show={authorModalShow}
                msgAlert={msgAlert}
                handleClose={() => setAuthorModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default BookShow