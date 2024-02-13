import { useState } from 'react'
import BookForm from '../shared/BookForm'
import { useNavigate } from 'react-router-dom'
import { createBook } from '../../api/book'
import messages  from '../shared/AutoDismissAlert/messages'

const BookCreate = (props) => {
    // pull out our props
    const { user, msgAlert } = props

    const navigate = useNavigate()
    // build our state object
    const [book, setBook] = useState({
        name: '',
        genre: '',
        published: 0,
        inSeries: false
    })

    const onChange = (e) => {
        // e is the placeholder for the event
        // e.persist is bc react uses the virtual dom, we want our form data to persist every time the page renders. Which will be a lot of times.
        e.persist()

        // if you pass an argument to the callback function of your state hook updater, that argument is a placeholder for the most recent state, this will maintain anything that you have typed before the next letter
        // prevPet is a placeholder(parameter) for the LAST condition of our state.
        setBook(prevBook => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // the above two items work great for strings
            // however, we need to handle numbers and booleans as well
            if (e.target.type === 'number') {
                // if the target is a number, parst integers from the value
                updatedValue = parseInt(e.target.value)
            }

            // to handle our checkbox, we need to tell it when to send true and when to send false. Because the default values for a checkbox are 'checked' or 'unchecked', we need to convert those to the appropriate boolean value
            if (updatedName === 'inSeries' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'inSeries' && !e.target.checked) {
                updatedValue = false
            }

            // this will actually buiild our pet object
            // we grab an attribute name, and assign the respective value
            const updatedBook = { [updatedName] : updatedValue }

            // to keep all the old stuff, and add newly typed letter/numbers etc
            return {
                ...prevBook, ...updatedBook
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createBook(user, book)
            .then(res => { navigate(`/books/${res.data.book.id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createBookSuccess,
                    variant: 'success'
                })
            })
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    console.log('the pet inside create', book)
    return (
        <BookForm
            book={book}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new pet!"
        />
    )
}

export default BookCreate