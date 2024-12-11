import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM



export function AddReview() {

    const [bookToReview, setBookToReview] = useState(null)
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
        bookService.save(bookToReview)
            .then(() => { navigate('/book/:bookId')
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
      /*  let { value, name: field } = target
        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value })) */
        ///// TODO
        
        console.log("handleChange in AddReview")
    }

    return (
        <section className="add-review">
            <h1>Leave a review.... UNDER CONSTRUCTION...</h1>
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
                <label htmlFor="dateRead">Date Of Reading: </label>
                <input onChange={handleChange} type="date" name="dateRead" id="dateRead" />

                <button>Save!</button>

            </form>
        </section>

    )
    
}