import { bookService } from "../services/book.service.js"

const { useState, useEffect, useRef } = React

 /* notes to self - 
    1. useRef is similar to useState in that it keeps a state,
    but unlike useState, it will not cause the component to re-render 
    anytime it's being updated.

    2. every time we have an input, we would like to have a state to hold it.
    it is called "two-way-data-binding" - 
    changes in view update the model.
    changes in model update the view. 
    This way we do not touch the inputs' we work on the state, 
    for example, if we want to add "-" in a phone number the user is typing.

    */

export function BookFilter({ defaultFilter, onSetFilter }) {

    // it makes more sense that the BookFilter will ask the service for the default filter.
    const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])



    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
        console.log('filterByToEdit:', filterByToEdit)
    }

    /*
    // Notes to self:
    // 1. in Vanila - onInput, in React - onChange
    // 2. every event has a "target" and that's the HTML element that evoked that event!
    function handleBookTitleChange(ev) {
        setFilterByToEdit(filter => ({...filter, title: ev.target.value}))
    }

    // note to self:
    // the "+" is for converting the string into a number.
    function handleBookMinPriceChange(ev) {
        setFilterByToEdit(filter => ({...filter, minPrice: +ev.target.value}))
    }

    function handleBookMaxPriceChange(ev) {
        setFilterByToEdit(filter => ({...filter, maxPrice: +ev.target.value}))
    }  */

    // following funtion is from class :
    function handleChange({ target }) {
        // TODO - this is equivalent to "const field = target.name" - WHY???
        /// ???????????????
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
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  
        // I want to update the filterBy in BookIndex in every keyboard stroke, why not
        // put it here : 
        // onSetFilter(filterByToEdit)
        // answer: because it's async - React will execute the "setState" async so it 
        // can batch if we have several "useState" calls, and so if we cal; onSetFilter
        // right after, it will be called with the previous filter.
        // the way to respond to changes in the state is by using useEffect.
  
    }
    

    // notes to self :
    // in order to implement the "2 way data binding" - the following line, and "value" fields in the <input>.
    const { bookName, minPrice, maxPrice } = filterByToEdit
    // 'name' is the key in the object we are editing...
    // 'id' has the same value as in 'htmlFor' becasue it's what connecting them.
    // vanila 'for' in tage <label> is 'htmlFor' in React.
    return (
        <article className="book-filter">
           <h1>Please enter filter values:</h1>
           <form onSubmit={onSubmitFilter}>
                <label htmlFor="bookName">Book Name</label>
                <input  value={bookName} onChange={handleChange} type="text" name="title" id="bookName" />

                <label htmlFor="minPrice">Min Price</label>
                <input  value={minPrice} onChange={handleChange} type="number" name="minPrice" id="minPrice" />

                <label htmlFor="maxPrice">Max Price</label>
                <input  value={maxPrice} onChange={handleChange} type="number" name="maxPrice" id="maxPrice" />


                <button>Submit</button>

           </form>
        </article>
    )
}