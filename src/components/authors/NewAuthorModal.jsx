import React, {useState} from 'react'
import { Modal } from 'react-bootstrap'
import AuthorForm from '../shared/AuthorForm'
import messages from '../shared/AutoDismissAlert/messages'
import { createAuthor } from '../../api/author'


const NewAuthorModal = (props) => {
    const { book, show, handleClose, msgAlert, triggerRefresh } = props
    const [author, setAuthor] = useState({})

    const onChange = (e) => {
        e.persist()
        setAuthor(prevAuthor => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (updatedName === 'isActive' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isActive' && !e.target.checked) {
                updatedValue = false
            }

            const updatedAuthor= { [updatedName] : updatedValue }

            return {
                ...prevAuthor, ...updatedAuthor
            }
        })
    }
    
    const onSubmit = (e) => {
        e.preventDefault()

        createAuthor(book, author)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createAuthorSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .then(() => setAuthor({}))
            .catch(err => {
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
                <AuthorForm 
                    author={author}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Give ${book.name} an author!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewAuthorModal