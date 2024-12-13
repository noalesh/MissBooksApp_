import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM



export function AddReview() {

    const [bookToReview, setBookToReview] = useState(null)
    const [newReview, setNewReview] = useState(bookService.getEmptyReviewWithId())
    const navigate = useNavigate()
    const { bookId } = useParams()

    // in order to load async data - we gotta have useEffect.
    useEffect(() => {
        if (bookId) {
            loadBook()
        }
    }, [])


    function loadBook() {
        bookService.get(bookId)
            .then(setBookToReview)
            .catch(err => {
                console.log('Problem getting book to review', err);
                showErrorMsg('Problem getting book to review...')
            })
    }


    function onSaveReview(ev) {
        ev.preventDefault()
        // 1. update local state (optimistic strategy... Should O update database first? )
        let newBook = {}
        if (bookToReview.reviews) {
            const newReviewsArray = [...bookToReview.reviews, newReview]
            newBook = {...bookToReview, reviews:newReviewsArray}
        } else {
            newBook = {...bookToReview, reviews:[newReview]}
        }
        // TODO - can I do:           setBookToReview(newBook) 
        setBookToReview(bookToReview => newBook) 

        // 2. save to database.
        bookService.save(newBook)
            .then(() => { 
            //    console.log("inside onSaveReview - bookToReview.reviews: " , bookToReview.reviews)
                navigate(`/book/${bookId}`)
                showSuccessMsg("Book Review was added!")
            })
            .catch(err => {
                console.log('Cannot save review!', err)
                showErrorMsg("Something went worng.. Cannot save review...")
            })
    }

    
    function onBack() {
        // navigate back to BookDetails
        navigate(`/book/${bookId}`)
    }


    function handleChange({ target }) {

    // every Book holds a Reviews array.
    // when adding a new review - add the review to the array.

        let { value, name } = target
        switch (target.type) {
            case 'select-one':
                value = +target.value
                break
        }
        // we also have type 'text' for the reviewr's name and type date.
        setNewReview((newReview) => ({ ...newReview, [name]: value }))     
    }

    return (
        <section className="add-review">
            <h1>Leave a review....</h1>
            <button onClick={onBack}>Back to Book Details</button>
            <form onSubmit={onSaveReview}>
                <label htmlFor="fullName">Full Name: </label>
                <input onChange={handleChange} type="text" name="fullName" id="fullName" />
                
                <label htmlFor="rating">Rating(1-A waist of time, 5-Magnificent!): </label>
                <select onChange={handleChange} name="rating" id="rating" >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label htmlFor="dateOfReading">Date Of Reading: </label>
                <input onChange={handleChange} type="date" name="dateOfReading" id="dateOfReading" />

                <button>Save!</button>

            </form>
        </section>

    )
    
}