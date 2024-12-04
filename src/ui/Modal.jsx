import { useRef, useEffect } from "react";

export default function Modal({ children, isOpen }) {
  const modal = useRef();

  useEffect(() => {
    if (isOpen) {
      modal.current.showModal();
    } else {
      modal.current.close();
    }
  }, [isOpen]);

  return (
    <dialog className="modal" ref={modal}>
      {children}
    </dialog>
  );
}
