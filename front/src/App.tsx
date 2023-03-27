import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseDetail from "./Pages/CourseDetail/CourseDetail";
import Start from "./Pages/Start/Start";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Main from "./Pages/Main/Main";
import FilterMt from "./Pages/FilterMt/FilterMt";
import FilterRg from "./Pages/FilterRg/FilterRg";
import Hiking from "./Pages/Hiking/Hiking";
import Review from "./Pages/Review/Review";
import Photo from "./Pages/Photo/Photo";
import MyPage from "./Pages/MyPage/MyPage";
import NotFound from "./Pages/Exception/NotFound";
import Navbar from "./Common/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/signup/*" element={<SignUp />} />
        <Route path="/main/*" element={<Main />} />
        <Route path="/filtermt/*" element={<FilterMt />} />
        <Route path="/filterrg/*" element={<FilterRg />} />
        <Route path="/coursedetail/*" element={<CourseDetail />} />
        <Route path="/hiking/*" element={<Hiking />} />
        <Route path="/review/*" element={<Review />} />
        <Route path="/photo/*" element={<Photo />} />
        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
