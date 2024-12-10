import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

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


 /* // for debug purposes only :  
    useEffect(() => {
        console.log("DEBUG - bookToEdit.listPrice.isOnSalechanged , and is now: ", bookToEdit.listPrice.isOnSale)
    }, [bookToEdit.listPrice.isOnSale]) */

    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('Problem getting book', err);
                showErrorMsg('Problem getting book')

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

    function handlePriceChange ({ target }) {
        let { value, name } = target
        let newListPrice= bookToEdit.listPrice
     //   console.log("inside handlePriceChange , value is: ", value, " and name is: ", name)

        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }

        switch (name) {
            case 'price':
                newListPrice.amount = value
            //    console.log("DEBUG - changed the newListPrice.amount to ", value)
                break
            case 'onSale' :
                newListPrice.isOnSale = value
              //  console.log("DEBUG - changed the newListPrice.isOnSale to ", value)
                break
        }
        setBookToEdit( (prevBook) => ({ ...prevBook, listPrice: newListPrice}))

    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => {navigate('/book')
                showSuccessMsg("Book changes were saved!")
            })
            .catch(err => {
                console.log('Cannot save!', err)
                showErrorMsg("Something went worng.. Cannot save book...")
            })

    }

    // 2 way data binding 

    // this component supports EDIT / ADD book.
    // if there is bookId - edit.
    const { title, subtitle, authors, publishedDate,  description, 
        pageCount, categories, language, listPrice} = bookToEdit
    
    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="bookName">Title: </label>
                <input value={title} onChange={handleChange} type="text" name="title" id="bookName" />

                <label htmlFor="subtitle">Subtitle: </label>
                <input value={subtitle} onChange={handleChange} type="text" name="subtitle" id="subtitle" />
               
                <label htmlFor="authors">Authors: </label>
                <input value={authors} onChange={handleChange} type="text" name="authors" id="authors" />

                <label htmlFor="description">Description: </label>
                <input value={description} onChange={handleChange} type="text" name="description" id="description" />

                <label htmlFor="publishedDate">Published Year: </label>
                <input value={publishedDate} onChange={handleChange} type="number" name="publishedDate" id="publishedDate" />

                <label htmlFor="pageCount">Page Count: </label>
                <input value={pageCount} onChange={handleChange} type="number" name="pageCount" id="pageCount" />

                <label htmlFor="categories">Categories: </label>
                <input value={categories} onChange={handleChange} type="text" name="categories" id="categories" />

                <label htmlFor="lang">Language: </label>
                <input value={language} onChange={handleChange} type="text" name="language" id="lang" />

                <label htmlFor="price">Price: </label>
                <input value={listPrice.amount} onChange={handlePriceChange} type="number" name="price" id="price" />

                <label htmlFor="isOnSale">on Sale ?: </label>
                <input checked={listPrice.isOnSale} onChange={handlePriceChange} type="checkbox" name="onSale" id="isOnSale" />

                <button>Save!</button>

            </form>
        </section>
    )
}