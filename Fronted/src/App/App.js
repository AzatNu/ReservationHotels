import { Route, Routes } from "react-router-dom";
import { ReservedRooms, AllRoomStatus, Hotels, CreateRooms, RoomId, Error404, Auth, Registartion, Greeting } from "../Pages";
import { Header, Footer } from "./components";
export const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Greeting />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/register" element={< Registartion />} />
                <Route
                    path="/rooms/:roomId"
                    element={<RoomId />}
                />
                <Route path="/reservedRooms" element={<ReservedRooms />} />
                <Route path="/allRoomStatus" element={<AllRoomStatus />} />
                <Route
                    path="/roomCreate"
                    element={<CreateRooms />}
                />
                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
        </>
    );
};
