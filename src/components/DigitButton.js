import "./DigitButton.css";
import "./Button.css";

export const DigitButton = ({className, value, onClick}) => {
  return (
    <button className={className} onClick={onClick}>{value}</button>
  )
}
