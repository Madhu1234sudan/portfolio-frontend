"use client";

interface SelectOption {
  label: string;
  value: string | number;
}

interface AdminSelectProps {
  label: string;

  value: string | number;

  options: SelectOption[];

  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;

  disabled?: boolean;
}

export default function AdminSelect({
  label,
  value,
  options,
  onChange,
  disabled = false,
}: AdminSelectProps) {
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

      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
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
        outline-none
        transition-all
        focus:border-green-500
        disabled:opacity-60
        "
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}