import loginRegistartionStyle from "../login-registartion.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../../bff/api/server";
import { authFormSchema } from "../validation-schema";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useStore } from "react-redux";
import { useEffect } from "react";

export const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
        resolver: yupResolver(authFormSchema),
    });
    const [serverError, setServerError] = useState(null);

    const onSubmit = ({ login, password }) => {
        server.authorize(login, password).then(({ error, res }) => {
            if (error) {
                setServerError(`${error}`);
                return;
            }
            dispatch({ type: "SET_USER", payload: res });
            sessionStorage.setItem("userData", JSON.stringify(res));
            navigate("/");
        });
    };
    const formError =
        serverError || errors?.login?.message || errors?.password?.message;
    const store = useStore();
    useEffect(() => {
        let currentWasLogout = store.getState().app.wasLogout;
        return () =>
            store.subscribe(() => {
                let prevWasLogout = currentWasLogout;
                prevWasLogout = store.getState().app.wasLogout;
                if (prevWasLogout !== currentWasLogout) {
                    reset();
                }
            });
    }, [reset, store]);
    return (
        <div className={loginRegistartionStyle["loginRegistartionContainer"]}>
            <h2>Вход</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Логин"
                    {...register("login", {
                        onChange: () => setServerError(null),
                    })}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    {...register("password", {
                        onChange: () => setServerError(null),
                    })}
                />
                {formError && <span>{formError}</span>}
                <p>
                    Нет аккаунта?
                    <br />
                    <Link to="/register">Создать аккаунт</Link>
                </p>
                <button type="submit" disabled={!!formError}>
                    Войти
                </button>
            </form>
        </div>
    );
};
