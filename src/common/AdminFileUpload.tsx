"use client";

interface AdminFileUploadProps {
  label: string;
  accept?: string;
  preview?: string | null;
  onChange: (file: File | null) => void;
}

export default function AdminFileUpload({
  label,
  accept,
  preview,
  onChange,
}: AdminFileUploadProps) {
  return (
    <div>
      <label
        className="
        block
        mb-2
        font-medium
        text-black
        dark:text-white
        "
      >
        {label}
      </label>

      <input
        type="file"
        accept={accept}
        onChange={(e) => {
          const file = e.currentTarget.files?.[0] ?? null;
          onChange(file);
        }}
        className="
        w-full
        rounded-xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        px-4
        py-3
        file:mr-4
        file:rounded-lg
        file:border-0
        file:bg-[var(--primary)]
        file:text-white
        file:px-4
        file:py-2
        hover:file:bg-[var(--primary-hover)]
        "
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="
          mt-4
          h-24
          w-24
          rounded-xl
          border
          border-[var(--border)]
          object-cover
          "
        />
      )}
    </div>
  );
}