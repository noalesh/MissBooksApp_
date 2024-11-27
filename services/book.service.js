import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}

// For Debug (easy access from console):
// window.bs = bookService

// TODO - finish filter !!!!!!!! ///////////////////////////// TODO


function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
          /*  if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(car.vendor))
            }

            if (filterBy.minSpeed) {
                cars = cars.filter(car => car.maxSpeed >= filterBy.minSpeed)
            }*/


                // TODO - filtering 

            console.log("PLEASE NOTICE  no filter is implemented yet... TODO")
    
            return books

        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(CAR_KEY, car)
    } else {
        return storageService.post(CAR_KEY, car)
    }
}

// it doesn't make any sense to filter by the fields: 
//       id, description, thumbnail.
function getDefaultFilter(
        filterBy = { title:"", subtitle:"", 
        authors:[], publishedDate:null, 
        pageCount:0, categories:[],
        language:"", listPrice:{} }) {
    return {    
            title: filterBy.title, 
            subtitle: filterBy.subtitle,
            authors: filterBy.authors,
            publishedDate: filterBy.publishedDate,
            pageCount: filterBy.pageCount, 
            categories: filterBy.categories,
            language: filterBy.language,
            listPrice: filterBy.listPrice
        }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [
                utilService.makeLorem(1)
                ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `http://coding-academy.org/books-photos/${i+1}.jpg`,
                language: "en",
                listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
        utilService.saveToStorage(BOOK_KEY, books)
        // console.log("DEBUG - books created. books : ", books)

    }

}


// the below functions are not needed,
// just re-wrote from the cars example.
function _createBook(id, title, subtitle, authors, 
    publishedDate, description, pageCount, categories,
    thumbnail, language, listPrice) {
    const newBook = getEmptyBook(id, title, subtitle, authors, 
        publishedDate, description, pageCount, categories,
        thumbnail, language, listPrice)
    newBook.id = utilService.makeId()
    return newBook
}

function getEmptyBook(id="", title="", subtitle="", authors=[], 
    publishedDate=null, description="", pageCount=0, 
    categories=[], thumbnail=null, language="", listPrice={}) {

        return { 
                id, 
                title, 
                subtitle, 
                authors, 
                publishedDate, 
                description, 
                pageCount, 
                categories,
                thumbnail, 
                language, 
                listPrice
        }
    }