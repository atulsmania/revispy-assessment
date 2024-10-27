'use client';

import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type Props = {
  label?: string;
  length?: number;
  onComplete?: (value: string) => void;
  onChange?: (value: string) => void;
};

const PinInput = ({ length = 4, onComplete, label, onChange }: Props) => {
  const [values, setValues] = useState(Array(length).fill(''));

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (value.match(/^\d*$/)) {
      const newValues = [...values];
      newValues[index] = value.slice(-1);
      setValues(newValues);

      if (onChange) {
        onChange(newValues.join(''));
      }

      if (value && index < length - 1) {
        const target = e.target as HTMLInputElement;
        const next = target.nextSibling as HTMLInputElement;
        next?.focus();
      }

      if (newValues.every((v) => v !== '') && onComplete) {
        onComplete(newValues.join(''));
      }
    }
  };

  const handleBackspace = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key !== 'Backspace') return;
    if (values[index] && index > 0) return;
    const target = e.target as HTMLInputElement;
    const previous = target.previousSibling as HTMLInputElement;
    previous?.focus();
  };

  return (
    <div className="space-y-1">
      <label className="font-normal text-base">{label}</label>
      <div className="flex gap-2 justify-between">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            className="border border-[#C1C1C1] rounded-md text-lg text-center w-12 h-12"
            type="text"
            maxLength={1}
            value={values[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PinInput;
