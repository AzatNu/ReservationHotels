import controlPanelStyle from "./control-panel.module.css";
import mainPageLogo from "../../../../assets/header-Icons/control-panel-Icons/icons8-главная-страница-64.png";
import rservationLogo from "../../../../assets/header-Icons/control-panel-Icons/icons8-бронирование-100.png";
import roomsStatus from "../../../../assets/header-Icons/control-panel-Icons/icons8-здание-с-террасой-на-крыше-100.png";
import createRooms from "../../../../assets/header-Icons/control-panel-Icons/icons8-плюс-24.png";
import login from "../../../../assets/header-Icons/control-panel-Icons/icons8-вход-100.png";
import logout from "../../../../assets/header-Icons/control-panel-Icons/icons8-выход-100.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userloginSelector, userRoleSelector } from "../../../../selectors";
export const ControlPanel = () => {
    const userName = useSelector(userloginSelector);
    const userRole = useSelector(userRoleSelector);
    const dispatch = useDispatch();
    console.log(userRole);
    const onLogout = () => {
        dispatch({ type: "LOGOUT" });
        sessionStorage.removeItem("userData");
    };
    return (
        <div className={controlPanelStyle["controlPanelContainer"]}>
            <h1 title="Вы авторизованы как:">{userName}</h1>
            <Link to="/">
                <button title="Главная">
                    <img src={mainPageLogo} alt="logo" />
                </button>
            </Link>
            <Link to="/reservedRooms">
                <button title="Ваши забронированные номера">
                    <img src={rservationLogo} alt="logo" />
                </button>
            </Link>
            <Link to="/allRoomStatus">
                <button title="Статусы всех номеров">
                    <img src={roomsStatus} alt="logo" />
                </button>
            </Link>
            <Link to="/roomCreate">
                <button title="Создание доступных номеров">
                    <img src={createRooms} alt="logo" />
                </button>
            </Link>
            {userRole === "3" ? (
                <button
                    title="Выход"
                    onClick={() => {
                        onLogout();
                    }}
                >
                    <img src={logout} alt="logo" />
                </button>
            ) : (
                <Link to="/login">
                    <button title="Авторизация">
                        <img src={login} alt="logo" />
                    </button>
                </Link>
            )}
        </div>
    );
};
