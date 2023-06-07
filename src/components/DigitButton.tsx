import styles from "./DigitButton.module.css";
import {Button } from "./Button";

interface DigitButtonProps {
  value: number;
  onClick: () => void;
}

export const DigitButton: React.FC<DigitButtonProps> = ({ value, onClick }) => {
  return (
    <Button
      className={`${styles["digitButton"]}`}
      value={value}
      onClick={onClick}
    />
  );
};
