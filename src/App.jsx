import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/loginpage/loginPage';
import HomeRoutes from "./navigation/homeRoutes";
import PageNotFound from "./pages/pagenotfound/pageNotFound";

function App() {

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/home/*' element={<HomeRoutes />} />
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  );
}

export default App;
