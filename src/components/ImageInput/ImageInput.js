import React from "react";
import { Field } from "formik";
import { FormControl } from "react-bootstrap";

const ImageInput = ({
  handleInputChange,
  handleButtonSubmit,
  inputUrl,
  detectSelected,
  handleButtonReset
}) => {
  return (
    <div className="input_container form-control">
      <Field name="imageUrl">
        {({ field, meta }) => (
          <FormControl
            {...field}
            className={
              meta.error && meta.touched
                ? "input--error form-control--clear"
                : "form-control--clear"
            }
            type="text"
            placeholder="https://example.com/images/example.jpg"
          />
        )}
      </Field>
    </div>
  );
};

export default ImageInput;
