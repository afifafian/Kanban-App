<template>
   <form v-on:submit.prevent="register" class="register-form mt-3">
       <h2>REGISTER</h2>       
       <div class="form-group">
           <label for="exampleInputName1">Name</label>
           <input type="text" class="form-control" id="nameRegister" v-model="name">
           <small id="nameErrRegister" class="form-text" style="color: red;"></small>   
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="emailRegister" aria-describedby="emailHelp" v-model="email">
            <small id="emailHelpRegister" class="form-text text-muted">We'll never share your email with anyone else.</small>
            <small id="emailErrRegister" class="form-text" style="color: red;"></small>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="passwordRegister" v-model="password">
            <small id="passErrRegister" class="form-text" style="color: red;"></small>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button> <br><br>
        <h5>already have an account? <a class="navbar-brand" href="#" v-on:click="showLogin">Click here</a></h5>          
    </form>
</template>

<script>
import axios from "axios"

export default {
    name: 'Register',
    data() {
        return {
            name: "",
            email: "",
            password: ""
        }
    },
    methods: {
        register() {
            axios({
                method: 'POST',
                url: 'https://ancient-reef-69810.herokuapp.com/users/register',
                data: { name: this.name, email: this.email, password: this.password } 
            })
            .then(results => {
                console.log(results)
                this.$emit('fromRegister')
                this.name = ""
                this.email = ""
                this.password = ""
            })
            .catch(err => {
                console.log(err.response.data)
                if (Array.isArray(err.response.data.errors)) {
                    swal({
                        title: "Warning!",
                        text: "All fields is required, Make sure you've filled all of them",
                        icon: "warning",
                    });
                } else {
                    swal({
                        title: "Warning!",
                        text: "Email with the same name is already registered!",
                        icon: "warning",
                    });
                } 
            })
        },
        showLogin() {
            this.$emit('showLogin')
        }
    }
}
</script>

<style></style>