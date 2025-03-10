export function ToyPreview({ toy }) {
  return (
    <section className="toy-preview">
      <h4>{toy.name}</h4>
      <ul className="toy-labels-list">
        {toy.labels.map((label) => (
          <span className="toy-label" key={label}>{label}</span>
        ))}
      </ul>
      <span>Created at: {toy.createdAt}</span>
      <span>Price: {toy.price.toLocaleString()}$</span>
      <span>In stock: {toy.stock}</span>
    </section>
  );
}
