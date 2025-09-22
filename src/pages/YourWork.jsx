import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import ProjectCard from "../components/ProjectCard";

function YourWork() {
  const user = useSelector((state) => state.auth.userData);
  const projectList = useSelector((state) => state.project.projectList);
  const searchTerm = useSelector((state) =>
    state.searchTerm?.searchTerm ? state.searchTerm.searchTerm : null
  );

  
  const projects = useMemo(() => {
    return projectList.filter((project) => project.user.uid === user.uid);
  }, [projectList, user]);

  const [filtered, setFiltered] = React.useState(null);

  useEffect(() => {
    if (searchTerm?.length > 0) {
      const filteredProjects = projects.filter((project) => {
        const lowercaseProj = project.title.toLowerCase();
        return searchTerm
          .toLowerCase()
          .split("")
          .every((letter) => lowercaseProj.includes(letter));
      });
      setFiltered(filteredProjects);
    } else {
      setFiltered(projects);
    }
  }, [searchTerm, projects]);

  return (
    <div className="flex-1 min-h-screen bg-slate-950 overflow-y-auto p-6 pt-8">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {(filtered?.length > 0 ? filtered : projects).map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

export default YourWork;
