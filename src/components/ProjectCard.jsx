import { motion } from "framer-motion";
import {Bookmark} from "lucide-react"

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      key={index}
      className="w-full md:w-[400px] h-[350px] bg-slate-800 rounded-md flex flex-col shadow-lg cursor-pointer overflow-hidden p-1 m-4"
      whileHover={{ scale: 1.05 }}
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
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-t border-slate-700">
         
          {/* User info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {project.user.photoURL ? (
            <motion.img
              src={project.user.photoURL}
              alt={project.user.displayName || project.user.email}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <motion.span
              className="text-xs font-semibold text-white bg-slate-700 w-8 h-8 flex items-center justify-center rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {project.user.displayName
                ? project.user.displayName.slice(0, 2).toUpperCase()
                : project.user.email.slice(0, 2).toUpperCase()}
            </motion.span>
          )}
        </div>
        {/* Project title */}
        <div className="text-sm  text-white truncate flex flex-col">
             <div className="truncate">{project.title}</div>
          {project.user.displayName && (
            <div className="truncate font-medium">{project.user.displayName}</div>
          )}
         
        </div>

       </div>
        <div>
         <Bookmark className="w-5 h-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;