import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navigation from "./components/Navigation";
import ShoppingList from "./components/ShoppingList";
import Auth from "./components/newComponents/Auth";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/">
          <Navigation />
          <ShoppingList />
        </Route>
        <Route path="/auth" component={Auth} />
      </Router>
    </Provider>
  );
}

export default App;
