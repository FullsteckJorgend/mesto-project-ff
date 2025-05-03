function isValid(string, input) {
  const textInputError = document.querySelector(`.${input.id}-error`);
  const message = input.dataset.errorMessage;
  const pattern = input.getAttribute("pattern");
  const regex = new RegExp(pattern);

  if (input.validity.valid && regex.test(string) && string.length > 1) {
    hideInputError(textInputError, input);
  } else if (input.validity.patternMismatch) {
    showInputError(message, textInputError, input);
  } else {
    showInputError(input.validationMessage, textInputError, input);
  }
}

function hideInputError(textInputError, input) {
  textInputError.classList.add("input-error-non-active");
  input.removeAttribute("style");
}

function showInputError(errorMessage, textInputError, input) {
  textInputError.textContent = errorMessage;
  textInputError.classList.remove("input-error-non-active");
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
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
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
        isValid(evt.target.value, input);
        toggleButtonState(inputs, button, config);
      });
    });

    toggleButtonState(inputs, button, config);
  });
}

export { clearValidation, enableValidation };
