import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const ContactTable = ({ contacts, selectedContact, handleEdit, handleDelete }) => {
  return (
    <DataTable
      value={contacts}
      selectionMode="single"
      selection={selectedContact}
    >
      <Column field="name" header="Name" />
      <Column field="email" header="Email" />
      <Column field="phone" header="Phone Number" />
      <Column
        header="Actions"
        body={(rowData) => (
          <div>
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-success"
              onClick={() => handleEdit(rowData)}
            />
            &nbsp;&nbsp;
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger"
              onClick={() => handleDelete(rowData)}
            />
          </div>
        )}
      />
    </DataTable>
  );
};

export default ContactTable;
