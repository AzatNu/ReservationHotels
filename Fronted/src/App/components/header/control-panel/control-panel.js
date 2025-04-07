import controlPanelStyle from "./control-panel.module.css";
import mainPageLogo from "../../../../assets/header-Icons/control-panel-Icons/icons8-главная-страница-64.png";
import rservationLogo from "../../../../assets/header-Icons/control-panel-Icons/icons8-бронирование-100.png";
import roomsStatus from "../../../../assets/header-Icons/control-panel-Icons/icons8-здание-с-террасой-на-крыше-100.png";
import createRooms from "../../../../assets/header-Icons/control-panel-Icons/icons8-плюс-24.png";
import login from "../../../../assets/header-Icons/control-panel-Icons/icons8-вход-100.png";
import logout from "../../../../assets/header-Icons/control-panel-Icons/icons8-выход-100.png";
import allUsers from "../../../../assets/header-Icons/control-panel-Icons/icons8-очередь-64.png";
import backNavigation from "../../../../assets/header-Icons/control-panel-Icons/icons8-длинная-стрелка-влево-100.png";
import menuButton from "../../../../assets/header-Icons/control-panel-Icons/icons8-меню-100.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userloginSelector, userRoleSelector, isLoadingSelector } from "../../../../selectors";

export const ControlPanel = () => {
    const userName = useSelector(userloginSelector);
    const userRole = useSelector(userRoleSelector);
    const isLoading = useSelector(isLoadingSelector);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch({ type: "LOGOUT" });
        sessionStorage.removeItem("userData");
    };
    useEffect(() => {
        const closeMenuOnClickOutside = (event) => {
            const menu = document.querySelector(`.${controlPanelStyle["controlPanelContainer"]}`);
            if (!menu.contains(event.target)) setIsMenuOpen(false);
        };
        document.addEventListener("click", closeMenuOnClickOutside);
        return () => {
            document.removeEventListener("click", closeMenuOnClickOutside);
        };
    }, [isMenuOpen]);
    return (
        <div className={controlPanelStyle["controlPanelContainer"]}>
            <h1 title="Вы авторизованы как:">{userRole !== "3" ? userName : "Гость"}</h1>
            <button onClick={() => navigate(-1)} disabled={isLoading}>
                <img title="Назад" src={backNavigation} alt="logo" />
            </button>
            {window.innerWidth < 768 ? (
                <>
                    <button className={controlPanelStyle["menuButton"]} onClick={() => { setIsMenuOpen(!isMenuOpen) }}>
                        <img src={menuButton} alt="logo" />
                    </button>
                    {isMenuOpen && (
                        <div className={controlPanelStyle["verticalToggleMenuAppear"]}>
                            {userRole === "0" && (
                                <Link to="/allUsers">
                                    <button title="Все пользователи" disabled={isLoading}>
                                        <img src={allUsers} alt="logo" />
                                    </button>
                                </Link>
                            )}
                            {(userRole === "2" || userRole === "1" || userRole === "0") && (
                                <Link to="/hotels">
                                    <button title="Доступные номера и отели " disabled={isLoading}>
                                        <img src={mainPageLogo} alt="logo" />
                                    </button>
                                </Link>
                            )}
                            {(userRole === "2" || userRole === "1" || userRole === "0") && (
                                <Link to="/reservedRooms">
                                    <button title="Ваши забронированные номера" disabled={isLoading}>
                                        <img src={rservationLogo} alt="logo" />
                                    </button>
                                </Link>
                            )}
                            {(userRole === "0" || userRole === "1") && (
                                <Link to="/allRoomStatus">
                                    <button title="Статусы всех номеров" disabled={isLoading}>
                                        <img src={roomsStatus} alt="logo" />
                                    </button>
                                </Link>
                            )}
                            {(userRole === "1" || userRole === "0") && (
                                <Link to="/roomCreate">
                                    <button title="Создание доступных номеров" disabled={isLoading}>
                                        <img src={createRooms} alt="logo" />
                                    </button>
                                </Link>
                            )}
                            {userRole !== "3" ? (
                                <button
                                    title="Выход"
                                    onClick={onLogout}
                                    style={{ backgroundColor: "red" }}
                                    disabled={isLoading}
                                >
                                    <img src={logout} alt="logo" />
                                </button>
                            ) : (
                                <Link to="/login">
                                    <button
                                        title="Авторизация"
                                        style={{ backgroundColor: "green" }}
                                        disabled={isLoading}
                                    >
                                        <img src={login} alt="logo" />
                                    </button>
                                </Link>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <>
                    {userRole === "0" && (
                        <Link to="/allUsers">
                            <button title="Все пользователи" disabled={isLoading}>
                                <img src={allUsers} alt="logo" />
                            </button>
                        </Link>
                    )}
                    {(userRole === "2" || userRole === "1" || userRole === "0") && (
                        <Link to="/hotels">
                            <button title="Доступные номера и отели " disabled={isLoading}>
                                <img src={mainPageLogo} alt="logo" />
                            </button>
                        </Link>
                    )}
                    {(userRole === "2" || userRole === "1" || userRole === "0") && (
                        <Link to="/reservedRooms">
                            <button title="Ваши забронированные номера" disabled={isLoading}>
                                <img src={rservationLogo} alt="logo" />
                            </button>
                        </Link>
                    )}
                    {(userRole === "0" || userRole === "1") && (
                        <Link to="/allRoomStatus">
                            <button title="Статусы всех номеров" disabled={isLoading}>
                                <img src={roomsStatus} alt="logo" />
                            </button>
                        </Link>
                    )}
                    {(userRole === "1" || userRole === "0") && (
                        <Link to="/roomCreate">
                            <button title="Создание доступных номеров" disabled={isLoading}>
                                <img src={createRooms} alt="logo" />
                            </button>
                        </Link>
                    )}
                    {userRole !== "3" ? (
                        <button
                            title="Выход"
                            onClick={onLogout}
                            style={{ backgroundColor: "red" }}
                            disabled={isLoading}
                        >
                            <img src={logout} alt="logo" />
                        </button>
                    ) : (
                        <Link to="/login">
                            <button
                                title="Авторизация"
                                style={{ backgroundColor: "green" }}
                                disabled={isLoading}
                            >
                                <img src={login} alt="logo" />
                            </button>
                        </Link>
                    )}
                </>
            )}
        </div>
    );
};

