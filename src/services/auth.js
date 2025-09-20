// services/AuthServices.js
import {
   GoogleAuthProvider,
   signInWithPopup,
   createUserWithEmailAndPassword,
    GithubAuthProvider ,
   signInWithEmailAndPassword ,
   signOut  
  } 
   from "firebase/auth";
import { auth } from "../config/firebase.config";


const githubprovider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();


export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(user, token);
    return { user, token };
  } catch (error) {
    console.error(error);
  }
};

export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubprovider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(user, token);
    return { user, token };
  } catch (error) {
    console.error(error);
  }
};

export const signUp = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  console.log(email, password);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User created:", user);
    return user;
  } catch (error) {
    console.error("Firebase error:", error);
  }
};


export const login = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  console.log(email, password);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in:", user);
    return user;
  } catch (error) {
    console.error("Firebase error:", error);
  }
};


export const logOut = async () => {
  try {
    await signOut(auth); // pass auth
    console.log("User signed out");
  } catch (error) {
    console.error("Firebase error:", error);
  }
};