export default function PrincipleRow({ item }) {
  return (
    <li className="para-ti-path__step">
      <span className="para-ti-path__step-number" aria-hidden="true">
        {item.number}
      </span>
      <div className="para-ti-path__step-copy">
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
    </li>
  );
}
