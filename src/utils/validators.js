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
