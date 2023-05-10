import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app"
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      { blogTitle:"Blog #1", blogCoverPhoto: "stock-1", blogDate: "Mar 1,2023"},
      { blogTitle:"Blog #2", blogCoverPhoto: "stock-2", blogDate: "Mar 3,2023"},
      { blogTitle:"Blog #3", blogCoverPhoto: "stock-3", blogDate: "Mar 4,2023"},
      { blogTitle:"Blog #4", blogCoverPhoto: "stock-4", blogDate: "Mar 5,2023"},
    ],
    blogHTML: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
    profileAdmin: null,
  },
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    updateUser(state, payload){
      state.user = payload;
    },
    setProfileInfo(state, doc){
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
      state.profileAdmin = doc.data().admin;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.charAt(0).toUpperCase() + state.profileLastName.charAt(0).toUpperCase();
    },
    changeFirstName(state, payload){
      state.profileFirstName = payload;
    },
    changeLastName(state, payload){
      state.profileLastName = payload;
    },
    changeUsername(state, payload){
      state.profileUsername = payload;
    },
  },
  actions: {
    async getCurrentUser ({commit}) {
      const database = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResults = await database.get();
      commit("setProfileInfo",dbResults);
      commit("setProfileInitials");
    },
    async updateUserSettings({commit, state}) {
      const dataBase = await db.collection('users').doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastname: state.profileLastName,
        username: state.profileUsername,
      });
      commit("setProfileInitials");
    }
  },
  modules: {},
})
