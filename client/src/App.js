import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Navigation from "./components/Navigation";
import ShoppingList from "./components/ShoppingList";

function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <ShoppingList />
    </Provider>
  );
}

export default App;
