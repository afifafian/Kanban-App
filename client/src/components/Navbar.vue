<template>
    <div class="navbar app">
      <h2 class="mt-2">Kanban App</h2><nav><button v-on:click="logout">Logout</button></nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        logout() {
            localStorage.clear()
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut()
            .then(function () {
                console.log('User signed out.');
            });  
            this.$emit("fromNavbar")
        }
    }
}
</script>

<style></style>