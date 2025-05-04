function isValid(string, input, config) {
  const textInputError = document.querySelector(
    `.${input.id}${config.errorSuffix}`
  );
  const message = input.dataset.errorMessage;
  const pattern = input.getAttribute("pattern");
  const regex = new RegExp(pattern);

  if (input.validity.valid && regex.test(string) && string.length > 1) {
    hideInputError(textInputError, input, config);
  } else if (input.validity.patternMismatch) {
    showInputError(message, textInputError, input, config);
  } else {
    showInputError(input.validationMessage, textInputError, input, config);
  }
}

function hideInputError(textInputError, input, config) {
  textInputError.classList.add(config.errorClass);
  input.removeAttribute("style");
}

function showInputError(errorMessage, textInputError, input, config) {
  textInputError.textContent = errorMessage;
  textInputError.classList.remove(config.errorClass);
  input.setAttribute("style", "border-bottom: 1px solid red;");
}

function toggleButtonState(inputs, button, config) {
  const allValid = inputs.every((input) => input.validity.valid);

  if (allValid) {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute("disabled");
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute("disabled", true);
  }
}

function clearValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    const errorElement = form.querySelector(
      `.${input.id}${config.errorSuffix}`
    );
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.add(config.errorClass);
    }
    input.removeAttribute("style");
  });

  button.classList.add(config.inactiveButtonClass);
  button.setAttribute("disabled", true);
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", (evt) => {
        isValid(evt.target.value, input, config);
        toggleButtonState(inputs, button, config);
      });
    });

    toggleButtonState(inputs, button, config);
  });
}

export { clearValidation, enableValidation };
