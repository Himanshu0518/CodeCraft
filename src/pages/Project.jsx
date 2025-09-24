import { useState, useEffect } from "react";
import SplitPane from "react-split-pane";
import {
  FaChevronDown,
  FaHtml5,
  FaCss3,
  FaJs,
  FaBookmark,
} from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import CodeMirror from "@uiw/react-codemirror";
import { html as htmlLang } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { css as cssLang } from "@codemirror/lang-css";
import { Link, useParams } from "react-router-dom";
import { Code, LogOut, UserPen, Bookmark, Plus, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/authSlice";
import { logOut } from "../services/auth";
import { motion } from "framer-motion";
import { db } from "../config/firebase.config";
import {
  doc,
  setDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import {
  isBookMarked,
  bookmarkProject,
  unbookmarkProject,
} from "../services/bookmark";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AlertMessage from "@/components/Alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  isFollowing,
  followUser,
  unFollowUser,
} from "../services/subscription";

const Project = () => {
  const params = useParams();
  const projectList = useSelector((state) => state.project.projectList);

  const project = projectList.find(
    (project) => project.id === params.projectId
  );

  const [html, setHtml] = useState(project.html);
  const [css, setCss] = useState(project.css);
  const [js, setJs] = useState(project.js);
  const [output, setOutput] = useState(project.output);
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  //   const [isTitle, setIsTitle] = useState(false);
  //   const [title, setTitle] = useState("Untitled");
  const [alert, setAlert] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [existingDocId, setExistingDocId] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [follow, setFollow] = useState(false);

  const handleLogout = async () => {
    await logOut();
    dispatch(logout());
  };

  useEffect(() => {
    if (!user?.uid || !project) return;
    isBookMarked(user.uid, project.id).then(setBookmarked);
  }, [project, user]);

  useEffect(() => {
    if (!user?.uid || !project?.user?.uid) return;
    isFollowing(user.uid, project.user.uid).then(setFollow);
  }, [project, user]);

  const handleToggleBookmark = async () => {
    if (bookmarked) {
      await unbookmarkProject(user.uid, project.id);
      setBookmarked(false);
    } else {
      await bookmarkProject(user.uid, project.id);
      setBookmarked(true);
    }
  };

  const handleToggleFollow = async () => {
    if (follow) {
      await unFollowUser(user.uid, project.user.uid);
      setFollow(false);
    } else {
      await followUser(user.uid, project.user.uid);
      setFollow(true);
    }
  };

  useEffect(() => {
    setHtml(project.html);
    setCss(project.css);
    setJs(project.js);
  }, [project]);

  useEffect(() => {
    const updateOutput = () => {
      const combinedOutput = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Live Preview</title>
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>${js}</script>
</body>
</html>
`;
      setOutput(combinedOutput);
    };

    updateOutput();
  }, [html, css, js]);

  const checkAndSave = async () => {
    console.log("Save button clicked");

    const q = query(
      collection(db, "Projects"),
      where("title", "==", project.title),
      where("user.uid", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setExistingDocId(querySnapshot.docs[0].id);
      setOpenDialog(true);
    } else {
      await saveProjectToDB(`${Date.now()}`);
    }
  };
  const saveProjectToDB = async (id) => {
    const title = project.title;
    const _doc = {
      id,
      html,
      css,
      js,
      title,
      user,
      output,
      timestamp: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, "Projects", id), _doc, { merge: true });
      setAlert({
        show: true,
        message: existingDocId
          ? "Project overridden successfully!"
          : "Project saved successfully!",
        type: "success",
      });

      setTimeout(() => setAlert({ show: false }), 3000);
    } catch (err) {
      console.error("Error saving project:", err);
      setAlert({
        show: true,
        message: "Error saving project!",
        type: "error",
      });

      setTimeout(() => setAlert({ show: false }), 2000);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-slate-900">
      {alert && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          show={alert.show}
        />
      )}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Project already exists</AlertDialogTitle>
            <AlertDialogDescription>
              A project with the same title already exists. Do you want to
              override it?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                saveProjectToDB(existingDocId);
                setOpenDialog(false);
              }}
            >
              Override
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <header className="w-full h-20 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between shadow-md">
        {/* Left Section: Logo + Title */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link
            to="/home"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-wide">
              CodeCraft
            </span>
          </Link>

          {/* Editable Title */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-slate-300 truncate max-w-[150px]">
                {project.title}
              </p>
            </div>
          </div>

          {/* follow section */}
          {user.uid !== project.user.uid && (
            <div className="flex items-center gap-3">
              {/* Username */}
              <p className="text-sm font-medium text-slate-300 truncate max-w-[150px]">
                {user ? user.displayName : user.email?.split("@")[0]}
              </p>

              {/* Follow Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xs font-semibold shadow-md cursor-pointer"
                onClick={handleToggleFollow}
              >
                {follow ? (
                  <div className="flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Unfollow
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Plus className="w-4 h-4" />
                    Follow
                  </div>
                )}
              </motion.button>
            </div>
          )}
        </div>

        {/* Right Section: Save + User */}
        <div className="flex items-center gap-5">
          {/* Bookmark Icon */}
          {bookmarked ? (
            <div>
              <FaBookmark
                className="w-8 h-8 text-white cursor-pointer"
                onClick={handleToggleBookmark}
              />
            </div>
          ) : (
            <div>
              <Bookmark
                className="w-8 h-8 text-white cursor-pointer"
                onClick={handleToggleBookmark}
              />
            </div>
          )}
          {/* Save Button */}
          {user.uid === project.user.uid && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-semibold shadow-lg transition-colors"
              onClick={checkAndSave}
            >
              Save
            </motion.button>
          )}

          {/* User Dropdown */}
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 shadow-md overflow-hidden">
                  {user.photoURL ? (
                    <motion.img
                      src={user.photoURL}
                      alt="User Avatar"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium text-white"
                    >
                      {user.email
                        ? user.email.slice(0, 2).toUpperCase()
                        : user.displayName.slice(0, 2).toUpperCase()}
                    </motion.span>
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-52 bg-slate-900 border border-slate-700 rounded-lg p-2 text-white shadow-lg"
              >
                <DropdownMenuLabel className="px-2 py-1 text-xs uppercase tracking-wider text-slate-400">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-slate-800 cursor-pointer">
                  Profile <UserPen className="w-4 h-4 text-slate-400" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleLogout()}
                  className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-slate-800 cursor-pointer"
                >
                  Logout <LogOut className="w-4 h-4 text-red-400" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>
      </header>

      <SplitPane split="horizontal" minSize={150} defaultSize="60%">
        {/* Top code section */}
        <div className="flex h-full">
          {/* HTML editor */}
          <SplitPane split="vertical" minSize={200} defaultSize="33%">
            <div className="flex flex-col h-full border-r border-slate-700">
              <div className="flex justify-between items-center px-2 py-1 bg-slate-800 border-b border-slate-700 rounded-t-md">
                <div className="flex items-center gap-2">
                  <FaHtml5 className="text-orange-500" />
                  <span className="text-sm font-medium text-white">HTML</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaChevronDown className="text-gray-400 hover:text-white cursor-pointer transition" />
                  <IoIosSettings className="text-gray-400 hover:text-white cursor-pointer transition" />
                </div>
              </div>
              <div className="flex-1 p-2">
                <CodeMirror
                  value={html}
                  height="100%"
                  width="100%"
                  theme="dark"
                  extensions={[htmlLang()]}
                  onChange={(value) => setHtml(value)}
                />
              </div>
            </div>

            {/* CSS editor */}
            <SplitPane split="vertical" minSize={200} defaultSize="50%">
              <div className="flex flex-col h-full border-r border-slate-700">
                <div className="flex justify-between items-center px-2 py-1 bg-slate-800 border-b border-slate-700 rounded-t-md">
                  <div className="flex items-center gap-2">
                    <FaCss3 className="text-blue-500" />
                    <span className="text-sm font-medium text-white">CSS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaChevronDown className="text-gray-400 hover:text-white cursor-pointer transition" />
                    <IoIosSettings className="text-gray-400 hover:text-white cursor-pointer transition" />
                  </div>
                </div>
                <div className="flex-1 p-2">
                  <CodeMirror
                    value={css}
                    height="100%"
                    width="100%"
                    theme="dark"
                    extensions={[cssLang()]}
                    onChange={(value) => setCss(value)}
                  />
                </div>
              </div>

              {/* JS editor */}
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center px-2 py-1 bg-slate-800 border-b border-slate-700 rounded-t-md">
                  <div className="flex items-center gap-2">
                    <FaJs className="text-yellow-500" />
                    <span className="text-sm font-medium text-white">JS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaChevronDown className="text-gray-400 hover:text-white cursor-pointer transition" />
                    <IoIosSettings className="text-gray-400 hover:text-white cursor-pointer transition" />
                  </div>
                </div>
                <div className="flex-1 p-2">
                  <CodeMirror
                    value={js}
                    height="100%"
                    width="100%"
                    theme="dark"
                    extensions={[javascript()]}
                    onChange={(value) => setJs(value)}
                  />
                </div>
              </div>
            </SplitPane>
          </SplitPane>
        </div>

        {/* Bottom preview section */}
        <div className="h-full border-t border-slate-700 bg-white">
          <iframe
            srcDoc={output}
            title="Live Preview"
            sandbox="allow-scripts"
            className="w-full h-full bg-white"
          ></iframe>
        </div>
      </SplitPane>
    </div>
  );
};

export default Project;
