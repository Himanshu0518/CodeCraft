import { doc, setDoc, collection, getDocs, getDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase.config";

// Check if user is following another user
async function isFollowing(userId, targetId) {
  const docRef = doc(db, "users", userId, "following", targetId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

// Follow a user
const followUser = async (userId, targetId) => {
  try {
    // Add to user's following
    await setDoc(doc(db, "users", userId, "following", targetId), {
      followingAt: serverTimestamp(),
    });

    // Add to target's followers
    await setDoc(doc(db, "users", targetId, "followers", userId), {
      followedAt: serverTimestamp(),
    });

    console.log("User followed successfully!");
  } catch (error) {
    console.error("Error following user:", error);
  }
};

// Unfollow a user
const unFollowUser = async (userId, targetId) => {
  try {
    // Remove from user's following
    await deleteDoc(doc(db, "users", userId, "following", targetId));

    // Remove from target's followers
    await deleteDoc(doc(db, "users", targetId, "followers", userId));

    console.log("User unfollowed successfully!");
  } catch (error) {
    console.error("Error unfollowing user:", error);
  }
};

// Get list of IDs the user is following
const getFollowingUsers = async (userId) => {
  const followingRef = collection(db, "users", userId, "following");
  const snapshot = await getDocs(followingRef);
  return snapshot.docs.map((doc) => doc.id);
};

const getFollowers = async (userId) => {
  const followersRef = collection(db, "users", userId, "followers");
  const snapshot = await getDocs(followersRef);
  return snapshot.docs.map((doc) => doc.id);
}
export { isFollowing, followUser, unFollowUser, getFollowingUsers , getFollowers};
