import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, editContact } from '../redux/actions';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

const ContactList = () => {
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  const [selectedContact, setSelectedContact] = useState(null);
  const [visibleEditDialog, setVisibleEditDialog] = useState(false);
  const [editedContact, setEditedContact] = useState({ name: '', email: '', phone: '' });

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
    setEditedContact(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <DataTable value={contacts} selectionMode="single" selection={selectedContact} onSelectionChange={e => setSelectedContact(e.value)}>
        <Column field="name" header="Name" />
        <Column field="email" header="Email" />
        <Column field="phone" header="Phone" />
        <Column
          body={(rowData) => (
            <div>
              <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => handleEdit(rowData)} />
              <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => handleDelete(rowData.id)} />              
            </div>
          )}
        />
      </DataTable>

      <Dialog header="Edit Contact" visible={visibleEditDialog} onHide={() => setVisibleEditDialog(false)}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="name">Name</label>
            <InputText id="name" name="name" value={editedContact.name} onChange={onInputChange} />
          </div>
          <div className="p-field">
            <label htmlFor="email">Email</label>
            <InputText id="email" name="email" value={editedContact.email} onChange={onInputChange} />
          </div>
          <div className="p-field">
            <label htmlFor="phone">Phone</label>
            <InputText id="phone" name="phone" value={editedContact.phone} onChange={onInputChange} />
          </div>
        </div>
        <div className="p-dialog-footer">
          <Button label="Cancel" onClick={() => setVisibleEditDialog(false)} />
          <Button label="Save" onClick={saveEditedContact} />
        </div>
      </Dialog>
    </div>
  );
};

export default ContactList;
