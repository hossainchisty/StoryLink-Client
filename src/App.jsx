import "./App.css";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./context/UserContext";
import CreatePostPage from "./pages/CreatePostPage";

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={
          <IndexPage />
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
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
