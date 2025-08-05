// components/ui/modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface ModalHeaderProps {
  children: React.ReactNode;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children }) => {
  return <div className="modal-header">{children}</div>;
};

interface ModalTitleProps {
  children: React.ReactNode;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ children }) => {
  return <h2 className="modal-title">{children}</h2>;
};

interface ModalFooterProps {
  children: React.ReactNode;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
  return <div className="modal-footer">{children}</div>;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Footer = ModalFooter;

export default Modal;