"use client";

interface AdminFileUploadProps {
  label: string;

  accept?: string;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  preview?: string | null;
}

export default function AdminFileUpload({
  label,
  accept,
  onChange,
  preview,
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
        onChange={onChange}
        className="
        w-full
        rounded-xl
        border
        border-zinc-300
        dark:border-zinc-700
        bg-zinc-100
        dark:bg-black
        px-4
        py-3
        file:mr-4
        file:rounded-lg
        file:border-0
        file:bg-green-500
        file:px-4
        file:py-2
        file:text-white
        hover:file:bg-green-600
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
          border-zinc-300
          dark:border-zinc-700
          object-cover
          "
        />
      )}
    </div>
  );
}