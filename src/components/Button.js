import "./Button.css";
import React from 'react';

export const Button = ({className, value, onClick}) => {
  return (
    <button style={{border: 'none'}} className={className} onClick={onClick}>{value}</button>
  )
}

