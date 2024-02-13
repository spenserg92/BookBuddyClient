import apiUrl from '../apiConfig'
import axios from 'axios'

// read index 
export const getAllBooks = () => {
    return axios(`${apiUrl}/books`)
}
// read show
export const getOneBook = (id) => {
    return axios(`${apiUrl}/books/${id}`)
}
// create -> add a book
export const createBook = (user, newBook) => {
    return axios({
        url: `${apiUrl}/books`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { book: newBook }
    })
}

// update -> adjust a book

// delete -> remove a book