
export const OperationButton = ({className, value, onClick}) => {
  return (
    <button className={className} onClick={onClick}>{value}</button>
  )
}
