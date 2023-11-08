import { useForm } from 'react-hook-form';
import { formQuestions } from './assets/formQuestions';
import FormInput from './components/FormInput';
import { usePostForm } from './utils';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';

function App() {
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

  // === Form error management === //

  const [errorTypesArray, setErrorTypesArray] = useState([]);

  const validateForm = () => {
    if (!errors) return;
    console.log('error presence');

    // transform error object to array
    const errorsAsArray = Object.entries(errors);

    // loop thru errorsAsArray and test error types

    let tempErrorArray = [];
    if (errorsAsArray.length > 0) {
      errorsAsArray.map((singleError) => {
        tempErrorArray.push(singleError[1]?.type);
      });
      setErrorTypesArray(tempErrorArray);
    }
  };

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
          <form
            className={`w-[90%] sm:w-2/3 md:w-1/2 max-w-xl flex flex-col gap-2 items-center max-h-96`}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* INPUTS */}
            {formQuestions.map((question) => (
              <FormInput
                key={question.name}
                {...question}
                register={{
                  ...register(question.name, {
                    required: true,
                    pattern: question.validationPattern,
                  }),
                }}
                errors={errors}
              />
            ))}

            {/* SUBMIT BUTTON */}
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
              {isSuccess && 'Form submitted !'}
              {isError && 'Retry ?'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default App;
