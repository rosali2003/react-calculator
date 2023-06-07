import styles from "./OperationButton.module.css";
import {Button } from "./Button";

interface OperationButtonProps {
  value: string;
  onClick: () => void;
}

export const OperationButton: React.FC<OperationButtonProps> = ({ value, onClick }) => {
  return (
    <Button
      className={`${styles["operationButton"]}`}
      value={value}
      onClick={onClick}
    />
  );
};
