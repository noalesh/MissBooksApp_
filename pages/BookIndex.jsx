import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"

const { Link } = ReactRouterDOM
const { useEffect, useState } = React

/* this is a SMART component, and the most complex one - hub - 
    center page of the basic entity of the app... 
    it holds state. 
    it gets a list of books from bookService and renders <BooksList>, 
    rendering <BookPreview> in a loop.
    It also uses <BookFilter> for filtering/sorting the list.
    In addition, there are also <BookEdit> and <BookDetails> as separate 
    pages. 

*/
export function BookIndex() {

    const [books, setBooks] = useState(null)


    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
        // Note to self - the function beong passed to .then - meaning, 
        // setBooks, is being called with the value that the 
        // promise was fulfilled with.
            .then(setBooks)
            .catch(err => {
                console.log('Problems getting books:', err)
            })
            
            // note to self - the following will not print 
            // anything as this is async!!
            // console.log("DEBUG - books loaded. books : ", books)
    }


    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('Problems removing book:', err)
            })
    }



    function onSetFilter(filterBy) {
         console.log('filterBy:', filterBy)

         /// TODO - implement filter

        console.log("TODO - implement filter !!!!!")

   /*     setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }
    // console.log('index render');
    
    if (!cars) return <div>Loading...</div>
    return (
        <section className="car-index">
            <CarFilter defaultFilter={filterBy} onSetFilter={onSetFilter} />

            <section>
                <Link to="/car/edit">Add Car</Link>
            </section>
            <CarList
                cars={cars}
                onRemoveCar={onRemoveCar}
            />
        </section>
    )*/
    }










    if (!books) return <div>Loading books...</div>
    return (
        <section className="book-index">
            <h1 >Book Index page</h1>
            <p>UNDER CONSTRUCTION.... for the meanwhile, here are the books:</p>
            <ul>
                {books.map(book => {
                return <li key={book.id}> {book.title}</li>;
                })}
            </ul>

        </section>
    )
}