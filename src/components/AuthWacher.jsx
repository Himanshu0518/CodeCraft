import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "@/features/authSlice";
import { auth, db } from "../config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import Spinner from "@/animations/Spinner";


const AuthWatcher = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
   

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Dispatch login immediately
        dispatch(
          login({
            userData: firebaseUser.providerData[0],
          })
        );

        // Save/update user in Firestore
        try {
          await setDoc(
            doc(db, "users", firebaseUser.uid),
            firebaseUser.providerData[0],
            { merge: true }
          );
        } catch (err) {
          console.error("Error saving user to Firestore:", err);
        }
      } else {
        
       
        dispatch(logout);
      }

      // Stop loading
      setIsLoading(false);
    });

    return () => unsubscribe();
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spinner />
      </div>
    );
  }

  return children;
};

export default AuthWatcher;
