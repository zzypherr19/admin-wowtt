import MyNavbar from "../components/MyNavbar/MyNavbar";
import SeeAppointmentPage from "../pages/appointmentspage/seeAppointmentPage";
import { Route, Routes, Navigate} from "react-router-dom";
import HomePage from "../pages/homepage/homePage";


import ConfirmPage from "../pages/confirmpage/confirmpage";
import { useAuth } from "../context/AuthContext";
function HomeRoutes() {
  const { authenticated } = useAuth();

  return (
    <>
      {authenticated ? 
        <>
        <MyNavbar />
        <main>
          <Routes>
            <Route index element={<HomePage/> } />
            <Route path='/confirm' element={<ConfirmPage/>} />
            <Route path='/appointments' element={<SeeAppointmentPage />} />
          </Routes>
        </main>
        </> :
        <Navigate to="/"/>
      }
    </>
  )  
}

export default HomeRoutes;