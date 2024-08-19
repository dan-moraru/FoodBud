function InputField({ label, type, name, onChange, valueToEdit, readOnly}) {
  return (
    <section className="input-field">
      <label htmlFor={name}>{label}: </label>
      <input type={type} name={name} onChange={onChange} min={0}
        defaultValue={valueToEdit} readOnly={readOnly}/>
    </section>
  );
}
  
export default InputField;