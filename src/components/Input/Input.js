import React from "react";

import styles from "./Input.module.css";

export default (props) => {
  let inputElement = null;

  const inputElementClasses = [styles.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputElementClasses.push(styles.Invalid);
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = (
      <small className={styles.ValidationError}>{props.invalidMessage}</small>
    );
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputElementClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputElementClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputElementClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((config) => (
            <option value={config.value} key={config.value}>
              {config.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputElementClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};
