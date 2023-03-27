import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastSucess = (props) => {
  toast.success(<>{props}</>, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });
};
