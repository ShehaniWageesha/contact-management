import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import AddContactForm from "./features/AddContactForm";
import Contact from "./features/Contact";
import reducer from "./store/reducer";
import Navbar from "./components/Navbar";

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <div style={{ padding: "50px" }}>
          <AddContactForm />
          <Contact />
        </div>
      </div>
    </Provider>
  );
}

export default App;
