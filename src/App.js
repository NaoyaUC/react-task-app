import { SignUp } from 'components/Auth/SignUp';
import { AuthProvider } from 'components/Auth/AuthContext';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import { Home } from 'components/pages/Home';
import { Header } from 'components/Layout/Header';
import { Login } from 'components/Auth/Login';
import { PrivateRoute } from 'components/Route/PrivateRoute';
import { PublicRoute } from 'components/Route/PublicRoute';
import { Footer } from 'components/Layout/Footer';
import { MemoList } from 'components/pages/MemoList';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PublicRoute path="/signup" component={SignUp} />
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute path="/memo" component={MemoList}/>
        </Switch>

        <Footer/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

