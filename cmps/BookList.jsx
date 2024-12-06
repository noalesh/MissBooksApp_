import { BookPreview } from "./BookPreview.jsx";

const { Link } = ReactRouterDOM

/* Where the user sees a list of preview items.
    will get a list and render the book previews.

*/

export function BookList({ books }) {
    return (
        <ul className="book-list">
           {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button><Link to={`/book/${book.id}`}>see Book Details</Link></button>
                    </section>
                    <div>{console.log("inside BookList - books are: ", books)}</div>
                </li>
            )}   
        </ul>   
    )

}