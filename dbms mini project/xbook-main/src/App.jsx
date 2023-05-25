import './App.css';
import { Redirect, Route, Switch } from 'react-router';
import HomePage from "./pages/Home/Home.page"
import AuthenticationPage from "./pages/Authentication/Authentication.page"
import ShopPage from './pages/Shop/Shop.page'
import CheckoutPage from './pages/Checkout/Checkout.page'
import { useContext } from 'react';
import { CurrentUserContext } from './context/CurrentUserContext';

function App() {

  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/home">
        <HomePage />
      </Route>
      <Route path="/auth">
        {currentUser == null ? <AuthenticationPage /> : <Redirect to="/shop" />}
      </Route>
      <Route path="/shop">
      {currentUser == null ? <Redirect to="/auth" /> : <ShopPage />}
      </Route>
      <Route path="/checkout/:bookID">
      {currentUser == null ? <Redirect to="/auth" /> : <CheckoutPage />}
      </Route>
      <Route path="*">
      <Redirect to="/home" />
      </Route>
    </Switch>
  );
}

export default App;
