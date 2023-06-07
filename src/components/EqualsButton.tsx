import React from 'react';
import styles from './EqualsButton.module.css';
import { Button } from './Button';

interface EqualsButtonProps {
  value: string;
  onClick: () => void;
}

export const EqualsButton: React.FC<EqualsButtonProps> = ({ value, onClick }) => {
  return (
    <Button
      className={`${styles["equalsButton"]}`}
      value={value}
      onClick={onClick}
    />
  );
};
