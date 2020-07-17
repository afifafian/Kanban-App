<template>
    <div class="container">
        
        <!-- Halaman Register & Login -->
        <div class="row" v-if="!isLoggedIn">
            <div class="col-4 mt-4">
              <Register v-if="isRegister" @fromRegister="successRegister" @showLogin="toLogin"></Register>
              <Login v-if="isLogin" @fromLogin="successLogin" @showRegister="toRegister" @fromGoogle="goOAuth"></Login>
            </div>
        </div>

        <!-- Halaman Utama Setelah Login -->
        <div v-else>
            <Navbar @fromNavbar="successLogout"></Navbar>
            <Card></Card>
        </div>
    
    </div>
</template>

<script>

import Register from "./components/Register"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Card from "./components/Card"

export default {
    name: 'App',
    components: {
        Register: Register,
        Login: Login,
        Navbar: Navbar,
        Card: Card,
    },
    data() {
        return {
            isRegister: true, 
            isLogin: false,
            isLoggedIn: false,
            tasks: []
        }
    },
    methods: {
        successRegister() {
            this.isRegister = false
            this.isLogin = true
        },
        toLogin() {
            this.isRegister = false
            this.isLogin = true
        },
        toRegister() {
            this.isRegister = true
            this.isLogin = false
        },
        successLogin() {
            this.isLoggedIn = true
        },
        goOAuth() {
            this.isLoggedIn = true
        },
        successLogout() {
            this.isLoggedIn = false
            this.isLogin = false
            this.isRegister = true
        }
    },
    created() {
        if(localStorage.token) {
            this.isLoggedIn = true
        }
    }

}
</script>

<style></style>