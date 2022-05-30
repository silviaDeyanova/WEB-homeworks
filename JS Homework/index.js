const username = document.getElementById("username");
const firstName = document.getElementById("name");
const familyName = document.getElementById("family-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const street = document.getElementById("street");
const city = document.getElementById("city");
const postalCode = document.getElementById("postal-code");
const btn = document.getElementById("register-btn");

let noErrors = true;

const register = async (event) => {
  event.preventDefault();

  if (checkIfEmpty(username.value)) {
    showErrorMessage(username, "Невалидно потребителско име, полето е празно");
  }
  if (checkIfEmpty(firstName.value)) {
    showErrorMessage(firstName, "Невалидно име, полето е празно");
  }
  if (checkIfEmpty(familyName.value)) {
    showErrorMessage(familyName, "Невалиднa фамилно име, полето е празно");
  }
  if (checkIfEmpty(email.value)) {
    showErrorMessage(email, "Невалиден e-mail, полето е празно");
  }
  if (checkIfEmpty(password.value)) {
    showErrorMessage(password, "Невалиднa парола, полето е празно");
  }
  if (checkIfEmpty(postalCode.value)) {
    showErrorMessage(postalCode, "Невалиден пощенски код, полето е празно");
  }
  if (!checkUsername(username.value)) {
    showErrorMessage(username, "Невалидно потребителско име");
  }
  if (!checkName(firstName.value)) {
    showErrorMessage(firstName, "Невалидно име");
  }
  if (!checkFamilyName(familyName.value)) {
    showErrorMessage(familyName, "Невалидно фамилно име");
  }
  if (!checkEmail(email.value)) {
    showErrorMessage(email, "Невалиден e-mail");
  }
  if (
    !checkLengthOfPassword(password.value) ||
    !checkContentOfPassword(password.value)
  ) {
    showErrorMessage(password, "Невалидна парола");
  }
  if (!checkPostalCode(postalCode.value)) {
    showErrorMessage(postalCode, "Невалиден пощенски код");
  }
  if (noErrors) {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        console.log(data);
        let user = data.find((user) => user.username === username.value);
        if (user) {
          showErrMessage("Потребителското име е заето");
        } else {
          showSuccessMessage("Успешна регистрация");
        }
        username.value = "";
        firstName.value = "";
        familyName.value = "";
        email.value = "";
        password.value = "";
        street.value = "";
        city.value = "";
        postalCode.value = "";
      })
      .catch((error) => console.error(error));
  }
};

btn.addEventListener("click", register);

const showErrorMessage = (element, message) => {
  if (!element.nextElementSibling.classList.contains("error")) {
    element.nextElementSibling.classList.add("error");
    element.nextElementSibling.innerHTML = message;
  }
  noErrors = false;
};

const showSuccessMessage = (message) => {
  const container = document.querySelector("#success");
  container.classList.add("block");
  container.innerHTML = message;
};
const showErrMessage = (message) => {
  const container = document.querySelector("#fail");
  container.classList.add("block");
  container.classList.add("error");
  container.innerHTML = message;
};

const checkIfEmpty = (string) => {
  return string.length === 0;
};

const checkUsername = (string) => {
  return string.length >= 3 && string.length <= 50;
};

const checkName = (string) => {
  return string.length > 0 && string.length <= 50;
};

const checkFamilyName = (string) => {
  return string.length > 0 && string.length <= 50;
};

const checkEmail = (string) => {
  var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
  return string.match(mailFormat) !== null;
};

const checkLengthOfPassword = (string) => {
  return string.length >= 6 && string.length <= 10;
};

const checkContentOfPassword = (string) => {
  return (
    string.match(/[A-Z]/) !== null &&
    string.match(/[a-z]/) !== null &&
    string.match(/[0-9]/) !== null
  );
};

const checkPostalCode = (string) => {
  return (
    string === "" ||
    string.match(/^[0-9]{4}$/g) !== null ||
    string.match(/^[0-9]{5}-[0-9]{4}$/g) !== null
  );
};
