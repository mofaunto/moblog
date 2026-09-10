import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog ref={dialogRef} className="modal" onClick={handleBackdropClick}>
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        {children}
      </div>
    </dialog>
  );
}

export default Modal;