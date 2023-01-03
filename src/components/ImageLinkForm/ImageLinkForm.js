import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { ImageUrlSchema } from "../ValidateForm/ValidateForm";
import { Button, FormGroup } from "react-bootstrap";
import "./ImageLinkForm.css";
import ImageInput from "../ImageInput/ImageInput";
import ImageInputDisabled from "../ImageInputDisabled/ImageInputDisabled";

const ImageLinkForm = ({
  handleInputChange,
  handleButtonSubmit,
  inputUrl,
  detectSelected,
  handleButtonReset,
}) => {
  return (
    <Formik
      initialValues={{ imageUrl: "" }}
      validationSchema={ImageUrlSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        inputUrl === ""
          ? handleInputChange(values.imageUrl)
          : handleButtonSubmit(values.imageUrl);
      }}
      onReset={(values, { setSubmitting, resetForm }) => {
        handleInputChange(values.imageUrl);
        handleButtonReset();
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting, handleReset }) => (
        <Form className="form form--wide">
          <div className="form__content">
            <h2>Facial Recognition System</h2>
            <div className="form__inner">
              <FormGroup
                className="form-group--wide form-group--inline"
                controlId="imageurl"
              >
                {inputUrl === "" ? (
                  <ImageInput />
                ) : (
                  <ImageInputDisabled handleReset={handleReset} inputUrl={inputUrl} />
                )}
                <div className="error__wrapper">
                  <ErrorMessage
                    className="error"
                    name="imageUrl"
                    component="span"
                  />
                </div>
              </FormGroup>
              {detectSelected ? (
                <Button
                  className="button--ml button--no-outline"
                  variant="danger"
                  type="reset"
                >
                  Clear
                </Button>
              ) : (
                <Button
                  className="button--ml button--no-outline"
                  variant={inputUrl === "" ? "primary" : "success"}
                  type="submit"
                >
                  {inputUrl === "" ? "Load" : "Detect"}
                </Button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ImageLinkForm;
