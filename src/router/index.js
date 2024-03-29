import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import ForgotPassword from "../views/ForgotPassword.vue"
import Profile from "../views/Profile.vue"
import CreatePost from "../views/CreatePost.vue"
import BlogPreview from "../views/BlogPreview.vue"
import ViewBlog from "../views/ViewBlog.vue"
import EditBlog from "../views/EditBlog.vue"
import firebase from "firebase/app"
import "firebase/auth";

Vue.use(VueRouter);


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title:'Ana Sayfa',
      requiresAuth:false,
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title:'Giriş Yap',
      requiresAuth:false,
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title:'Kayıt Ol',
      requiresAuth:false,
    }
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,  
    meta: {
      title:'Şifremi Unuttum',
      requiresAuth:false,
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,  
    meta: {
      title:'Profil',
      requiresAuth:true,
    }
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title:'Bloglar',
      requiresAuth:false,
    }
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title:'Blog Oluştur',
      requiresAuth:true,
    }
  },
  {
    path: "/post-preview",
    name: "BlogPreview",
    component: BlogPreview,
    meta: {
      title:'Blogu Önizle',
      requiresAuth:true,
    }
  },
  {
    path: "/view-blog/:blogID",
    name: "ViewBlog",
    component: ViewBlog,
    meta: {
      title:'Blog Görüntüleme',
      requiresAuth:false,
    },
  },
  {
    path: "/edit-blog/:blogID",
    name: "EditBlog",
    component: EditBlog,
    meta: {
      title:'Blog Düzenleme',
      requiresAuth:true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | DATP Blog ` ;
  next();
});

router.beforeEach(async (to, from, next) => {
  let user = firebase.auth().currentUser;
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      return next();
    }
    return next({ name: "Home" });
  }
  return next();
});

export default router;
