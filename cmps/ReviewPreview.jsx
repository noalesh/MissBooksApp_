// this will be rendered in the BookDetails page.

export function ReviewPreview({ review }) {

    return (
        <article className="review-preview">
           <h1>Reader's review: </h1>
           <h2>Reader's name: <span className="reader-name">{review.fullName}</span></h2>
           <h4>Date Of Reading: {review.dateOfReading}</h4>
           <h4>Rating: {review.rating}</h4>
        </article>
    )
}