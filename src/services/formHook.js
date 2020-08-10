import { useState, useCallback } from 'react';
export function useForm({ validations, defaultValues = {} }) {
  if (!validations) {
    throw new Error('the option `validations` is required');
  }
  if (typeof validations !== 'object') {
    throw new Error('the option `validations` should be an object');
  }
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [missing, setMissing] = useState([]);

  const validateField = useCallback((name, value) => {
    // get the validation rules for the field
    const rules = validations[name];
    // check if the rules exist, since a field can not have validations
    if (rules) {
      // if the required rule is registered
      if (rules.required) {
        // now we validate the value checking if it has a value
        // we are using trim, to strip whitespaces before and after the value
        if (!value.trim()) {
          return typeof rules.required === 'string' ? rules.required : 'required';
        }
      }
      // if the pattern rule is registered
      if (rules.pattern) {
        // we execute the regex
        if (!new RegExp(rules.pattern.value).exec(value)) {
          // if the value does not match with the regex pattern, we try to return
          // the custom message and fallback to the default message in case
          return rules.pattern.message || 'invalid';
        }
      }
      // if it has a validation function and its type is a function
      if (rules.validate && typeof rules.validate === 'function') {
        // we run the validate function with the field value
        const error = rules.validate(value);
        // if an error message was returned, we return it
        if (error) {
          return error;
        }
      }
    }
    // if there are no erros, we return an empty string
    return '';
  }, [validations])

  const handleChange = useCallback(key => event => {
    const {value} = event.target
    setValues(data => ({
      ...data,
      [key]: value
    }));
    setErrors(state => ({
      ...state,
      [key]: validateField(key, value),
    }));
    if (errors[key] === '') {
      setMissing(data => {
        if (data.length) {
          const index = data.indexOf(key);
          if (index >= 0) {
            return data.slice(0, index).concat(data.slice(index + 1));
          }
        }
        return data;
      });
    }
  }, [errors, validateField])

  const getProps = useCallback(
    (key, isPicker) => {
    if (!key) {
      throw new Error('The field name parameter is required');
    }
    if (key && typeof key !== 'string') {
      throw new Error('The field name should be a string');
    }
    if (isPicker === true) {
      return {
        //label: labels[key],
        selectedValue: values[key],
        onValueChange: handleChange(key),
        error: missing.includes(key),
      };
    } else {
      return {
        value: values[key],
        onChange: handleChange(key),
        error: missing.includes(key)
      }
    }

  },[values, handleChange, missing])

  const checkValidData = useCallback(() => {
    const hasErrors = Object.keys(validations).filter(key => Boolean(validateField(key, values[key])))
    if (hasErrors.length) {
      setMissing([...hasErrors]);
      return false;
    }
    return true;
  }, [values, validations, validateField]);

  return {
    values,
    errors,
    missing,
    validateField,
    handleChange,
    getProps,
    checkValidData
  };
}