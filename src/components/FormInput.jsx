const FormInput = ({
  register,
  errors,
  name,
  label,
  type,
  isTextArea,
  placeholder = 'Type here',

  additionalClass = null,
}) => {
  if (isTextArea) {
    return (
      <div className={`form-control w-[90%] ${additionalClass}`}>
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <textarea
          placeholder={placeholder}
          className={`textarea textarea-bordered w-full h-32 ${
            errors[name]?.type === 'required' && 'textarea-warning'
          }`}
          {...register}
        />
      </div>
    );
  }

  return (
    <div className={`form-control w-[90%] ${additionalClass}`}>
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
      />
    </div>
  );
};
export default FormInput;

//${
//   errors.name?.type === 'required' && 'input-warning'
// }
