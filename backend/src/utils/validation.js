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

  const validateUserFields = (req) => {
    const allowedUserFields = ['name', 'email', 'password', 'role', 'skills'];
    const isUserFieldsValid = Object.keys(req.body).every((field) => {
        return allowedUserFields.includes(field);
    });
    if (!isUserFieldsValid) {
        throw new Error("Invalid fields in request body");
    }
    if(!validator.isEmail(req.body.email)) {
        throw new Error("Email is invalid!!");
    } else if (!req.body.password) {
        throw new Error("Password is mandatory field");
    } else if (!['ADMIN', 'EMPLOYEE'].includes(req.body.role)) {
        throw new Error("Role must be either ADMIN or EMPLOYEE");
    } else if (req.body.skills && !Array.isArray(req.body.skills)) {
        throw new Error("Skills must be an array of strings");
    }
  }

export { validateAdminFields, validateLoginData, validateUserFields };