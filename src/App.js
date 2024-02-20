import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ContactForm from './features/ContactForm';
import ContactList from './features/ContactList';
import DeleteConfirmationDialog from './features/DeleteConfirmationDialog';
import reducer from './redux/reducer';
import Navbar from './components/Navbar';

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <ContactForm />
        <ContactList />
        <DeleteConfirmationDialog />
      </div>
    </Provider>
  );
}

export default App;
