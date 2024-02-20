import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../redux/actions';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const DeleteConfirmationDialog = () => {
  const contactToDelete = useSelector(state => state.contactToDelete);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contactToDelete.id));
  };

  return (
    <Dialog header="Confirm" visible={!!contactToDelete} onHide={() => dispatch({ type: 'CANCEL_DELETE' })}>
      <div className="confirmation-content">
        <p>Are you sure you want to delete {contactToDelete?.name}?</p>
      </div>
      <div className="p-dialog-footer">
        <Button label="No" onClick={() => dispatch({ type: 'CANCEL_DELETE' })} />
        <Button label="Yes" onClick={handleDelete} />
      </div>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
