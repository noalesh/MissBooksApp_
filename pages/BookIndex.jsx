import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { getTruthyValues } from './util.service.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { Link, useSearchParams} = ReactRouterDOM
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

    const [searchParams, setSearchParams] = useSearchParams()
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSrcParams(searchParams))

    // in every search we want the filter settings to go into the url. this way
    // the filter results show even if the page is being reloaded.
    // getTruthyValues filters out values that are null/undefined/'',
    // just to have a cleaner url.. to see only keys that have a value.
    useEffect(() => {
        setSearchParams(getTruthyValues(filterBy))
        loadBooks()
       // console.log("inside BookIndex useEffect - books.length: ", books)
        //console.log("inside BookIndex useEffect - filterBy is: ", filterBy)
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
                setBooks(books => {books.filter(book => book.id !== bookId)
                showSuccessMsg("Book was successfully removed!")
                })
            })
            .catch(err => {
                console.log('Problems removing book:', err)
                showErrorMsg("Problems removing book...")
            })
    }



    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

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
           <section>
                <Link to="/book/edit">
                    <button>Add New Book</button>
                </Link>
            </section>
           <BookList books={books} onRemoveBook={onRemoveBook}/>
        </section>
    )
}