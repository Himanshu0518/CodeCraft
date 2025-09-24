import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import ProjectCard from "../components/ProjectCard";
import { FaStar } from "react-icons/fa";
import { getFollowingUsers } from "../services/subscription";

function Following() {
  const user = useSelector((state) => state.auth.userData);
  const projectList = useSelector((state) => state.project.projectList);
  const searchTerm = useSelector((state) =>
    state.searchTerm?.searchTerm ? state.searchTerm.searchTerm : ""
  );

  const [followingUsers, setFollowingUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Fetch following users once user is available
  useEffect(() => {
    if (!user?.uid) {
      setFollowingUsers([]);
      return;
    }

    async function fetchFollowing() {
      try {
        const followList = await getFollowingUsers(user.uid);
        setFollowingUsers(followList || []);
      } catch (error) {
        console.error("Error fetching following users:", error);
        setFollowingUsers([]);
      }
    }

    fetchFollowing();
  }, [user?.uid]); // More specific dependency

  // Memoize projects to avoid unnecessary recalculations
  const projects = useMemo(() => {
    return projectList.filter((project) =>
      followingUsers.includes(project.user.uid)
    );
  }, [projectList, followingUsers]);

  // Apply search filter with proper dependencies
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredProjects = projects.filter((project) => {
        const titleLower = project.title.toLowerCase();
        return searchTerm
          .toLowerCase()
          .split("")
          .every((letter) => titleLower.includes(letter));
      });
      setFiltered(filteredProjects);
    } else {
      setFiltered(projects);
    }
  }, [searchTerm, projects]); // Include projects in dependencies

  return (
    <div className="flex-1 min-h-screen bg-slate-950 overflow-y-auto p-6 pt-8">
      {projects.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              projectId={project.id}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full py-20">
          <div className="text-slate-300 text-lg font-medium flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            <p>No projects from followed users</p>
          </div>
          <p className="text-slate-500 text-sm mt-2">
            Follow users to see their projects here!
          </p>
        </div>
      )}
    </div>
  );
}

export default Following;