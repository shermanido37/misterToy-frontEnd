import { Link } from "react-router-dom";

export function ToyDetails(toyID){
    return (
        <main className="toy-details">
            <Link to='/toys'>Back to List</Link>
        </main>
    )
}