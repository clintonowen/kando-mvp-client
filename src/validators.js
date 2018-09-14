export const required = value => (value ? undefined : 'Required');

export const nonEmpty = value => 
value.trim() !== '' ? undefined : 'Cannot be empty';

export const noEmail = value => 
value ? undefined : 'Please provide an email';

export const noUser = value => 
value ? undefined : 'Please provide a username';

export const noPass = value => 
value ? undefined : 'Please provide a password';

export const noConfirm = value => 
value ? undefined : 'Please confirm password';

export const isTrimmed = value => 
value.trim() === value ? undefined : 'Cannot start or end with whitespace';

export const userLength = value => 
(value.length >= 6 && value.length <= 30)
  ? undefined
  : `Sorry, your username must be between 6 and 30 characters long`;

export const passLength = value => 
(value.length >= 8 && value.length <= 72)
  ? undefined
  : `Use between 8 and 72 characters for your password`;

export const matches = field => (value, allValues) => 
field in allValues && value.trim() === allValues[field].trim()
  ? undefined
  : 'Does not match';

const userRegExp = new RegExp("^[a-zA-Z0-9_]+$")
export const goodChars = value => 
userRegExp.test(value)
  ? undefined
  : 'Sorry, only letters (a-z), numbers (0-9), and underscores ( _ ) are allowed';

const emailRegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const goodEmail = value =>
emailRegExp.test(value)
  ? undefined
  : 'Please enter a valid email address';
