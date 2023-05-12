import "./App.css";
import PictagoLandingPage from "./components/landingPage/LandingPage";
import AllPost from "./components/allPost/AllPost";
import PostDetails from "./components/PostDetails/PostDetails";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "./components/navbar/NavBar";
import AddPost from "./components/addPost/AddPost";
import UpdatePost from "./components/update/updatePost";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<PictagoLandingPage />} />
          <Route path="/add" element={<AddPost />}/>
          <Route path="/posts" element={<AllPost />}/>
          <Route path="/post/:ID_post" element={<PostDetails />} />
          <Route path="/update/:ID_post" element={<UpdatePost/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
