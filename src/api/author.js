import apiUrl from '../apiConfig'
import axios from 'axios'

// Create author
// POST	/authors/:bookId
export const createAuthor = (book, newAuthor) => {
    return axios({
        url: `${apiUrl}/authors/${book._id}`,
        method: 'POST',
        data: { author: newAuthor }
    })
}

// Update author
// PATCH /authors/:bookId/:authorId	
export const updateAuthor = (user, book, updatedAuthor) => {
    return axios({
        url: `${apiUrl}/authors/${book._id}/${updatedAuthor._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { author: updatedAuthor }
    })
}

// Delete author
// DELETE	/authors/:bookId/:authorId	
export const removeAuthor = (user, bookId, authorId) => {
    return axios({
        url: `${apiUrl}/toys/${bookId}/${authorId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}