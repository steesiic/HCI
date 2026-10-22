import { useState } from "react";
import { validateFields } from "../utils/validate";

function EditCard({ contact, onSave, onCancel }) {
  const [fields, setFields] = useState({ ...contact });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setError(false);
  };

  const handleSave = () => {
    const { ime, prezime, telefon, email } = fields;
    if (!validateFields({ ime, prezime, telefon, email })) {
      setError(true);
      return;
    }
    onSave(fields);
  };

  const borderColor = (field) =>
    error && !fields[field].trim() ? "var(--danger)" : "var(--border)";

  return (
    <div className="edit-card">
      <div className="edit-row">
        {[["ime", "Ime"], ["prezime", "Prezime"], ["telefon", "Telefon"], ["email", "E-mail"]].map(
          ([name, label]) => (
            <div key={name}>
              <div className="edit-label">{label}</div>
              <input
                name={name}
                value={fields[name]}
                onChange={handleChange}
                className={error && !fields[name].trim() ? "error" : ""}
                style={{ border: `1px solid ${borderColor(name)}` }}
              />
            </div>
          )
        )}
      </div>

      {error && <div className="error-msg">! Sva polja moraju biti popunjena.</div>}

      <div className="edit-actions">
        <button className="btn btn-sm btn-cancel" onClick={onCancel}>
          Otkazi
        </button>
        <button className="btn btn-sm btn-save" onClick={handleSave}>
          Sacuvaj
        </button>
      </div>
    </div>
  );
}

export default EditCard;