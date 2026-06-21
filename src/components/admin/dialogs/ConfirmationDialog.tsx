"use client";

import Modal from "./Modal";
import { DangerButton } from "../buttons/DangerButton";
import { SecondaryButton } from "../buttons/SecondaryButton";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationDialog({
  open,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
    >
      <div className="space-y-6">
        <p className="text-[var(--text-muted)]">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <SecondaryButton onClick={onCancel}>
            {cancelText}
          </SecondaryButton>

          <DangerButton
            onClick={onConfirm}
            disabled={loading}
          >
            {confirmText}
          </DangerButton>
        </div>
      </div>
    </Modal>
  );
}