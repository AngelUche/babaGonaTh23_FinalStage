// jshint esversion:6
import { ReactNode, useEffect } from "react";
import closeIconImg from "../../../assets/close.png";

type ModalProps = {
  closeModal: () => void;
  children: ReactNode;
  bare?: boolean
  info?: boolean
};

export function Modal({ closeModal, children, bare, info }: ModalProps) {
  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-[black]/70 flex justify-center items-center transitioncolors z-[200]   lg:pl-[160px]"onClick={closeModal}>
      <div className={`relative bg-white ${!bare && "px-3 py-8 sm:px-3 sm:py-9 sm:p-10 "} rounded-md `}>
        {/* This  */}
        {(!bare && !info) && (
          <img
            className="absolute top-9 right-6 w-[40px] h-[40px] z-[10] cursor-pointer"
            src={closeIconImg}
            alt="close icon"
            onClick={closeModal}
          />
        )}

        {/* Stop propagation to prevent closing modal */}
        <div
          className="h-max"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
