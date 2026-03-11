import validator from 'validator';

const validateAdminFields = (params) => {
    const allowedAdminFields = ['name', 'email', 'password', 'orgName'];
    const isAdminFieldsValid = Object.keys(params).every((field) => {
        return allowedAdminFields.includes(field);
    });
    return isAdminFieldsValid;
}

const validateLoginData = (req) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and Password are mandatory fields");
    } else if (!validator.isEmail(email)) {
      throw new Error("Email is invalid!!");
    }
  };

export { validateAdminFields, validateLoginData };