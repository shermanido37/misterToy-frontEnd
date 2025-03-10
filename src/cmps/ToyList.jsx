import { Link } from "react-router-dom";
import { ToyPreview } from "./ToyPreview";

export function ToyList({ toys, onRemoveToy, onEditToy }) {
    return (
        (toys && toys.length > 0) ? (
          <ul className="toy-list">
            {toys.map((toy) => (
              <li key={toy.id}>
                <ToyPreview toy={toy} />
                <div className="toy-buttons">
                  <button onClick={() => onRemoveToy(toy.id)}>X</button>
                  <Link className="button-link" to={`/toy/edit/${toy.id}`}>Edit</Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>No toys match these criteria.</div>
        )
      );
      
}
