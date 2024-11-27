import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadBook()
    }, [params.bookId])


    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book', err)
                alert("Sorry, we could not find the requested book...")
                navigate('/book')
            })
    }

    function onBack() {
        navigate('/book')
    }
/// TODO - what is prevBookId ??? where do we set it ??? ////////
/// TODO - can I assume that the books' images will be called by their title?

    if (!book) return <div>Loading Book Info...</div>
    console.log("inside BookDetails... book is: ", book)
    return (
        <section className="book-details">
            <h1 >Book Details :</h1>
            <h2>Book Title: {book.title}</h2>
            <h2>Book Subtitle: {book.subtitle}</h2>
            <h2>Book Authors: {book.authors}</h2>
            <h2>Book PublishedDate: {book.publishedDate}</h2>
            <h2>Book Description: {book.description}</h2>
            <h2>Book PageCount: {book.pageCount}</h2>
            <h2>Book Categories: {book.categories}</h2>
            <h2>Book Language: {book.language}</h2>
            <h2>Book ListPrice: {book.listPrice.amount}</h2>
             <img src={`../BookImages/${book.title}.png`} alt="book-cover-image" />
            <button onClick={onBack}>Back</button>
            <section>
                <button><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </section>  

        </section>
    )
}
