import styles from "./Button.module.css";
import React from 'react';

interface ButtonProps {
  className: string;
  value: string|number;
  onClick: () => void
}

export const Button: React.FC<ButtonProps> = ({className, value, onClick}) => {
  return (
    <button className={`${className} ${styles["button"]}`} onClick={onClick}>{value}</button>
  )
}

