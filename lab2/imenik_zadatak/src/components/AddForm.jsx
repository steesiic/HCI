import { useState } from "react";
import { validateFields } from "../utils/validate";

const EMPTY = { ime: "", prezime: "", telefon: "", email: "" };

function AddForm({ onAdd }) {
  const [fields, setFields] = useState(EMPTY);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setError(false);
  };

  const handleAdd = () => {
    if (!validateFields(fields)) {
      setError(true);
      return;
    }
    onAdd(fields);
    setFields(EMPTY);
    setError(false);
  };

  return (
    <div className="add-section">
      <h2>Novi kontakt</h2>
      <div className="add-form">
        {[["ime", "Ime"], ["prezime", "Prezime"], ["telefon", "Telefon"], ["email", "E-mail"]].map(
          ([name, label]) => (
            <div className="field" key={name}>
              <label>{label}</label>
              <input
                name={name}
                value={fields[name]}
                onChange={handleChange}
                className={error && !fields[name].trim() ? "error" : ""}
                placeholder={label}
              />
            </div>
          )
        )}
        {error && <div className="error-msg">! Sva polja moraju biti popunjena.</div>}
        <button className="btn btn-primary" onClick={handleAdd}>
          + Dodaj kontakt
        </button>
      </div>
    </div>
  );
}

export default AddForm;