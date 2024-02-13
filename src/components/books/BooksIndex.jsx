import { getAllBooks } from "../../api/book"
import { useState, useEffect } from "react"
import LoadingScreen from "../shared/LoadingScreen"
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    backgroundColor: 'lightsteelblue',
}

const BooksIndex = (props) => {
    const [books, setBooks] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    useEffect(() => {
		getAllBooks()
			// .then(res => console.log('books \n', res.data.books))
			.then(res => {
				setBooks(res.data.books)
			})
			.catch(error => console.error)
	}, [])

    if (error) {
        return <LoadingScreen />
    }

    if (!books) {
        return <LoadingScreen />
    } else if (books.length === 0){
        return <p>No Books Yet, Go add some!</p>
    }

    const bookCards = books.map(book => (
        <Card key={book.id} style={{width: '30%', margin: 5}}>
            <Card.Header></Card.Header>
            <Card.Body>
                <Card.Text>
                <Link to={`/books/${book._id}`} className='btn btn-info'>
                        View {book.name}
                    </Link>
                </Card.Text>
                { book.owner ? 
                    <Card.Footer>owner: {book.owner.email}</Card.Footer>
                    :
                    null
            }
            </Card.Body>
        </Card>
    ))
    return (
        <div className="container-md" style={ cardContainerLayout }>
            {bookCards}
        </div>
    )
}



export default BooksIndex