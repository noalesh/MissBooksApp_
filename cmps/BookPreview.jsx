/* i'ts a preview of the item, usually links to another page
    with the full details.
    It gets an item as a prop and renders it.
    Commonly reports back to the parent for any important task 
    (callback).


*/

export function BookPreview({ book }) {

    return (
        <article className="book-preview">
           <h1>Book Preview: </h1>
           <h2>Book Title: <span className="book-name">{book.title}</span></h2>
           <h4>Subtitle: {book.subtitle}</h4>
           <h4>Authors: {book.authors}</h4>
           <h5>Price: {book.listPrice.amount}</h5>
        </article>
    )
}