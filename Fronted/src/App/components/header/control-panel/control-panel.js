import controlPanelStyle from "./control-panel.module.css";
import mainPageLogo from "../../../../assets/header-Icons/control-panel-Icons/icons8-главная-страница-64.png";
import rservationLogo from "../../../../assets/header-Icons/control-panel-Icons/icons8-бронирование-100.png";
import roomsStatus from "../../../../assets/header-Icons/control-panel-Icons/icons8-здание-с-террасой-на-крыше-100.png";
import createRooms from "../../../../assets/header-Icons/control-panel-Icons/icons8-плюс-24.png";
import login from "../../../../assets/header-Icons/control-panel-Icons/icons8-вход-100.png";
import logout from "../../../../assets/header-Icons/control-panel-Icons/icons8-выход-100.png";
import backNavigation from "../../../../assets/header-Icons/control-panel-Icons/icons8-длинная-стрелка-влево-100.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userloginSelector, userRoleSelector } from "../../../../selectors";
export const ControlPanel = () => {
    const userName = useSelector(userloginSelector);
    const userRole = useSelector(userRoleSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch({ type: "LOGOUT" });
        sessionStorage.removeItem("userData");
    };

    return (
        <div className={controlPanelStyle["controlPanelContainer"]}>
            <h1 title="Вы авторизованы как:">{userName}</h1>
                <button onClick={() => navigate(-1)}>
                    <img title="Назад" src={backNavigation} alt="logo" />
                </button>
            {(userRole === "2" || userRole === "1" || userRole === "0") && (
                <Link to="/hotels">
                    <button title="Доступные номера">
                        <img src={mainPageLogo} alt="logo" />
                    </button>
                </Link>
            )}
            {(userRole === "2" || userRole === "1" || userRole === "0") && (
                <Link to="/reservedRooms">
                    <button title="Ваши забронированные номера">
                        <img src={rservationLogo} alt="logo" />
                    </button>
                </Link>
            )}
            {(userRole === "0" || userRole === "1") && (
                <Link to="/allRoomStatus">
                    <button title="Статусы всех номеров">
                        <img src={roomsStatus} alt="logo" />
                    </button>
                </Link>
            )}
            {(userRole === "1" || userRole === "0") && (
                <Link to="/roomCreate">
                    <button title="Создание доступных номеров">
                        <img src={createRooms} alt="logo" />
                    </button>
                </Link>
            )}
            {userRole !== "3" ? (
                <button
                    title="Выход"
                    onClick={onLogout}
                    style={{ backgroundColor: "red" }}
                >
                    <img src={logout} alt="logo" />
                </button>
            ) : (
                <Link to="/login">
                    <button
                        title="Авторизация"
                        style={{ backgroundColor: "green" }}
                    >
                        <img src={login} alt="logo" />
                    </button>
                </Link>
            )}
        </div>
    );
};
