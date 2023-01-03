import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignInSchema } from "../ValidateForm/ValidateForm";
import { Button, FormControl, FormGroup } from "react-bootstrap";
import Logo from "../Logo/Logo";
import "./SignIn.css";

const SignIn = ({ handleRouteChange, handleSignIn }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = (event) => {
    // event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={SignInSchema}
      onSubmit={(values, { setSubmitting }) => {
        fetch("https://detekt-api.onrender.com/signin", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        })
          .then((response) => response.json())
          .then((user) => {
            if (user.email) {
              handleSignIn(user);
              handleRouteChange("home");
            }
            // setSubmitting(false);
          })
          .catch(console.log);
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting }) => (
        <Form className="form form--narrow form--border">
          <Logo />
          <h2 className="title title--medium">Sign In</h2>
          <FormGroup className="form-group--wide form-group" controlId="email">
            <Field name="email">
              {({ field, meta }) => (
                <FormControl
                  {...field}
                  className={meta.error && meta.touched ? "input--error" : ""}
                  type="email"
                  placeholder="Email address"
                />
              )}
            </Field>
            <ErrorMessage className="error" name="email" component="div" />
          </FormGroup>
          <FormGroup className="form-group--wide form-group" controlId="password">
            <div className="input_container form-control">
              <Field name="password">
                {({ field, meta }) => (
                  <FormControl
                    {...field}
                    className={
                      showPassword && meta.error && meta.touched
                        ? "input--error form-control--clear pr--75"
                        : "form-control--clear pr--75"
                    }
                    type={!showPassword ? "password" : "text"}
                    placeholder="Password"
                  />
                )}
              </Field>
              <i
                className={
                  showPassword
                    ? "far fa-eye input-group-icon"
                    : "far fa-eye-slash input-group-icon"
                }
                onClick={handleTogglePassword}
              ></i>
            </div>
            <ErrorMessage className="error" name="password" component="div" />
          </FormGroup>
          <Button variant="outline-dark" type="submit">
            Sign In
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignIn;
