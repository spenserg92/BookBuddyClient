
import { useState, useEffect } from "react"
import BooksIndex from "./books/BooksIndex"

const Home = (props) => {
	const { msgAlert, user } = props


	
	return (
		<>
			<h2>Home Page</h2>
			{/* {user !==null ? <h5>Hello {user.email}</h5> : null}
			{books === null ? <LoadingScreen /> : <p>{books[0].name}</p>} */}
			<BooksIndex  msgAlert={msgAlert}/>
		</>
	)
}

export default Home
