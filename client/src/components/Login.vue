<template>
   <form v-on:submit.prevent="login" class="login-form mt-3">
       <h2>LOGIN</h2><br>
       <div class="form-group">
           <label for="exampleInputEmail1">Email address</label>
           <input type="email" class="form-control" id="emailLogin" aria-describedby="emailHelp" v-model="email">
           <small id="emailHelpLogin" class="form-text text-muted">We'll never share your email with anyone else.</small>
           <small id="emailErrLogin" class="form-text" style="color: red;"></small>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="passwordLogin" v-model="password">
            <small id="passErrLogin" class="form-text" style="color: red;"></small>
        </div>
        <button type="submit" class="btn btn-primary mt-2 mb-2">Login</button><br><br>
        <p>Have a Google account?</p><GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin><br><br><br>
        <h5>Back to <a v-on:click="showRegister" class="navbar-brand" href="#">Register?</a></h5>
    </form>
</template>

<script>
import axios from "axios"
import GoogleLogin from "vue-google-login"

export default {
    name: 'Login',
    components: {
        GoogleLogin: GoogleLogin
    },
    data() {
        return {
            email: "",
            password: "",
            tasks: [],
            params: {
                client_id: "814286810680-17gok5otnrclb7s461utupo58c69b4iu.apps.googleusercontent.com"
            },
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        }
    },
    methods: {
        showRegister () {
            this.$emit("showRegister")
        },
        login() {
            axios({
                method: 'POST',
                url: 'https://ancient-reef-69810.herokuapp.com/users/login',
                data: { email: this.email, password: this.password } 
            })
            .then(results => {
                console.log(results)
                this.$emit('fromLogin')
                localStorage.setItem("token", results.data.access_token)
                this.getTasks()
            })
            .catch(err => {
                console.log(err.response)
                if (err.response.status === 404) {
                    swal({
                        title: "Warning!",
                        text: "Email or Password Incorrect",
                        icon: "warning",
                    });
                } else {
                    swal({
                        title: "Warning!",
                        text: "All fields is required, Make sure you've filled all of them",
                        icon: "warning",
                    });
                }
                
            })
        },
        getTasks() {
            axios({
                method: 'get',
                url: 'https://ancient-reef-69810.herokuapp.com/tasks',
                headers: {
                    access_token: localStorage.token
                }   
            })
            .then(results => {
                console.log(results)
                this.tasks = results.data
            })
            .catch(err => {
                console.log(err)
            })
        },
        onSuccess(googleUser) {
            console.log(googleUser);
            let id_token = googleUser.getAuthResponse().id_token
            // var profile = googleUser.getBasicProfile();
            // console.log(id_token)
            
            axios({
                method: "POST",
                url: "https://ancient-reef-69810.herokuapp.com/users/googleSignIn",
                data: {id_token}
            })
            .then(results => {
                console.log(results)
                this.$emit('fromGoogle')
                localStorage.setItem("token", results.data.access_token)
                this.getTasks()
            })
            .catch(err => {
                console.log(err.response)
            })

            // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile());
        },
        onFailure() {
            swal({
                title: "Warning!",
                text: "Email or Password Incorrect",
                icon: "warning",
            });
        }
    }
}
</script>

<style></style>