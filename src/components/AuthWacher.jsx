import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "@/features/authSlice";
import { auth, db } from "../config/firebase.config";
import {
  doc,
  setDoc,
  query,
  orderBy,
  collection,
  onSnapshot,
} from "firebase/firestore";
import Spinner from "@/animations/Spinner";
import { setProjects } from "../features/projectSlice";

const AuthWatcher = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
       
        dispatch(
          login({
            userData: firebaseUser.providerData[0],
          })
        );

       
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
        dispatch(logout());
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const projectquery = query(
      collection(db, "Projects"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(projectquery, (snapshot) => {
      const projects = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();

        return {
          id: docSnap.id,
          ...data,
          
          timestamp: data.timestamp
            ? data.timestamp.toMillis()
            : null,
        };
      });

      console.log(projects);
      dispatch(setProjects(projects));
    });

    return unsubscribe;
  }, [dispatch]);

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
