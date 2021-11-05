import { createContext,useState, useContext,useEffect } from "react";
import { auth } from 'firebase';
const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState('');
  const [loading, setLoging] = useState(true);
  const value = {
    user,
    loading
  };

  useEffect(() => {
    const unsubscriibed = auth.onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
      setLoging(false);
    })
    return () => {
      unsubscriibed();
    }
  }, []);

  if(loading){
    return <p>Loading...</p>
  }else{
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    )
  }
}