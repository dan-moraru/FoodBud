/**
 * InputRow is a component for grouping input fields together in a row.
 * @component
 * @param {object} props - The props for the InputRow component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the row.
 * @returns {JSX.Element} The rendered input row.
 */
function InputRow({ children }) {
  return <section className="input-row">{children}</section>;
}
  
export default InputRow;