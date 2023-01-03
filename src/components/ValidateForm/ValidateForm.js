import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .max(50, "Email must be no more than 50 characters")
    .required("Email required"),
  password: Yup.string()
    .min(10, "Password must contain a minimum of 10 characters")
    .max(50, "Password must contain a maximum of 50 characters")
    .required("Password required")
});

export const RegisterSchema = Yup.object().shape({
  firstname: Yup.string()
    .trim()
    .max(50, "First name must be no more than 50 characters")
    .required("First name required"),
  lastname: Yup.string()
    .trim()
    .max(50, "Last name must be no more than 50 characters")
    .required("Last name required"),
  email: Yup.string()
    .email("Invalid email")
    .max(50, "Email must be no more than 50 characters")
    .required("Email required"),
  password: Yup.string()
    .min(10, "Password must contain a minimum of 10 characters")
    .max(50, "Password must contain a maximum of 50 characters")
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, () => "Password must contain an upper and a lower case letter, a number, and a symbol")
    .required("Password required")
});

export const ImageUrlSchema = Yup.object().shape({
  imageUrl: Yup.string()
    .required("Image URL required"),
});
