import headerStyle from "./header.module.css";
import headerLogo from "../../../assets/header-Icons/icons8-quill-pen-96.png"
import { ControlPanel } from "./control-panel/control-panel";
export const Header = () => {
    return (
        <>
            <div className={headerStyle["headerContainer"]}>
                <div className={headerStyle["headerLogoTitleContainer"]}>
                    <img
                        src={headerLogo}
                        className={headerStyle["headerLogo"]}
                        alt="logo"
                    />
                    <h2>EasyReservation</h2>
                </div>
                <ControlPanel />
            </div>

        </>
    );
};
