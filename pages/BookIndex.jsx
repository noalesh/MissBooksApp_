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
            .then(setBooks)
            .catch(err => {
                console.log('Problems getting books:', err)
            })
    }


    
    if (!books) return <div>Loading books...</div>
    return (
        <section className="bookIndex">
            <h1 >Book Index page</h1>
        </section>
    )
}