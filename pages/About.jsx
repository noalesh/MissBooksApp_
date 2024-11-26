const { Outlet, Link, NavLink } = ReactRouterDOM

export function About() {

    return (
        <section className="about">
            <h1>About Miss Books</h1>
            <p>This is the story of our little online books shop!</p>

            <section>
                <nav>
                    <NavLink to="/about/team">Team</NavLink>
                    <NavLink to="/about/vision">Vision</NavLink>
                </nav>
            </section>

            <section>
                <Outlet />
            </section>

        </section>
    )
}