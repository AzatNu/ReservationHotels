import loginRegistartionStyle from "../login-registartion.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../../bff/api/server";
import { authFormSchema } from "../validation-schema";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useStore,useSelector } from "react-redux";
import { useEffect } from "react";
import { ErrorAlert,  Warning, LoadingSpinner } from "../../components";
import {userRoleSelector, userloginSelector, isLoadingSelector} from "../../../selectors"
import logout from "../../../assets/header-Icons/control-panel-Icons/icons8-выход-100.png";

export const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userRole = useSelector(userRoleSelector);
    const isLoading = useSelector(isLoadingSelector);
    const userLogin = useSelector(userloginSelector);

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
        dispatch({ type: "SET_IS_LOADING", isLoading: true });
        server.authorize(login, password).then(({ error, res }) => {
            if (error) {
                setServerError(`${error}`);
                return;
            }
            dispatch({ type: "SET_USER", payload: res });
            sessionStorage.setItem("userData", JSON.stringify(res));
            dispatch({type: "SET_NEW_BALANCE", newBalance: res.balance});
            navigate("/hotels");
        }).finally(() => {
            dispatch({ type: "SET_IS_LOADING", isLoading: false });

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
            {userRole !== "3" ? (
                <Warning>Вы уже авторизованы как: {userLogin}, желаете выйти или сменить аккаунт?
                    <button style={{backgroundColor: "red"}} onClick={() => {
                        dispatch({ type: "LOGOUT" });
                        sessionStorage.removeItem("userData");
                    }}> <img title="Выйти" src={logout} alt="logo" /></button>
                </Warning>
            ) : (
                <>
                    <h2>Вход</h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={loginRegistartionStyle["loginRegistartionForm"]}
                    >
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
                                {formError && <ErrorAlert>{formError}</ErrorAlert>}
                                <p>
                                    Нет аккаунта?
                                    <br />
                                    <Link to="/register">Создать аккаунт</Link>
                                </p>
                                <button
                                    type="submit"
                                    style={{ display: formError ? "none" : "block" }}
                                    disabled={formError || isLoading}
                                >
                                    Войти
                                </button>
                            </>
                        )}
                    </form>
                </>
            )}
        </div>
    );
};
