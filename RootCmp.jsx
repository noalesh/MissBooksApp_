
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./cmps/Home.jsx"

import { About } from "./pages/About.jsx"
import { Team } from "./cmps/AboutCmp/Team.jsx"
import { Vision } from "./cmps/AboutCmp/Vision.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { AddReview } from "./cmps/AddReview.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"

const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

export function RootCmp() {
    return (
        <Router>
            <section className="app main-layout">
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/home" element={<Home/>} />
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/about" element={<About/>} >
                            <Route path="/about/team" element={<Team/>} />
                            <Route path="/about/vision" element={<Vision/>} />
                        </Route>
                        <Route path="/book" element={<BookIndex/>} />
                        <Route path="/book/:bookId" element={<BookDetails/>} />
                        <Route path="/book/edit" element={<BookEdit/>} />
                        <Route path="/book/edit/:bookId" element={<BookEdit/>} />
                        <Route path="/book/review/:bookId" element={<AddReview/>} />
                        <Route path="*" element={<NotFound/>} />
                </Routes>
            </main>
            <UserMsg />
        </section>
        </Router>
    )
}