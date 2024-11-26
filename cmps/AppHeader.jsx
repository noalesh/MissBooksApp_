const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return (
        <header className="app-header-custom full main-layout">
            <section className="header-container">
                <section className="logo-style">
                <img src="../assets/logo_img.png" alt="logo image" width="40" height="40"></img>
                <h1>Miss Books</h1>
                </section>
            </section>
            <h3>Your online book store!</h3>
            <nav className="app-nav">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/book">Store</NavLink>
            </nav>
        </header>
    )
}
