import { ComponentProps } from 'react';

type InputProps = {
  label?: string;
} & ComponentProps<'input'>;

const Input = ({ label, ...rest }: InputProps) => {
  return (
    <label className="space-y-1 block">
      <span className="font-normal text-base">{label}</span>
      <input
        className="w-full border border-[#C1C1C1] rounded-md py-2.5 px-4 h-12"
        type="text"
        {...rest}
      />
    </label>
  );
};

export default Input;
