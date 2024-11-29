const { useState } = React

// useState for toggle situation

function txtToDisplay (txt, maxLengthToDisplay, toShowMore) {
    if (toShowMore) {
        // show the whole text
        return txt
    } else {
        // show only length characters
        if (txt.length<=maxLengthToDisplay) {
            return txt
        } else {
            return txt.slice(0, maxLengthToDisplay)
        }
    }
}

/* note to self - IMPORTANT!
    why passing in a value to a state setter onClick event handler causes an infinite loop ??
    calling the state setter like this:
        <button onClick={setToShowMore(!toShowMore)}>Show More/less</button>
    will cause this : "setToShowMore(!toShowMore)" to be executed, and because the state was 
    changed - the component will render again, and this will be called again and so on...
    the onClick should receieve a function, not an execution of one!
*/ 

export function LongTxt({ txt, length=100 }) {

    const [ toShowMore, setToShowMore ] = useState(false)

    return (
        <section className="long-txt">
           <p>{txtToDisplay(txt, length, toShowMore)}</p>
           <button onClick={() => setToShowMore(!toShowMore)}>Show More/less</button>
        </section>
    )
}