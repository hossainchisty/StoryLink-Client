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
import PageNotFound from "./pages/PageNotFound";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import ForgottenPassword from "./pages/ForgottenPasswordPage";
import VerifiyPage from "./pages/VerifiyPage";
import PendingPage from "./pages/PendingPage";
import VerifyNowPage from "./pages/VerifyNowPage";

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
        
        <Route path={'/verify/:token'} element={
          <VerifiyPage/>
        } />
        
        <Route path={'/verify'} element={
          <PendingPage/>
        } />
          <Route path={'/verification'} element={
                    <VerifyNowPage/>
                  } />

        <Route path={'*'} element={
          <PageNotFound/>
        } />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
