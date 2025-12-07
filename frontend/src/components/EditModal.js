import React from "react";


import closeIcon from "../images/Close.png";

function EditModal({ title, fields, data, setData, onClose, onSubmit }) {
  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        {/* Header */}
        <div className="edit-modal-header">
          <label>{title}</label>
          <button className="close-btn" onClick={onClose}>
            <img src={closeIcon} alt="close" />
          </button>
        </div>

        {/* Body */}
        <div className="edit-modal-body">
          {fields.map((field) => (
            <div key={field.key}>
              <label>{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  value={data[field.key] || ""}
                  onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                />
              ) : (
                <input
                  type={field.type || "text"}
                  value={data[field.key] || ""}
                  onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="edit-modal-footer">
          <button className="update-btn" onClick={onSubmit}>
            Update Information
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
