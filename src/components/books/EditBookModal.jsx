import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import BookForm from '../shared/BookForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditBookModal = (props) => {
    const { user, show, handleClose, updateBook, msgAlert, triggerRefresh } = props
    const [book, setBook] = useState(props.book)

    const onChange = (e) => {
        e.persist()

        setBook(prevBook => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'inSeries' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'inSeries' && !e.target.checked) {
                updatedValue = false
            }
            const updatedBook = { [updatedName] : updatedValue }
            return {
                ...prevBook, ...updatedBook
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // make the API call
        updateBook(user, book)
            // close the modal
            .then(() => handleClose())
            // message the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updatedBookSuccess,
                    variant: 'success'
                })
            })
            // trigger a refresh
            .then(() => triggerRefresh())
            // send error message if applicable
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <BookForm 
                    book={book}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Book"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditBookModal