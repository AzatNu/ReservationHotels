import loginRegistartionStyle from "../login-registartion.module.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { authFormSchema } from "../validation-schema";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { request } from "../../../App/utils";
import { ErrorAlert, LoadingSpinner, Warning } from "../../components";
import { userRoleSelector, userloginSelector, isLoadingSelector } from "../../../selectors"
import logout from "../../../assets/header-Icons/control-panel-Icons/icons8-выход-100.png";

export const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userRole = useSelector(userRoleSelector);
    const isLoading = useSelector(isLoadingSelector);
    const userLogin = useSelector(userloginSelector);

    const {
        register,
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

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem("userData"));
        if (storedUser) {
            dispatch({ type: "SET_USER", payload: storedUser });
        }
    }, [dispatch]);

    const onSubmit = ({ login, password }) => {
        dispatch({ type: "SET_IS_LOADING", isLoading: true });
        request("/login", "POST", { login, password }).then(({ error, user }) => {
            if (error) {
                setServerError(`${error}`);
                return;
            }
            dispatch({ type: "SET_USER", payload: user });
            sessionStorage.setItem("userData", JSON.stringify(user));
            navigate("/hotels");
        }).finally(() => {
            dispatch({ type: "SET_IS_LOADING", isLoading: false });
        });
    };
    const formError =
        serverError || errors?.login?.message || errors?.password?.message;
    return (
        <div className={loginRegistartionStyle["loginRegistartionContainer"]}>
            {userRole !== "3" ? (
                <Warning>Вы уже авторизованы как: {userLogin}, желаете выйти или сменить аккаунт?
                    <button style={{ backgroundColor: "red" }} onClick={() => {
                        dispatch({ type: "LOGOUT" });
                        sessionStorage.removeItem("userData");
                    }}> <img title="Выйти" src={logout} alt="logo" /></button>
                </Warning>
            ) : (
                <div>
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
                </div>
            )}
        </div>
    );
};

