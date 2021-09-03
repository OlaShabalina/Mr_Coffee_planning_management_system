const createUserForm = document.querySelector('#create-user-form');

// Form elements here
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

createUserForm.addEventListener('submit', (e) => {
  e.preventDefault();

  validate(firstname, isNameValid);
  validate(lastname, isNameValid);
  validate(email, isEmailValid);
  validate(password, isPasswordValid);

  if (validate(firstname, isNameValid) && validate(lastname, isNameValid) && validate(email, isEmailValid) && validate(password, isPasswordValid)) {
    createUserForm.submit();
  }

});



//Function to validate name and surname (text only)

function isNameValid(input) {
    return /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/.test(input);
  }
  
  //Function to validate email
  
  function isEmailValid(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  //Function to validate password

  function isPasswordValid(password) {
      return password.length >= 5 && !password.includes('password');
  }

  // Class change function based on validation

  function validate(input, ValidateFunction) {
    input.classList.remove('btn-success');
    input.classList.remove('btn-danger');
    if (ValidateFunction(input.value) && input.value !== '') {
      input.classList.add('btn-success');
      return true;
    } else {
      input.classList.add('btn-danger');
      return false;
    };
  }