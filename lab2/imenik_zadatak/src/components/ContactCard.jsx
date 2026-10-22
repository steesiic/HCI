function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className="contact-card">
      <div>
        <div className="contact-name">
          {contact.ime} {contact.prezime}
        </div>
        <div className="contact-details">
          <span className="contact-detail">
            <span className="ico">☎</span>
            {contact.telefon}
          </span>
          <span className="contact-detail">
            <span className="ico">@</span>
            {contact.email}
          </span>
        </div>
      </div>
      <div className="card-actions">
        <button className="btn btn-sm btn-edit" onClick={() => onEdit(contact)}>
          Izmeni
        </button>
        <button className="btn btn-sm btn-delete" onClick={() => onDelete(contact.id)}>
          Obrisi
        </button>
      </div>
    </div>
  );
}

export default ContactCard;