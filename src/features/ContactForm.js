import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, editContact } from '../redux/actions';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const ContactForm = ({ contact }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(contact || { name: '', email: '', phone: '' });
  const [visible, setVisible] = useState(false);

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
  };

  return (
    <div>
      <br></br>
      <Button label="Add Contact" onClick={() => setVisible(true)} />      
      <br></br><br></br>
      <Dialog header={contact ? 'Edit Contact' : 'Add Contact'} visible={visible} onHide={() => setVisible(false)}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="name">Name</label>
            <InputText id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="p-field">
            <label htmlFor="email">Email</label>
            <InputText id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="p-field">
            <label htmlFor="phone">Phone</label>
            <InputText id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
        </div>
        <div className="p-dialog-footer">
          <Button label="Cancel" onClick={() => setVisible(false)} />
          <Button label="Save" onClick={handleSubmit} />
        </div>
      </Dialog>
    </div>
  );
};

export default ContactForm;
