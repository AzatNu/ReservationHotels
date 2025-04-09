import footerStyle from "./footer.module.css";
import mailLogo from "../../../assets/footer-icons/icons8-почта-100.png";
import phoneLogo from "../../../assets/footer-icons/icons8-телефон-100.png";
import whatsAppLogo from "../../../assets/footer-icons/icons8-whatsapp-100.png";
import telegramLogo from "../../../assets/footer-icons/icons8-телеграмма-100.png";
import instagramLogo from "../../../assets/footer-icons/icons8-instagram-100.png";
import { FooterMedia } from "./footer-media";
import { useEffect, useState } from "react";

export const Footer = () => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const closeMediaFooterOnClickOutside = (event) => {
            const mediaFooter = document.querySelector(`.${footerStyle["footerMediaContacts"]}`);
            const button = document.querySelector(`.${footerStyle["footerContactsButton"]}`);
            if (mediaFooter && !mediaFooter.contains(event.target) && !button.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener("click", closeMediaFooterOnClickOutside);
        return () => {
            document.removeEventListener("click", closeMediaFooterOnClickOutside);
        }
    }, [isOpen]);
    return (
        <div className={footerStyle["footerContainer"]}>
            {window.innerWidth < 768 ? (
                <>
                    {isOpen && <FooterMedia />}
                    <button className={footerStyle["footerContactsButton"]} onClick={() => setIsOpen(!isOpen)}>Обратная связь</button>
                </>
            ) : (
                <>
                    <div className={footerStyle["footerContactsContainer"]}>
                        <h2>Обратная связь:</h2>
                        <div className={footerStyle["footerContacts"]}>
                            <p>
                                <img src={mailLogo} alt="logo" />
                                <br />
                                easyreservation@fakemail.com
                            </p>
                            <p>
                                <img src={phoneLogo} alt="logo" />
                                <br />
                                +7 (999) 999-99-99
                            </p>
                            <p>
                                <img src={whatsAppLogo} alt="logo" />
                                <br />
                                +7 (999) 999-99-99
                            </p>
                            <p>
                                <img src={telegramLogo} alt="logo" />
                                <br />
                                @easyreservation
                            </p>
                            <p>
                                <img src={instagramLogo} alt="logo" />
                                <br />
                                @easyreservation
                            </p>
                        </div>
                    </div>
                    <div className={footerStyle["footerCopyright"]}>
                        <p> EasyReservation 2024. Все права защищены © </p>
                    </div>
                </>
            )}
        </div>
    );
};
