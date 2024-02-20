import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact, editContact } from "../store/actions";
import ContactTable from "./ContactTable";
import EditContactForm from "./EditContactForm";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const Contact = () => {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const [selectedContact, setSelectedContact] = useState(null);
  const [visibleEditDialog, setVisibleEditDialog] = useState(false);
  const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);
  const [editedContact, setEditedContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [contactToDelete, setContactToDelete] = useState(null);

  const handleEdit = (contact) => {
    setEditedContact(contact);
    setSelectedContact(contact);
    setVisibleEditDialog(true);
  };

  const saveEditedContact = () => {
    dispatch(editContact(editedContact));
    setVisibleEditDialog(false);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContact((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDelete = (contact) => {
    setContactToDelete(contact);
    setVisibleDeleteDialog(true);
  };

  const confirmDelete = () => {
    dispatch(deleteContact(contactToDelete.id));
    setVisibleDeleteDialog(false);
  };

  return (
    <div>
      <ContactTable
        contacts={contacts}
        selectedContact={selectedContact}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <EditContactForm
        visible={visibleEditDialog}
        onHide={() => setVisibleEditDialog(false)}
        editedContact={editedContact}
        onInputChange={onInputChange}
        saveEditedContact={saveEditedContact}
      />
      <Dialog
        header="Confirm"
        visible={visibleDeleteDialog}
        onHide={() => setVisibleDeleteDialog(false)}
      >
        <div>Are you sure you want to delete this contact?</div>
        <br></br>
        <div className="p-dialog-footer">
          <Button label="No" onClick={() => setVisibleDeleteDialog(false)} />
          <Button label="Yes" onClick={confirmDelete} />
        </div>
      </Dialog>
    </div>
  );
};

export default Contact;
