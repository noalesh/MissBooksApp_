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
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())


    useEffect(() => {
        loadBooks()
      //  console.log("inside BookIndex useEffect - books.length: ", books)
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
        // Note to self - the function being passed to .then - meaning, 
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
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }
    // console.log('index render');
    
   /* if (!cars) return <div>Loading...</div>
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
    )
    }*/

    /* note to self - 
     <ul>
                {books.map(book => {
                return <li key={book.id}> {book.title}</li>;
                })}
            </ul>
    */

    if (!books) return <div>Loading books...</div>
    return (
        <section className="book-index">
           <BookFilter defaultFilter={filterBy} onSetFilter={onSetFilter}/>
           <BookList books={books} onRemoveBook={onRemoveBook}/>
        </section>
    )
}