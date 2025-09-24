import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.config";
import ProjectCard from "../components/ProjectCard";
import { Users, UserPlus, Code, Calendar, Mail } from "lucide-react";
import Spinner from "../animations/Spinner";
import { motion } from "framer-motion";
import {
  isFollowing,
  followUser,
  unFollowUser,
  getFollowers,
  getFollowingUsers,
} from "../services/subscription";

function Profile() {
  const { userId } = useParams();
  const projectList = useSelector((state) => state.project.projectList);
  const user = useSelector((state) => state.auth.userData);

  const [userData, setUserData] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [follow, setFollow] = useState(false);

  // Fetch user data
  useEffect(() => {
    async function fetchUser() {
      try {
        const q = query(collection(db, "users"), where("uid", "==", userId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setUserData(querySnapshot.docs[0].data());
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    }
    if (userId) fetchUser();
  }, [userId]);

  // Filter projects by user
  useEffect(() => {
    const projects = projectList.filter(
      (project) => project.user?.uid === userId
    );
    setUserProjects(projects);
  }, [projectList, userId]);

  // Fetch followers/following numbers and follow status
  useEffect(() => {
    async function fetchFollowData() {
      if (!userId || !user?.uid) return;
      const followersList = await getFollowers(userId);
      const followingList = await getFollowingUsers(userId);
      setFollowersCount(followersList.length);
      setFollowingCount(followingList.length);
      const isUserFollowing = await isFollowing(user.uid, userId);
      setFollow(isUserFollowing);
    }
    fetchFollowData();
  }, [userId, user]);

  const handleToggleFollow = async () => {
    if (!user?.uid) return;
    if (follow) {
      await unFollowUser(user.uid, userId);
      setFollow(false);
      setFollowersCount((prev) => prev - 1);
    } else {
      await followUser(user.uid, userId);
      setFollow(true);
      setFollowersCount((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col justify-center items-center">
        <div className="text-center p-10 bg-slate-800/50 rounded-3xl border border-slate-700 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-2">User Not Found</h2>
          <p className="text-slate-400 mb-4">
            The profile you're looking for doesn't exist.
          </p>
          <Link
            to="/home"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg"
          >
            <Code className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/home"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">CodeCraft</span>
          </Link>
        </div>
      </header>

      {/* Profile Header */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 relative rounded-b-3xl overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Profile Info Container */}
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-20 pb-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              {/* Avatar */}
              <div className="relative">
                {userData.photoURL ? (
                  <motion.img
                    src={userData.photoURL}
                    alt={userData.displayName}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl object-cover"
                  />
                ) : (
                  <motion.span
                    className="flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-slate-700 text-3xl font-bold text-white shadow-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {userData.email
                      ? userData.email.slice(0, 1).toUpperCase()
                      : userData.displayName.slice(0, 1).toUpperCase()}
                  </motion.span>
                )}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full shadow-md"></div>
              </div>

              {/* Name and Info */}
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {userData.displayName || "Unknown User"}
                </h1>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-slate-300">
                  {userData.email && (
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <Mail className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="text-sm md:text-base">{userData.email}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-sm md:text-base">
                      Joined{" "}
                      {userData.createdAt
                        ? new Date(
                            userData.createdAt.seconds * 1000
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })
                        : "Recently"}
                    </span>
                  </div>
                </div>

                {userData.bio && (
                  <p className="text-slate-300 mt-3 max-w-md md:text-base">
                    {userData.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Action Button */}
            {user?.uid !== userId && (
              <div className="flex justify-center md:justify-end mt-4 md:mt-0">
                <button
                  onClick={handleToggleFollow}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg ${
                    follow
                      ? "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/30"
                  }`}
                >
                  {follow ? "Following" : "Follow"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[{
            label: "Projects",
            value: userProjects.length,
            icon: <Code className="w-6 h-6 text-indigo-400" />
          }, {
            label: "Followers",
            value: followersCount,
            icon: <Users className="w-6 h-6 text-blue-400" />
          }, {
            label: "Following",
            value: followingCount,
            icon: <UserPlus className="w-6 h-6 text-green-400" />
          }].map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700 hover:bg-slate-800/70 transition-all shadow-md"
            >
              <div className="flex items-center justify-center mb-3">
                {stat.icon}
              </div>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Projects
            <span className="ml-3 text-sm font-normal text-slate-400">
              ({userProjects.length})
            </span>
          </h2>
        </div>

        {userProjects.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {userProjects.map((project, index) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.03 }}
                className="transition-all duration-200"
              >
                <ProjectCard
                  project={project}
                  index={index}
                  projectId={project.id}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-12 text-center border border-slate-700 shadow-lg max-w-md">
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">No Projects Yet</h3>
              <p className="text-slate-400 leading-relaxed">
                {user?.uid === userId
                  ? "Start building something amazing! Your projects will appear here once you create them."
                  : "This user hasn't shared any projects yet. Check back later to see their work."}
              </p>
              {user?.uid === userId && (
                <Link
                  to="/newProject"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all font-medium shadow-lg"
                >
                  <Code className="w-4 h-4" />
                  Create Project
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
