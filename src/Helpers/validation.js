export const validateInput = (type, value) => {
  if (!value) return;

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const validateAlphanum = RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{2,}$/);
  let error = null;

  switch (type) {
    case "email":
      error = validEmailRegex.test(value) ? null : "Enter a valid email!";
      break;
    case "password":
      if (value.length < 8) error = "Password must be 8 characters long!";
      // add password regex check later
      break;
    case "alphanum":
      error = validateAlphanum.test(value)
        ? null
        : "Enter Alphanumeric characters only!";
      break;
    default:
      break;
  }

  return error;
};
