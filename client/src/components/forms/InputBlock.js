/**
 * InputBlock is a component for grouping input fields together in a block.
 * @component
 * @param {object} props - The props for the InputBlock component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the block.
 */
function InputBlock({ children }) {
  return <section className="input-block">{children}</section>;
}
  
export default InputBlock;