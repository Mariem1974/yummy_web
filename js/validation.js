export class Validation {
  #NAME_REGEX = /^[a-z ,.'-]+$/;

  #EMAIL_REGEX =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

  #PASSWORD_REGEX =
    /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;

  #PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  nameValidation(name) {
    return this.#NAME_REGEX.test(name);
  }

  emailValidation(email) {
    return this.#EMAIL_REGEX.test(email);
  }

  passwordValidation(password) {
    return this.#PASSWORD_REGEX.test(password);
  }

  repasswordValidation(repassword, copy) {
    return repassword === copy;
  }

  phoneValidation(phone) {
    return this.#PHONE_REGEX.test(phone);
  }

  ageValidation(age) {
    return age > 10 && age <= 60;
  }

  allDataValid(name, email, phone, age, password, repassword) {
    return (
      this.nameValidation(name) &&
      this.emailValidation(email) &&
      this.phoneValidation(phone) &&
      this.ageValidation(age) &&
      this.passwordValidation(password) &&
      this.repasswordValidation(repassword, password)
    );
  }
}
