import { useContext, createContext, useState, useEffect, use } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/app/firebase"; 
import firebaseApp from '@/app/firebase';
import { updateDoc, setDoc, doc, getFirestore, collection, getDoc } from 'firebase/firestore'

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const db = getFirestore(firebaseApp);
  const [accCheck, setAccCheck] = useState(Boolean);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Llama a la función para registrar el usuario en Firestore
      registerUserInFirestore(user);

    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      alert("No posee cuenta autorizada");
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const registerUserInFirestore = async (user) => {
    try {
      const userRef = doc(db, 'users', user?.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.data() === undefined) {
        setDoc(doc(db, 'users', user.uid), {
          displayName: user.displayName,
          email: user.email,
          isAdmin: false,
        })
          .then(() => {
            console.log("Usuario registrado en Firestore:", user.uid);
          })
          .catch((error) => {
            console.error("Error al registrar el usuario en Firestore:", error.message);
          });
      } else {
        console.warn("Usuario ya Registrado.");
      }
    } catch (error) {
      console.warn(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
