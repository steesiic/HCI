import { useState, useMemo } from "react";
import ContactCard from "./components/ContactCard";
import EditCard from "./components/EditCard";
import AddForm from "./components/AddForm";

const INITIAL = [
  { id: 1, ime: "Marko",  prezime: "Markovic",  telefon: "060 123 4567", email: "marko@email.com"  },
  { id: 2, ime: "Jovana", prezime: "Jovanovic",   telefon: "+381 63 987 6543", email: "jovana@email.com" },
  { id: 3, ime: "Stefan", prezime: "Stefanovic",  telefon: "063 555 7890", email: "stefan@email.com" },
];

function App() {
  const [contacts, setContacts] = useState(INITIAL);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [nextId, setNextId] = useState(100);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return contacts;
    return contacts.filter((c) =>
      [c.ime, c.prezime, c.telefon, c.email].some((v) =>
        v.toLowerCase().includes(q)
      )
    );
  }, [contacts, search]);

  const handleAdd = (fields) => {
    setContacts((prev) => [...prev, { ...fields, id: nextId }]);
    setNextId((n) => n + 1);
  };

  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleEdit = (contact) => setEditingId(contact.id);

  const handleSave = (updated) => {
    setContacts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setEditingId(null);
  };

  const handleCancel = () => setEditingId(null);

  return (
    <>
      <header>
        <h1>Imenik</h1>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <div className="search-wrap">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pretrazi kontakte..."
            />
          </div>
          <div className="divider" />
          <AddForm onAdd={handleAdd} />
        </aside>

        <main className="main">
          <div className="contacts-header">
            <h2>Kontakti</h2>
            <span className="count-badge">
              {filtered.length} / {contacts.length}
            </span>
          </div>

          <div className="contacts-list">
            {filtered.length === 0 && (
              <div className="empty-state">
                <div className="big">∅</div>
                <p>
                  {search
                    ? "Nema rezultata za pretragu."
                    : "Lista kontakata je prazna."}
                </p>
              </div>
            )}

            {filtered.map((contact) =>
              editingId === contact.id ? (
                <EditCard
                  key={contact.id}
                  contact={contact}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              ) : (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;