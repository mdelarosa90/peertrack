import {useCallback, useState, useMemo} from 'react';

export const useForm = ({defaultValue = {}, labels = {}, required = []}) => {
  const [dataForm, setDataForm] = useState(defaultValue);
  const [missing, setMissing] = useState([]);
  const allRequired = useMemo(() => required[0] === '*', [required]);

  const handleChange = useCallback(
    key => event => {
      const {value} = event.target
      setDataForm(data => ({
        ...data,
        [key]: value
      }));
      if (allRequired || required.includes(key)) {
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
    },
    [allRequired, required],
  );

  const getProps = useCallback(
    (key, isPicker) => {
      if (isPicker === true) {
        return {
          label: labels[key],
          selectedValue: dataForm[key],
          onValueChange: handleChange(key),
          error: missing.includes(key),
        };
      } else {
        return {
          value: dataForm[key],
          onChange: handleChange(key),
          error: missing.includes(key),
        };
      }
    },
    [dataForm, labels, missing, handleChange],
  );

  const checkValidData = useCallback(() => {
    const _missing = allRequired
      ? Object.keys(dataForm).filter(key => !dataForm[key])
      : required.filter(key => !dataForm[key]);
    if (_missing.length) {
      setMissing(_missing);
      return false;
    }
    return true;
  }, [dataForm, allRequired, required]);

  const addMissing = useCallback(fieldName => {
    setMissing(m => {
      if (m.includes(fieldName)) {
        return m;
      } else {
        return [...m, fieldName];
      }
    });
  }, []);

  return {
    dataForm,
    _setDataForm: setDataForm,
    handleChange,
    getProps,
    checkValidData,
    addMissing,
  };
};
