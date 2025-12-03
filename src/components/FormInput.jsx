const FormInput = ({
  label,
  id,
  type = 'text', //default type given as text.
  value,
  onChange,
  error,
  placeholder,
  ...rest
}) => {
  const inputClass = ['form-control'];
  if (error) {
    inputClass.push('is-invalid');
  }

  return (
    <div className="mb-3">
        {/* if label prop is passed then only render. */}
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        className={inputClass.join(' ')}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        // collecting any extra props..
        {...rest}
      />

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormInput;
