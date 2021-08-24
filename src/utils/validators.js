//validate new activity inputs
export function validateActivity(activityName, category, deadline) {
  const validationErrors = {};
  const activityNameRegex = /^[a-zA-Z\s]*$/;
  if (activityName.trim() === "") {
    validationErrors.activityName = "Activity name cannot be empty";
  } else if (!activityNameRegex.test(activityName.trim())) {
    validationErrors.activityName =
      "Activity name should include letters and spaces only";
  }

  if (category.trim() === "") {
    validationErrors.category = "Please select a category";
  }

  if (deadline <= new Date()) {
    validationErrors.deadline =
      "Please select a valid deadline for your activity";
  }

  return {
    validationErrors,
    valid: Object.keys(validationErrors) < 1,
  };
}
