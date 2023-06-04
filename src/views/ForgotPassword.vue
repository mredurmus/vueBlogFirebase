<template>
    <div class="reset-password">
      <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
      <Loading v-if="loading" />
      <div class="form-wrap">
        <form class="reset">
          <p class="login-register">
            <router-link class="router-link" :to="{ name: 'Login' }">Giriş</router-link>
            'e geri dön
          </p>
          <h2>Şifremi sıfırla</h2>
          <p>Şifreni mi unuttun? Email'ini girerek sıfırlayabilirsin.</p>
          <div class="inputs">
            <div class="input">
              <input type="text" placeholder="Email" v-model="email" />
              <email class="icon" />
            </div>
          </div>
          <button @click.prevent="resetPassword">Sıfırla</button>
          <div class="angle"></div>
        </form>
        <div class="background"></div>
      </div>
    </div>
  </template>
<script>
import email from "../assets/Icons/envelope-regular.svg";
import Modal from "../components/Modal";  
import Loading from "../components/Loading";
import firebase from "firebase/app"
import "firebase/auth";
export default {
    name: "ForgotPassword",
    data() {
        return {
            email: "",
            modalActive: false,
            modalMessage: "",
            loading: null,
        };
    },
    components: {
        email,
        Modal,
        Loading,
    },
    methods: {
        resetPassword() {
          this.loading = true;
          firebase.auth().sendPasswordResetEmail(this.email).then(() => {
            this.modalMessage = "Şifre sıfırlama bağlantısı, email'inize gönderildi.";
            this.loading = false;
            this.modalActive = true;
          })
          .catch ( (err) => {
            this.modalMessage = err.message;
            this.loading = false;
            this.modalActive = true;
          });
        },
        closeModal() {
            this.modalActive = !this.modalActive;
            this.email = "";
        }
    }
};
</script>
<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>