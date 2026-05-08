
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/NavBar";
import AllNotifications from "./pages/AllNotification";
import PriorityNotifications from "./pages/PriorityNotification";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<AllNotifications />}
                />

                <Route
                    path="/priority"
                    element={<PriorityNotifications />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;