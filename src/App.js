import "./App.css";
import Header from "./components/NavBar/Header/Header";
import SideBar from "./components/NavBar/SideBar/SideBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import BlogPage from "./components/BlogPage/BlogPage";
import Auth from "./components/Auth/Auth";
import PostBlog from "./components/Admin/PostBlogs/PostBlog";
import MakeAdmin from "./components/Admin/MakeAdmin/MakeAdmin";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { getAdmin, getUserDataAfterReload } from "./app/actions/userAction";
import PrivateRoute from "./components/Auth/PrivateRoute";
import {
  getBlogsData,
  updateBlogDetailsAfterCommentUpload,
  updateBlogListAfterDelete,
  updateBlogsWhenUpdateByAdmin,
} from "./app/actions/blogsActions";
import io from "socket.io-client";
import HotBlogs from "./components/HotBlogs/HotBlogs";

function App() {
  const dispatch = useDispatch();
  const socket = useRef(io("http://localhost:5000/"));
  const { allBlogData, blogDetails } = useSelector((state) => ({
    allBlogData: state.blogsReducer.allBlogData,
    blogDetails: state.blogsReducer.blogDetails,
  }));

  useMemo(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("blog/user"));
    if (userInfo?.email) {
      dispatch(getAdmin(userInfo?.email));
    }
    dispatch(getBlogsData());
  }, [dispatch]);

  let newCommentBlogId = useRef("");
  useEffect(() => {
    socket.current.on("deleted-blog-id", (obj) => {
      const newBlogs = allBlogData?.filter((blog) => blog._id !== obj._id);
      dispatch(updateBlogListAfterDelete(newBlogs));
    });
    socket.current.on("updated-blog-id", (obj) => {
      dispatch(updateBlogsWhenUpdateByAdmin(obj._id, allBlogData));
    });

    socket.current.on("find-a-new-comment", (obj) => {
      if (newCommentBlogId !== obj._id) {
        // console.log(obj);
        if (blogDetails?._id && blogDetails?._id === obj._id) {
          let updatedComments = blogDetails?.comments;
          console.log(updatedComments);
          if (updatedComments.length > 0) updatedComments?.push(obj);
          else {
            updatedComments = [];
            updatedComments.push(obj);
          }
          const updatedBlogDetails = {
            ...blogDetails,
            comments: updatedComments,
          };
          dispatch(updateBlogDetailsAfterCommentUpload(updatedBlogDetails));
        }
      }
    });
    dispatch(getUserDataAfterReload());
  }, [dispatch, allBlogData, blogDetails]);

  return (
    <Router>
      <Header />
      <SideBar />
      <Switch>
        <Route exact path="/">
          <Home />
          <Footer />
        </Route>
        <PrivateRoute path="/blog/:id">
          <BlogPage socket={socket.current} />
          <Footer />
        </PrivateRoute>
        <Route path="/login">
          <Auth />
        </Route>
        <PrivateRoute path="/HotBlogs">
          <HotBlogs />
        </PrivateRoute>
        <PrivateRoute path="/admin/blog-upload-form">
          <PostBlog />
        </PrivateRoute>
        <PrivateRoute path="/admin/make-admin">
          <MakeAdmin />
        </PrivateRoute>
        <PrivateRoute path="/admin/dashboard">
          <Dashboard socket={socket.current} />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
