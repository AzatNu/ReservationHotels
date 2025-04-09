import * as yup from "yup";

export  const registerFormSchema = yup.object().shape({
    login: yup
        .string()
        .required(`Логин обязателен для заполнения`)
        .matches(/^[a-zA-Z0-9]+$/, "Только латинские буквы и цифры")
        .min(3, "Логин должен содержать минимум 3 символа")
        .max(10, "Логин должен содержать максимум 10 символов"),
    password: yup
        .string()
        .required(`Пароль обязателен для заполнения`)
        .matches(/^[a-zA-Z0-9#$%]+$/, "Пароль содержит запрещенные символы")
        .min(6, "Пароль должен содержать минимум 6 символов")
        .max(20, "Пароль должен содержать максимум 20 символов"),
    passwordRepeat: yup
        .string()
        .required(`Повтор пароля обязателен для заполнения`)
        .oneOf([yup.ref("password")], "Пароли не совпадают"),
});
