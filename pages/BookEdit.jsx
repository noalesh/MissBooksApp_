import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM


// note to self:
/*
The difference between the Link (and NavLink and Navigate) components 
and the navigate function returned by the useNavigate hook is 
effectively the same difference between Declarative and Imperative 
programming.
with Link/NavLink/Navigate components you declare what you want to 
happen, and the component handles getting it done and executing it.
With the navigate function you are explicitly issuing a command to 
navigate now, immediately.

*/


export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    // if we are in 'edit' mode (the only one available right now -
    // we should have an id. if we are in 'add' mode - we won't have one.
    const { bookId } = useParams()

    // in order to load async data - we gotta have useEffect.
    useEffect(() => {
        if (bookId) {
            loadBook()
        }
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('Problem getting book', err);
            })
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => navigate('/book'))
            .catch(err => {
                console.log('Cannot save!', err)
            })

    }

    // 2 way data binding 
    // TODO - price , authors, categories  //////////////

    // for now I only support book edit (no "add" button is shown to
    // the user) but this component can handke add as well in the future.
    const { title, subtitle, authors, publishedDate,  description, 
        pageCount, categories, language
    } = bookToEdit

    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="bookName">Title: </label>
                <input  value={title} onChange={handleChange} type="text" name="title" id="bookName" />

                <label htmlFor="subtitle">Subtitle: </label>
                <input  value={subtitle} onChange={handleChange} type="text" name="subtitle" id="subtitle" />
               
                <label htmlFor="description">Description: </label>
                <input  value={description} onChange={handleChange} type="text" name="description" id="description" />

                <label htmlFor="publishedDate">Published Year: </label>
                <input  value={publishedDate} onChange={handleChange} type="number" name="publishedDate" id="publishedDate" />

                <label htmlFor="pageCount">Page Count: </label>
                <input  value={pageCount} onChange={handleChange} type="number" name="pageCount" id="pageCount" />

                <label htmlFor="lang">Language: </label>
                <input  value={language} onChange={handleChange} type="text" name="language" id="lang" />

                <button>Save!</button>

            </form>
        </section>
    )
}