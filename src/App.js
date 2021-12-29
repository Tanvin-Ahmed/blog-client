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
import { useEffect, useRef } from "react";
import { getAdmin, getUserDataAfterReload } from "./app/actions/userAction";
import PrivateRoute from "./components/Auth/PrivateRoute";
import {
	getBlogsData,
	updateBlogDetailsAfterCommentUpload,
	updateBlogListAfterDelete,
	updateBlogsDataWhenUploadNewBlog,
	updateBlogsWhenUpdateByAdmin,
	updateIfAnyLikeInsert,
} from "./app/actions/blogsActions";
import io from "socket.io-client";
import HotBlogs from "./components/HotBlogs/HotBlogs";
import Favorite from "./components/Favorite/Favorite";
import Popular from "./components/Popular/Popular";

function App() {
	const dispatch = useDispatch();
	const socket = useRef();
	const { allBlogData, blogDetails } = useSelector(state => ({
		allBlogData: state.blogsReducer.allBlogData,
		blogDetails: state.blogsReducer.blogDetails,
	}));

	useEffect(() => {
		const s = io("http://localhost:5000/");
		socket.current = s;

		return () => s.close();
	}, []);

	useEffect(() => {
		const userInfo = JSON.parse(sessionStorage.getItem("blog/user"));
		if (userInfo?.email) {
			dispatch(getAdmin(userInfo?.email));
		}
		dispatch(getBlogsData());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getUserDataAfterReload());
	}, [dispatch]);

	const updateBlogDetails = (obj, isComment) => {
		if (isComment) {
			if (blogDetails?._id && blogDetails?._id === obj._id) {
				const updatedBlogDetails = {
					...blogDetails,
					comments: obj?.comments,
				};
				dispatch(updateBlogDetailsAfterCommentUpload(updatedBlogDetails));
			}
		} else {
			if (blogDetails?._id && blogDetails?._id === obj._id) {
				const updatedBlogDetails = {
					...blogDetails,
					like: obj?.likes,
				};
				dispatch(updateBlogDetailsAfterCommentUpload(updatedBlogDetails));
			}
			dispatch(updateIfAnyLikeInsert(obj._id, allBlogData, obj?.likes));
		}
	};

	useEffect(() => {
		socket.current.on("deleted-blog-id", obj => {
			const newBlogs = allBlogData?.filter(blog => blog._id !== obj._id);
			dispatch(updateBlogListAfterDelete(newBlogs));
		});
		return () => socket.current.off("deleted-blog-id");
	}, [dispatch, allBlogData]);

	useEffect(() => {
		socket.current.on("updated-blog-data", obj => {
			if (allBlogData?.length > 0) {
				dispatch(updateBlogsWhenUpdateByAdmin(allBlogData, obj));
			}
		});
		return () => socket.current.off("updated-blog-data");
	}, [dispatch, allBlogData, blogDetails]);

	useEffect(() => {
		socket.current.on("upload-new-blog", obj => {
			const allBlogs = [...allBlogData, obj];
			dispatch(updateBlogsDataWhenUploadNewBlog(allBlogs));
		});
		return () => socket.current.off("upload-new-blog");
	}, [dispatch, allBlogData]);

	useEffect(() => {
		socket.current.on("find-a-new-comment", obj => {
			updateBlogDetails(obj, true);
		});

		return () => socket.current.off("find-a-new-comment");
	}, []);

	useEffect(() => {
		socket.current.on("find-new-like", obj => {
			updateBlogDetails(obj, false);
		});
		return () => socket.current.off("find-new-like");
	}, []);

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
				<PrivateRoute path="/popular-blogs">
					<Popular />
				</PrivateRoute>
				<PrivateRoute path="/favorite-blogs">
					<Favorite />
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
