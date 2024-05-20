import type { ReactNode } from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { closeModal } from "./modalSlice";

type ModalProps = {
  size?: "sma" | "md" | "lg";
  children: ReactNode;
  title: string;
};

export const Modal = ({ size = "md", children, title }: ModalProps) => {
  const isOpen = useAppSelector(state => state.modal.isOpen);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(closeModal());
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [dispatch]);

  if (!isOpen) return null;

  const modalSizeClass =
    size === "lg" ? "max-w-3xl" : size === "sma" ? "max-w-sm" : "max-w-2xl";

  return ReactDOM.createPortal(
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden backdrop-blur-md fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className={`relative p-4 w-full ${modalSizeClass} max-h-full`}>
        <div className="relative rounded-lg shadow bg-gray-700 bg-opacity-85 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => dispatch(closeModal())}
            >
              X
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4 flex-grow">{children}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
