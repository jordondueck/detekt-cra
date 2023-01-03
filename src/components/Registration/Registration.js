import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RegisterSchema } from "../ValidateForm/ValidateForm";
import { Button, FormControl, FormGroup } from "react-bootstrap";
import Logo from "../Logo/Logo";

const Registration = ({ handleRouteChange }) => {
  return (
    <Formik
      initialValues={{ firstname: "", lastname: "", email: "", password: "" }}
      validationSchema={RegisterSchema}
      onSubmit={(values, { setSubmitting }) => {
        fetch("https://detekt-api.onrender.com/register", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password
          })
        })
          .then(response => {
            if (response.status === 200) return response.json();
          })
          .then(data => {
            if (data) {
              handleRouteChange("signin");
            }
          })
          .catch(console.log);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="form form--narrow form--border">
          <Logo />
          <h2 className="title title--medium">Register</h2>
          <FormGroup className="form-group--wide" controlId="firstName">
            <Field name="firstname">
              {({ field, meta }) => (
                <FormControl
                  {...field}
                  className={meta.error && meta.touched ? "input--error" : ""}
                  type="text"
                  placeholder="First name"
                />
              )}
            </Field>
            <ErrorMessage className="error" name="firstname" component="div" />
          </FormGroup>
          <FormGroup className="form-group--wide" controlId="lastName">
            <Field name="lastname">
              {({ field, meta }) => (
                <FormControl
                  {...field}
                  className={meta.error && meta.touched ? "input--error" : ""}
                  type="text"
                  placeholder="Last name"
                />
              )}
            </Field>
            <ErrorMessage className="error" name="lastname" component="div" />
          </FormGroup>
          <FormGroup className="form-group--wide" controlId="email">
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
          <FormGroup className="form-group--wide" controlId="password">
            <Field name="password">
              {({ field, meta }) => (
                <FormControl
                  {...field}
                  className={meta.error && meta.touched ? "input--error" : ""}
                  type="password"
                  placeholder="Password"
                />
              )}
            </Field>
            <ErrorMessage className="error" name="password" component="div" />
          </FormGroup>
          <Button variant="outline-dark" type="submit" disabled={isSubmitting}>
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Registration;
