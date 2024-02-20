import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact, editContact } from "../store/actions";
import ContactTable from "./ContactTable";
import EditContactForm from "./EditContactForm";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

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
  let toast;

  const handleEdit = (contact) => {
    setEditedContact(contact);
    setSelectedContact(contact);
    setVisibleEditDialog(true);
  };

  const saveEditedContact = () => {
    dispatch(editContact(editedContact));
    setVisibleEditDialog(false);
    toast.show({
      severity: "success",
      summary: "Success",
      detail: "Contact edited successfully",
    });
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
    toast.show({
      severity: "success",
      summary: "Success",
      detail: "Contact deleted successfully",
    });
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
      <ConfirmDialog
        visible={visibleDeleteDialog}
        onHide={() => setVisibleDeleteDialog(false)}
        message="Are you sure you want to delete this contact?"
        header="Confirm"
        icon="pi pi-exclamation-triangle"
        acceptClassName="p-button-danger"
        rejectClassName="p-button-secondary"
        acceptLabel="Yes"
        rejectLabel="No"
        accept={confirmDelete}
        reject={() => setVisibleDeleteDialog(false)}
      />
      <Toast ref={(el) => (toast = el)} />
    </div>
  );
};

export default Contact;
