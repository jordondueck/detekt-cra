import React from "react";
import { Field } from "formik";
import { FormControl } from "react-bootstrap";

const ImageInputDisabled = ({
  handleInputChange,
  handleButtonSubmit,
  inputUrl,
  detectSelected,
  handleButtonReset,
  handleReset
}) => {
  return (
    <div className="input_container input_container--grey form-control">
      <Field name="imageUrl input_input">
        {({ field, meta }) => (
          <FormControl
            {...field}
            className={
              meta.error && meta.touched
                ? "input--error form-control--clear pr--75"
                : "form-control--clear pr--75"
            }
            type="text"
            // placeholder="https://example.com/images/example.jpg"
            value={inputUrl}
            readOnly
          />
        )}
      </Field>
      <i
        className="fa fa-undo button--undo"
        aria-hidden="true"
        onClick={handleReset}
      ></i>
    </div>
  );
};

export default ImageInputDisabled;
