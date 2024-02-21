import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const EditContactForm = ({ visible, onHide, editedContact, onInputChange, saveEditedContact }) => {
  return (
    <Dialog header="Edit Contact" visible={visible} onHide={onHide}>
      <div className="p-fluid">
        <div className="p-field" style={{ marginBottom: "10px" }}>
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            name="name"
            value={editedContact.name}
            onChange={onInputChange}
          />
        </div>
        <div className="p-field" style={{ marginBottom: "10px" }}>
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            name="email"
            value={editedContact.email}
            onChange={onInputChange}
          />
        </div>
        <div className="p-field" style={{ marginBottom: "10px" }}>
          <label htmlFor="phone">Phone Number</label>
          <InputText
            id="phone"
            name="phone"
            value={editedContact.phone}
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="p-dialog-footer">
        <Button label="Cancel" onClick={onHide} />
        <Button label="Save" onClick={saveEditedContact} />
      </div>
    </Dialog>
  );
};

export default EditContactForm;
