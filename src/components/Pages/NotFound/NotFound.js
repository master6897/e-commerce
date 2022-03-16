import { Link } from "react-router-dom"

const NotFound = () => {
    return(
        <div>
            <h1>Page not found</h1>
            <button>
                <Link to='/'>Back to main page</Link>
            </button>
        </div>
    )
}

export default NotFound;