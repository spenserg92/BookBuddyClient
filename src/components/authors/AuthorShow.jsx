import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeAuthor } from '../../api/author'
import messages from '../shared/AutoDismissAlert/messages'
// import EditAuthorModal from '../authors/EditAuthorModal'

const AuthorShow = (props) => {
    const { author, user, book, triggerRefresh, msgAlert } = props

    const [editModalShow, setEditModalShow] = useState(false)

    // const setBgCondition = (cond) => {
    //     // a toy can either be new, used, or disgusting
    //     if (cond === 'new') {
    //         return ({width: '18rem', backgroundColor: '#b5ead7'})
    //     } else if (cond === 'used') {
    //         return ({width: '18rem', backgroundColor: '#ffdac1'})
    //     } else {
    //         return ({width: '18rem', backgroundColor: '#ff9aa2'})
    //     }
    // }


    const destroyAuthor = () => {
        // we want to remove the toy
        removeAuthor(user, book._id, author._id)
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deleteAuthorSuccess,
                    variant: 'success'
                })
            })
            // refresh the page
            .then(() => triggerRefresh())
            // if err, send err msg
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className='m-2' >
                <Card.Header>{author.name}</Card.Header>
                <Card.Body>
                    <small>{author.bio}</small><br/>
                    <small>{author.isActive ? 'More books to come!' : 'stoic silence'}</small>
                </Card.Body>
                <Card.Footer>
                    <small>Awards: {author.awards}</small><br/>
                    {
                        user && book.owner && user._id === book.owner._id
                        ?
                        <>
                            <Button
                                className='m-2'
                                variant='warning'
                                onClick={() => setEditModalShow(true)}
                            >
                                Update Author
                            </Button>
                            <Button
                                className='m-2'
                                variant='danger'
                                onClick={() => destroyAuthor()}
                            >
                                Delete Author
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            {/* <EditAuthorModal 
                user={user}
                book={book}
                author={author}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            /> */}
        </>
    )
}

export default AuthorShow