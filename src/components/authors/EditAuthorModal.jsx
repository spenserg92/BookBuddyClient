import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import AuthorForm from '../shared/AuthorForm'
import messages from '../shared/AutoDismissAlert/messages'
import { updateAuthor} from '../../api/author'

const EditAuthorModal = (props) => {
    const { user, show, handleClose, msgAlert, triggerRefresh, book } = props
    const [author, setAuthor] = useState(props.author)

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

            const updatedAuthor = { [updatedName] : updatedValue }

            return {
                ...prevAuthor, ...updatedAuthor
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        updateAuthor(user, book, author)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateAuthorSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
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
                <AuthorForm 
                    author={author}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Author"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditAuthorModal