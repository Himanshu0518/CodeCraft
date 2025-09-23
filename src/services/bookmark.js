import { doc, setDoc, collection, getDocs , serverTimestamp, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";


async function isBookMarked(userId, projectId){
    const docRef = doc(db, "users", userId, "bookmarks", projectId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

const bookmarkProject = async (userId, projectId) => {
  try {
    // Add bookmark in user's subcollection
    await setDoc(doc(db, "users", userId, "bookmarks", projectId), {
      bookmarkedAt: serverTimestamp(),
    });

    // // Increment count in project
    // await updateDoc(doc(db, "projects", projectId), {
    //   bookmarksCount: increment(1),
    // });

    console.log("Bookmarked!");
  } catch (error) {
    console.error("Error bookmarking project:", error);
  }
};

const unbookmarkProject = async (userId, projectId) => {
  try {
    // Remove bookmark from user's subcollection
    await deleteDoc(doc(db, "users", userId, "bookmarks", projectId));

    // Decrement count in project
    // await updateDoc(doc(db, "projects", projectId), {
    //   bookmarksCount: increment(-1),
    // });

    console.log("Unbookmarked!");
  } catch (error) {
    console.error("Error unbookmarking project:", error);
  }
};

const getBookmarkedProjects = async (userId) => {
  const bookmarksRef = collection(db, "users", userId, "bookmarks");
  const snapshot = await getDocs(bookmarksRef);

  const projectIds = snapshot.docs.map((doc) => doc.id);

  // now fetch actual project docs
  // you can loop or batch with where("id", "in", projectIds)
  return projectIds;
};

export {isBookMarked,bookmarkProject,unbookmarkProject,getBookmarkedProjects};