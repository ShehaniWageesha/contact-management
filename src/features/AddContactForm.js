import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact, editContact } from "../store/actions";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const AddContactForm = ({ contact }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(
    contact || { name: "", email: "", phone: "" }
  );
  const [visible, setVisible] = useState(false);
  let toast;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (contact) {
      dispatch(editContact(formData));
    } else {
      dispatch(addContact({ ...formData, id: Date.now() }));
    }
    setVisible(false);
    toast.show({
      severity: "success",
      summary: "Success",
      detail: "Contact added successfully",
    });
  };

  return (
    <div>
      <Button
        label="Add Contact"
        onClick={() => setVisible(true)}
        style={{ float: "right" }}
      />
      <br></br>
      <br></br>
      <br></br>
      <Dialog
        header={contact ? "Edit Contact" : "Add Contact"}
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <div className="p-fluid">
          <div className="p-field" style={{ marginBottom: "10px" }}>
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="p-field" style={{ marginBottom: "10px" }}>
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="p-field" style={{ marginBottom: "10px" }}>
            <label htmlFor="phone">Phone Number</label>
            <InputText
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="p-dialog-footer" style={{ marginBottom: "10px" }}>
          <Button label="Cancel" onClick={() => setVisible(false)} />
          <Button label="Save" onClick={handleSubmit} />
        </div>
      </Dialog>
      <Toast ref={(el) => (toast = el)} />
    </div>
  );
};

export default AddContactForm;
