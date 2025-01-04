import createRoomsStyle from "./create-rooms.module.css"
import { Warning, LoadingSpinner, PageTitle, ErrorToast, SuccessToast } from "../components"
import { userRoleSelector, isLoadingSelector, postRoomSuccessSelector, errorsSelector } from "../../selectors"
import { useSelector, useDispatch } from "react-redux"
import { ToastContainer } from 'react-toastify';
import { useState } from "react";
import { postRoom } from "../../requests";
;
export const CreateRooms = () => {
    const dispatch = useDispatch();
    const errors = useSelector(errorsSelector);
    const postRoomSuccess = useSelector(postRoomSuccessSelector);
    const userRole = useSelector(userRoleSelector);
    const isLoading = useSelector(isLoadingSelector);
    const [roomName, setRoomName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [hotelName, setHotelName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrls, setImageUrls] = useState([""]);
    if (postRoomSuccess) {
        SuccessToast("Номер успешно добавлен!");
        dispatch({ type: "SET_POST_ROOM_SUCCESS", postRoomSuccess: false });
        setRoomName("");
        setPrice("");
        setType("");
        setHotelName("");
        setImageUrl("");
        setDescription("");
        setImageUrls([""]);
        return
    }
    if(errors) {
        ErrorToast(errors);
        dispatch({ type: "SET_ERROR", error: null });
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (description.length < 300) {
            return;
        } else if (imageUrls.some(url => !/^(ftp|http|https):\/\/[^ "]+$/.test(url))) {
            ErrorToast("Некорректная ссылка на фотографию");
            return
        }
        dispatch(postRoom(hotelName, roomName, type, price, description, imageUrls));
    };

    const handleImageUrlChange = (index, value) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value;
        setImageUrls(newImageUrls);
    };

    const addImageUrl = () => {
        setImageUrls([...imageUrls, ""]);
    };

    return (
        <>
            {userRole === "0" ? (
                isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <div className={createRoomsStyle["createRoomsHeader"]}>
                            <PageTitle>Создание номеров</PageTitle>
                        </div>
                        <div className={createRoomsStyle["createRoomsContainer"]}>
                            <form onSubmit={handleSubmit}>
                                <input type="number" placeholder="Название номера" name="room_name" onChange={(e) => setRoomName(e.target.value)} value={roomName} required />
                                <input type="number" placeholder="Цена за сутки" name="price" required onChange={(e) => setPrice(e.target.value)} value={price} />
                                <select name="type" required onChange={(e) => setType(e.target.value)} value={type}>
                                    <option value="" hidden>Выберите тип номера</option>
                                    <option value="одиночный">Одноместный</option>
                                    <option value="двойной">Двухместный</option>
                                    <option value="тройной">Трёхместный</option>
                                </select>
                                <select name="hotel_name" required onChange={(e) => setHotelName(e.target.value)} value={hotelName}>
                                    <option value="" hidden>Выберите отель к которому прикрепить комнату</option>
                                    <option value="Европа">Европа</option>
                                    <option value="Бристоль">Бристоль</option>
                                </select>
                                {imageUrls.map((imageUrl, index) => (
                                    <div className={createRoomsStyle["createRoomsImageContainer"]} key={index}>
                                        <input type="text" placeholder="Ссылки на фотографии" name="image_url" onChange={e => handleImageUrlChange(index, e.target.value)} value={imageUrl} required />
                                    </div>
                                ))}
                                <div className={createRoomsStyle["createRoomsImageButtonsContainer"]}> <button type="button" onClick={addImageUrl} title="Добавить ещё одну фотографию">+</button>
                                    <button type="button" onClick={() => setImageUrls(imageUrls.slice(0, imageUrls.length - 1))} title="Удалить последнюю фотографию">-</button></div>
                                <textarea type="text" placeholder="Описание" name="description" required onChange={(e) => setDescription(e.target.value)} value={description} minLength={300} />
                                <button type="submit">Создать</button>
                            </form>
                        </div>
                        <ToastContainer />
                    </>
                )
            ) : (
                <Warning>Ошибка 403. Доступ к данной странице есть только у администратора</Warning>
            )}
        </>
    )
}

