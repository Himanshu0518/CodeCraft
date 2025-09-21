import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AlertMessage = ({ type = "success", message = "Saved successfully!", show = true }) => {
  // type: "success" | "error" | "info"
  
  const getVariantProps = () => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
          variant: "default",
          bg: "bg-green-50",
          border: "border-green-400",
        };
      case "error":
        return {
          icon: <XCircle className="w-5 h-5 text-red-500" />,
          variant: "destructive",
          bg: "bg-red-50",
          border: "border-red-400",
        };
      case "info":
      default:
        return {
          icon: <Info className="w-5 h-5 text-blue-500" />,
          variant: "default",
          bg: "bg-blue-50",
          border: "border-blue-400",
        };
    }
  };

  const { icon, bg, border } = getVariantProps();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`flex items-start gap-3 p-4 rounded-md border ${border} ${bg} shadow-md`}
        >
          {icon}
          <div className="flex flex-col">
            <AlertTitle className="text-sm font-semibold text-slate-900">
              {message}
            </AlertTitle>
            <AlertDescription className="text-xs text-slate-700">
              {type === "success"
                ? "Your changes have been saved."
                : type === "error"
                ? "Something went wrong. Please try again."
                : "Here’s some information for you."}
            </AlertDescription>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertMessage;
