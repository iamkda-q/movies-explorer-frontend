import React, { useCallback } from "react";

//хук управления формой
export function useForm() {
    const [values, setValues] = React.useState({});

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return { values, handleChange, setValues };
}

//хук управления формой и валидации формы
export function useFormWithValidation() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = (event) => {
        const target = event.target;
        setValues({ ...values, [target.name]: target.value });
        setErrors({
            ...errors,
            [target.name]: {
                isError: !target.checkValidity(),
                errorText: target.checkValidity() ? errors[target.name]?.errorText : target.validationMessage,
            },
        });
        setIsValid(target.closest("form").checkValidity());
    };

    /*     const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    ); */

    return { values, handleChange, errors, isValid, setValues /* resetForm */ };
}
