const mailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const formQuestions = [
  { name: 'name', label: 'Your name', type: 'text' },
  { name: 'company', label: 'Your company', type: 'text' },
  {
    name: 'email',
    label: 'Your email',
    type: 'mail',
    validationPattern: mailRegex,
  },
  { name: 'phone', label: 'Your phone', type: 'tel' },
  {
    name: 'message',
    label: 'Your message',
    type: 'textarea',
    isTextArea: true,
  },
];
