

export const DigitButton = ({className, value, onClick}) => {
  return (
    <button className={className} onClick={onClick}>{value}</button>
  )
}
