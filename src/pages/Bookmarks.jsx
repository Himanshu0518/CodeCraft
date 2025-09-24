import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import ProjectCard from "../components/ProjectCard";
import { getBookmarkedProjects } from "../services/bookmark";
import { FaStar } from "react-icons/fa";

function Bookmarks() {
  const user = useSelector((state) => state.auth.userData);
  const projectList = useSelector((state) => state.project.projectList);
  const searchTerm = useSelector((state) =>
    state.searchTerm?.searchTerm ? state.searchTerm.searchTerm : null
  );

  const [projectIds, setProjectIds] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Fetch bookmarked project IDs once user is available
  useEffect(() => {
    if (!user?.uid) {
      setProjectIds([]);
      return;
    }

    async function fetchBookmarks() {
      try {
        const ids = await getBookmarkedProjects(user.uid);
        setProjectIds(ids || []);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        setProjectIds([]);
      }
    }

    fetchBookmarks();
  }, [user?.uid]); // More specific dependency

  // Memoize projects to avoid unnecessary recalculations
  const projects = useMemo(() => {
    return projectList.filter((project) => projectIds.includes(project.id));
  }, [projectList, projectIds]);

  // Apply search filter with proper dependencies
  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      const filtered = projects.filter((project) => {
        const lowercaseProj = project.title.toLowerCase();
        return searchTerm
          .toLowerCase()
          .split("")
          .every((letter) => lowercaseProj.includes(letter));
      });
      setFiltered(filtered);
    } else {
      setFiltered(projects);
    }
  }, [searchTerm, projects]); // Include projects in dependencies

  return (
    <div className="flex-1 min-h-screen bg-slate-950 overflow-y-auto p-6 pt-8">
      <div className="flex flex-wrap gap-6">
        {filtered.length > 0 ? (
          filtered.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              projectId={project.id}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full py-20">
            <div className="text-slate-300 text-lg font-medium flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              <p>No bookmarked projects found</p>
            </div>
            <p className="text-slate-500 text-sm mt-2">
              Start exploring and bookmark projects you like!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookmarks;
