import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseDetail from "./Pages/CourseDetail/CourseDetail";
import Start from "./Pages/Start/Start";
import Login from "./Pages/Login/Login";
import SignUp2 from "./Pages/SignUp2/SignUp2";
import Main from "./Pages/Main/Main";
import FilterMt from "./Pages/FilterMt/FilterMt";
import FilterRg from "./Pages/FilterRg/FilterRg";
import Hiking from "./Pages/Hiking/Hiking";
import Review from "./Pages/Review/Review";
import Photo from "./Pages/Photo/Photo";
import MyPage from "./Pages/MyPage/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/signup/2" element={<SignUp2 />} />
        <Route path="/main/*" element={<Main />} />
        <Route path="/filtermt/*" element={<FilterMt />} />
        <Route path="/filterrg/*" element={<FilterRg />} />
        <Route path="/coursedetail/*" element={<CourseDetail />} />
        <Route path="/hiking/*" element={<Hiking />} />
        <Route path="/review/*" element={<Review />} />
        <Route path="/photo/*" element={<Photo />} />
        <Route path="/mypage/*" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
