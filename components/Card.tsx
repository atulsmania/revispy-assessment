import { PropsWithChildren } from 'react';

type CardProps = {
  title?: string;
} & PropsWithChildren;

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="border border-[#C1C1C1] rounded-[20px] px-12 w-[576px] py-8">
      {title && (
        <div className="text-center mb-6">
          <span className="font-semibold text-3xl">{title}</span>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
