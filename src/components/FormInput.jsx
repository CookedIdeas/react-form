const FormInput = ({
  register,
  errors,
  name,
  label,
  type,
  placeholder = 'Type here',
  disabled,
  additionalClass = null,
}) => {
  if (type === 'textarea') {
    return (
      <div className={`form-control ${additionalClass}`}>
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <textarea
          placeholder={placeholder}
          className={`textarea textarea-bordered w-full h-32 ${
            errors[name]?.type === 'required' && 'textarea-warning'
          }`}
          {...register}
          disabled={disabled}
        />
      </div>
    );
  } else {
    return (
      <div className={`form-control ${additionalClass}`}>
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className={`input input-bordered w-full ${
            errors[name]?.type === 'required' && 'input-warning'
          } ${errors[name]?.type === 'pattern' && 'input-error'}`}
          {...register}
          disabled={disabled}
        />
      </div>
    );
  }
};
export default FormInput;

//${
//   errors.name?.type === 'required' && 'input-warning'
// }
