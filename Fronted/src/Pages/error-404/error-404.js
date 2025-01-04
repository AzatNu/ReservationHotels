import error404Style from "./error-404.module.css";
import { Warning } from "../components";
export const Error404 = () => {
    return (
        <div className={error404Style["error404Container"]}> <Warning>Ошибка 404. Страница не найдена</Warning>
        </div>
    )
}
