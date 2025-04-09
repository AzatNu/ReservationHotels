import { useSelector, useDispatch } from "react-redux";
import { userRoleSelector, isLoadingSelector, updateUserRoleByIdSuccessSelector, userloginSelector } from "../../selectors";
import allUsersStyles from "./all-users.module.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { getAllUsers, deleteUserById, updateUserRoleById } from "../../requests";
import { getAllUsersSuccessSelector, refreshPageSelector, errorsSelector, deleteUserByIdSuccessSelector } from "../../selectors";
import { Warning, ErrorNotAvailable, LoadingSpinner, PageTitle, Search, ErrorToast, SuccessToast } from "../components";

export const AllUsers = () => {
    const dispatch = useDispatch();
    const userRole = useSelector(userRoleSelector);
    const isLoading = useSelector(isLoadingSelector);
    const errors = useSelector(errorsSelector);
    const allUsers = useSelector(getAllUsersSuccessSelector);
    const refreshPage = useSelector(refreshPageSelector);
    const deleteUserByIdSuccess = useSelector(deleteUserByIdSuccessSelector);
    const updateUserRoleByIdSuccess = useSelector(updateUserRoleByIdSuccessSelector);
    const userlogin = useSelector(userloginSelector);
    const [serchQuery, setSerchQuery] = useState("");

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem("userData"));
        if (storedUser) {
            dispatch({ type: "SET_USER", payload: storedUser });
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [refreshPage]);
    if (errors) {
        ErrorToast(errors);
        dispatch({ type: "SET_ERROR", error: null });
    }
    if (deleteUserByIdSuccess) {
        SuccessToast("Пользователь успешно удален!");
        setTimeout(() => {
            dispatch({ type: "SET_DELETE_USER_BY_ID_SUCCESS", deleteUserByIdSuccess: false });
        }, 2000)
    }
    if (updateUserRoleByIdSuccess) {
        SuccessToast("Роль пользователя успешно изменена!");
        setTimeout(() => {
            dispatch({ type: "SET_UPDATE_USER_ROLE_SUCCESS", updateRoleByIdSuccess: false });
        }, 2000)
    }

    const handleRoleChange = (id, value) => {
        dispatch(updateUserRoleById(id, value))
    }
    return userRole === "0" ? (
        isLoading ? (
            <LoadingSpinner />
        ) : (
            <>
                <div className={allUsersStyles["usersHeader"]}>
                    <PageTitle>Все пользователи</PageTitle>
                    <Search placeholder="Поиск по логину пользователя" value={serchQuery} onChange={(e) => setSerchQuery(e.target.value)} onClickButton={() => setSerchQuery("")} buttonTitle="Сбросить поиск" />
                </div>
                <div className={allUsersStyles["usersTable"]}>
                    {allUsers?.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Логин</th>
                                    <th>Зарегистрирован</th>
                                    <th>Роль</th>
                                    <th>Управление</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers?.filter(user => user?.login?.toLowerCase().includes(serchQuery.toLowerCase())).map((user) => (
                                    <tr key={user?.id}>
                                        <td>{userlogin === user?.login ? <span style={{ color: "green" }}>Вы</span> : user?.login}</td>
                                        <td>{new Date(user?.registration_at).toLocaleString('ru', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                                        <td>
                                            {userlogin === user?.login ? (null) : <select className={allUsersStyles["roleSelect"]} value={user?.role_id} onChange={(e) => handleRoleChange(user?.id, e.target.value)}>
                                                <option value="0">Администратор</option>
                                                <option value="1">Модератор</option>
                                                <option value="2">Пользователь</option>
                                            </select>}
                                        </td>
                                        <td>{userlogin === user?.login ? (null) : <button className={allUsersStyles["deleteButton"]} onClick={() => dispatch(deleteUserById(user.id))} title="Удалить пользователя">X</button>}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <Warning>Пользователи отсутствуют</Warning>
                    )}
                </div>
                <ToastContainer />

            </>
        )
    ) : (
        <ErrorNotAvailable style={{ color: 'red' }} />
    )
}

