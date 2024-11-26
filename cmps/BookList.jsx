


/* Where the user sees a list of preview items.
    will get a list and render the book previews.

*/

import { BookPreview } from "./BookPreview.jsx";
const { Link } = ReactRouterDOM
export function BookList({ books, onRemoveBook }) {
    return (
        <ul className="book-list">
         {/*   {cars.map(car =>
                <li key={car.id}>
                    <CarPreview car={car} />
                    <section>
                        <button onClick={() => onRemoveCar(car.id)}> Remove</button>
                        <button><Link to={`/car/${car.id}`}>Details</Link></button>
                        <button ><Link to={`/car/edit/${car.id}`}>Edit</Link></button>
                    </section>
                </li>
            )}   */}
        </ul>   
    )

}