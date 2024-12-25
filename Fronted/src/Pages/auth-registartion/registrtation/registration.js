import loginRegistartionStyle from "../login-registartion.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../../bff/api/server";
import { registerFormSchema} from "../validation-schema";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useStore, useSelector } from "react-redux";
import { useEffect } from "react";
import { ErrorAlert, LoadingSpinner } from "../../components";
import { isLoadingSelector } from "../../../selectors";

export const Registartion= () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(isLoadingSelector);


    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
            passwordRepeat: "",
        },
        resolver: yupResolver(registerFormSchema),
    });
    const [serverError, setServerError] = useState(null);

    const onSubmit = ({ login, password }) => {
        dispatch({ type: "SET_IS_LOADING", isLoading: true });
        server.registred(login, password).then(({ error, res }) => {
            if (error) {
                setServerError(`${error}`);
                return;
            }
            dispatch({ type: "SET_USER", payload: res });
            sessionStorage.setItem("userData", JSON.stringify(res));
            navigate("/hotels");
        }).finally(() => {
            dispatch({ type: "SET_IS_LOADING", isLoading: false });
        });
    };
    const formError =
        serverError || errors?.login?.message || errors?.password?.message || errors?.passwordRepeat?.message;
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
            <h2>Регистрация</h2>

                <form onSubmit={handleSubmit(onSubmit)} className={loginRegistartionStyle["loginRegistartionForm"]}>
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
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
                            <input
                                type="password"
                                placeholder="Повторите пароль"
                                {...register("passwordRepeat", {
                                    onChange: () => setServerError(null),
                                })}
                            />
                            <p>
                                {formError && <ErrorAlert>{formError}</ErrorAlert>}
                            </p>
                            <button type="submit" disabled={formError || isLoading}>
                                Зарегистрироваться
                            </button>
                        </>
                    )}
                </form>

        </div>
    );
};
