import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, index, projectId }) => {
  return (
    <motion.div
      key={index}
      className="w-full max-w-[450px] h-[280px] sm:h-[320px] md:h-[350px] bg-slate-800 rounded-md flex flex-col shadow-lg cursor-pointer overflow-hidden p-1 mx-auto"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Live Preview */}
      <div className="flex-1 border-b border-slate-700 overflow-hidden bg-white">
        <iframe
          srcDoc={project.output}
          title={`Live Preview - ${project.title}`}
          sandbox="allow-scripts"
          className="w-full h-full"
        ></iframe>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-slate-900 border-t border-slate-700 min-h-[60px]">
        {/* User info */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <Link 
          to = {`/home/profile/${project.user.uid}`}
          className="flex items-center gap-2 flex-shrink-0">
            {project.user.photoURL ? (
              <motion.img
                src={project.user.photoURL}
                alt={project.user.displayName || project.user.email}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <motion.span
                className="text-xs font-semibold text-white bg-slate-700 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full flex-shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {project.user.displayName
                  ? project.user.displayName.slice(0, 2).toUpperCase()
                  : project.user.email.slice(0, 2).toUpperCase()}
              </motion.span>
            )}
          </Link>
          
          {/* Project title and user info */}
          <div className="text-xs sm:text-sm text-white min-w-0 flex-1">
            <div className="truncate font-medium">{project.title}</div>
            {project.user.displayName && (
              <div className="truncate text-slate-300 text-xs">
                {project.user.displayName}
              </div>
            )}
          </div>
        </div>

        {/* View Button */}
        <Link
          to={`/home/project/${projectId}`}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 
             text-white font-semibold text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-md shadow-md 
             transition-all duration-200 ease-in-out flex items-center justify-center flex-shrink-0 ml-2"
        >
          <span className="hidden sm:inline">View</span>
          <span className="sm:hidden">→</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;