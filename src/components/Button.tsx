import "./Button.css";
import React from 'react';

interface Props {
  className: string;
  value: string;
  onClick: () => void
}

export const Button: React.FC<Props> = ({className, value, onClick}) => {
  return (
    <button style={{border: 'none'}} className={className} onClick={onClick}>{value}</button>
  )
}

