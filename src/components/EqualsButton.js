import "./EqualsButton.css";
import "./Button.css";

export const EqualsButton = ({className, value, onClick}) => {
  return (
    <button className={className} onClick={onClick}>{value}</button>
  )
}

