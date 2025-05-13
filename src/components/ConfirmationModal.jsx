import React from "react";
import Button from "./Button";

/**
 * A reusable confirmation modal component
 * @param {Object} props - The component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call when closing the modal
 * @param {Function} props.onConfirm - Function to call when confirming the action
 * @param {string} props.title - The modal title
 * @param {string} props.message - The confirmation message
 * @param {string} props.confirmText - Text for the confirm button
 * @param {string} props.cancelText - Text for the cancel button
 * @param {string} props.confirmType - Button type for the confirm button (primary, secondary, tertiary)
 * @param {boolean} props.isLoading - Whether the confirm action is loading
 */
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed with this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmType = "primary",
  isLoading = false
}) => {
  if (!isOpen) return null;

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-title"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30"></div>

      {/* Modal content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative z-10">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4" id="confirmation-title">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mb-6">{message}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              types="button"
              type="secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button 
              types="button" 
              type={confirmType}
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;