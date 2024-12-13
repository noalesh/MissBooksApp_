import { ReviewPreview } from "./ReviewPreview.jsx";

const { Link } = ReactRouterDOM

/* Where the user sees a list of reviews for that book.
    will get a list and render the reviews in the BookDetails page.

*/

//<div>{console.log("inside BookList - books are: ", books)}</div>

export function ReviewList({ reviews, onRemoveReview }) {

    return (
        <ul className="review-list">
           {reviews.map(review =>
                <li key={review.id}>
                    <ReviewPreview review={review} />
                    <section>
                        <button onClick={() => onRemoveReview(review.id)}>Remove Review</button>
                    </section>
                </li>
            )}   
        </ul>   
    )

}