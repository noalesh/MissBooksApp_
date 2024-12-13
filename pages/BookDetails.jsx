import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { ReviewList } from "../cmps/ReviewList.jsx"

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
                showErrorMsg('Sorry, we could not find the requested book...')
                navigate('/book')
            })
    }

    function onBack() {
        navigate('/book')
    }


    function calculatePageCount() {
        const pageCount=book.pageCount
        if (pageCount>500){
            return "Serious Reading"
        } else if (pageCount>200){
            return "Descent Reading"
        } else if (pageCount<100){
            return "Light Reading"
        } else {
            return ""
        }
    }

    function calculateVintage() {
        const dateToday = new Date()
        const yearToday = dateToday.getFullYear()
        const publishedDate = book.publishedDate
        if (yearToday-publishedDate>10) {
            return "Vintage"
        } else if (yearToday-publishedDate<1) {
            return "New"
        } else {
            return ""
        }
    }

    function calculatePriceClassName() {
        const price = book.listPrice.amount
        if (price>150) {
            return "redPrice"
        } else if (price<20) {
            return "greenPrice"
        } else {
            return "bookDetailsValue"
        }
    }

    function isOnSale() {
        return book.listPrice.isOnSale
    }

    function onRemoveReview(reviewId) {
        const newReviewsArray = book.reviews.filter(review => review.id !== reviewId)
        const newBook = {...book, reviews:newReviewsArray}
        setBook( (prevBook) => ({...prevBook, reviews:newReviewsArray}))

        // TODO - does it matter if we first update db or local state?

        bookService.save(newBook)
            .then(() => {navigate(`/book/${book.id}`)
                showSuccessMsg("Book review was removed!")
            })
            .catch(err => {
                console.log('Cannot remove review!', err)
                showErrorMsg("Something went worng.. Cannot remove review...")
            })
    
        
        //console.log("onRemoveReview was called... book.reviews : ", book.reviews)
    }

    /// TODO - can I assume that the books' images will be called by their title?

    if (!book) return <div>Loading Book Info...</div>
  //  console.log("inside BookDetails... book is: ", book)    
    return (
        <section className="book-details">
            <h1>Book Details :</h1>
            <h2>Book Title: <span className="bookDetailsValue">{book.title}</span></h2>
            <h2>Book Subtitle: <span className="bookDetailsValue">{book.subtitle}</span></h2>
            <h2>Book Authors: <span className="bookDetailsValue">{book.authors}</span></h2>
            <h2>Book PublishedDate: <span className="bookDetailsValue">{book.publishedDate}</span> 
                <span className="extraInfo">{calculateVintage()}</span></h2>
            <h2>Book Description: <span className="bookDetailsValue">
                <LongTxt txt={book.description}></LongTxt></span></h2>
            <h2>Book Page Count: <span className="bookDetailsValue">{book.pageCount}</span> 
                <span className="extraInfo">{calculatePageCount()}</span></h2>
            <h2>Book Categories: <span className="bookDetailsValue">{book.categories}</span></h2>
            <h2>Book Language: <span className="bookDetailsValue">{book.language}</span></h2>
            <h2>Book Price: <span className={calculatePriceClassName()}>{book.listPrice.amount}</span> 
                {isOnSale() && <span className="importantInfo">ON SALE!!!</span>}</h2>
            <img src={book.thumbnail} alt="book-cover-image" />
            <br></br>
            <section className="book-reviews">
                { (book.hasOwnProperty("reviews") && book.reviews.length!==0) ? 
                    <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview}/>
                    :
                    <div className="no-book-reviews">No reviews yet!</div>
                }
            </section>
            <button onClick={onBack}>Back</button>
            <button><Link to={`/book/edit/${book.id}`}>Edit Book</Link></button>
            <button><Link to={`/book/review/${book.id}`}>Leave a Review</Link></button>
            <section>
                <button><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </section>  

        </section>
    )
}
