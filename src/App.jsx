import "./styles/App.css";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./context/UserContext";
import CreatePostPage from "./pages/CreatePostPage";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import ForgottenPassword from "./pages/ForgottenPasswordPage";

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={
          <IndexPage />
        } />

        <Route path={'/me'} element={
          <Profile />
        } />  
        
        
        <Route path={'/forgotten-password'} element={
          <ForgottenPassword/>
        } /> 
        
        <Route path={'/explore'} element={
          <Explore />
        } />
        <Route path={'/login'} element={
          <LoginPage />
        } />
        <Route path={'/register'} element={
          <RegisterPage />
        } />
        <Route path={'/draft'} element={
          <CreatePostPage/>
        } />
        <Route path={'/post/:id'} element={
          <PostPage/>
        } />
        
        <Route path={'/edit/:id'} element={
          <EditPost/>
        } />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
