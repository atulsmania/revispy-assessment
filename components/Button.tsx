import { ComponentProps } from 'react';

const Button = ({ children, ...rest }: ComponentProps<'button'>) => {
  return (
    <button
      className="bg-black text-white h-14 rounded-md text-center w-full font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
