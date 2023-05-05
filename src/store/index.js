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
    editPost: null,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
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
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.charAt(0).toUpperCase() + state.profileLastName.charAt(0).toUpperCase();
    },
  },
  actions: {
    async getCurrentUser ({commit}) {
      const database = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResults = await database.get();
      commit("setProfileInfo",dbResults);
      commit("setProfileInitials");
    },
  },
  modules: {},
})
