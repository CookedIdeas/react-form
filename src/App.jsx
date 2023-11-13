import { useForm } from 'react-hook-form';
import { formQuestions } from './assets/formQuestions';
import FormInput from './components/FormInput';
import { usePostForm } from './utils';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';

function App() {
  // === useForm hook === //

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // === Form submit management === //

  const { postForm, isLoading, isError, isSuccess } = usePostForm();

  const onSubmit = (formAnswers) => {
    postForm(formAnswers);
  };

  // === Fold form === //

  const [foldForm, setFoldForm] = useState(false);

  useEffect(() => {
    isSuccess && setFoldForm(true);
  }, [isSuccess]);

  // === Form error management === //

  const [errorTypesArray, setErrorTypesArray] = useState([]);

  const validateForm = () => {
    // if no error, return
    if (Object.entries(errors).length === 0) return;

    // transform error object to array
    const errorsAsArray = Object.entries(errors);

    // loop thru errorsAsArray and store error types in errorTypesArray state
    let tempErrorArray = [];
    if (errorsAsArray.length > 0) {
      errorsAsArray.map((singleError) => {
        tempErrorArray.push(singleError[1]?.type);
      });
      setErrorTypesArray(tempErrorArray);
    }
  };

  // check errors types in errorTypesArray state
  // for each type, trigger a toast
  useEffect(() => {
    // if error type required or pattern → trigger toastify with info
    errorTypesArray.includes('required') &&
      toast.warning('At least one required field is missing');
    errorTypesArray.includes('pattern') &&
      toast.error('At least one field is not valid');
  }, [errorTypesArray]);

  return (
    <>
      <ToastContainer position="top-right" />
      <main className="m-8 grid place-items-center">
        <div className="flex flex-col w-full items-center">
          <h1 className="text-2xl mb-4">Send me your message !</h1>
          {isSuccess && (
            <div className="flex flex-col gap-2 items-center">
              <h2>Your form have been submitted !</h2>
              <button className="btn" onClick={() => setFoldForm(!foldForm)}>
                Toggle submitted form
              </button>
            </div>
          )}
          <form
            className={`sm:w-2/3 md:w-1/2 max-w-xl grid lg:grid-cols-2 gap-4 items-center overflow-hidden transition-[max-height] duration-500 ${
              foldForm ? 'max-h-0 ' : 'max-h-[900px]'
            }`}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* INPUTS */}
            {formQuestions.map((question) => (
              // input textarea → full width → lg:col-span-2
              <div
                key={question.name}
                className={`px-2 ${
                  question.type === 'textarea'
                    ? 'lg:col-span-2'
                    : 'lg:col-span-1'
                } `}
              >
                <FormInput
                  {...question}
                  register={{
                    ...register(question.name, {
                      required: true,
                      pattern: question.validationPattern,
                    }),
                  }}
                  errors={errors}
                  //  disable form if already successfully submitted
                  disabled={isSuccess}
                />
              </div>
            ))}

            {/* SUBMIT BUTTON */}
            <div className="lg:col-span-2 grid self-center place-items-center">
              <button
                className="btn btn-primary w-48 mt-4"
                type="submit"
                disabled={isSuccess}
                onClick={validateForm}
              >
                {/* DEFAULT */}
                {!isLoading && !isSuccess && !isError && 'Submit'}
                {/* POST STATE DEPENDANT CONTENT */}
                {isLoading && (
                  <>
                    <span className="loading loading-dots loading-xs"></span>
                    Sending...
                  </>
                )}
                {isSuccess && 'Form already submitted !'}
                {isError && 'Retry ?'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default App;
