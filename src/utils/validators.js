function validateName(validationErrors, name) {
  const nameRegex = /^[a-zA-Z\s]*$/;
  if (name.trim() === "") {
    validationErrors.name = "Name cannot be empty";
  } else if (!nameRegex.test(name.trim())) {
    validationErrors.name =
      "Activity name should include letters and spaces only";
  }
}

function validateDeadline(validationErrors, deadline) {
  if (deadline <= new Date()) {
    validationErrors.deadline = "Please select a valid deadline";
  }
}

export function validateUserDetails(email, password) {
  const errors = {};

  const emailRegex = /\S+@\S+\.\S+/;

  if (email.trim() === "") {
    errors.email = "Ener your email address";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please provide a valid email address";
  }

  if (password.length < 6) {
    errors.password = "Password should contain at least six characters";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

//validate new activity inputs
export function validateActivity(activityName, category, deadline) {
  const validationErrors = {};
  validateName(validationErrors, activityName);
  validateDeadline(validationErrors, deadline);
  if (category.trim() === "") {
    validationErrors.category = "Please select a category";
  }

  return {
    validationErrors,
    valid: Object.keys(validationErrors) < 1,
  };
}

//validate new task inputs
export function validateTask(deadline, task) {
  const validationErrors = {};
  validateName(validationErrors, task);
  validateDeadline(validationErrors, deadline);
  return {
    validationErrors,
    valid: Object.keys(validationErrors).length < 1,
  };
}
