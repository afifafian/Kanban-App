<template>
    <li class="card-item" data-id="1">
        <h3 class="title" >{{fromCardCategoryToList.title}}</h3>
        <div class="text">By: {{fromCardCategoryToList.User.email}}
        </div><br>
        <h6>{{`Last Updated: ${date}-${month}-${year}`}}</h6>
        <div v-if="isEdit">
            <form v-on:submit.prevent="edited(fromCardCategoryToList.id)">
                <input type="text" class="form-control" v-model="title">
                 <select  class="form-control" placeholder="category" v-model="category">
                    <option selected>{{fromCardCategoryToList.category}}</option>
                    <option>Backlog</option>
                    <option>Todo</option>
                    <option>Done</option>
                    <option>Completed</option>
                </select>
                <button type="submit">Update</button>
                <button v-on:click="isEdit=false">Cancel</button>
            </form>
        </div>
        <div class="actions">
            <a href="#" v-on:click="showEdit(fromCardCategoryToList.id)" v-if="editBtn"><i class="fa fa-pencil" aria-hidden="true"> Edit</i></a>
            <a href="#" v-on:click="deleted(fromCardCategoryToList.id)" v-if="deleteBtn"><i class="fa fa-trash-o" aria-hidden="true"> Delete</i></a>
        </div>
    </li>
</template>

<script>
import axios from "axios"

export default {
    name: 'CardList',
    props: ["fromCardCategoryToList"],
    data() {
        return {
            tasks: [],
            title: "",
            category: "",
            editBtn: true,
            deleteBtn: true,
            isEdit: false,
            date: new Date(this.fromCardCategoryToList.updatedAt).getDate() > 9 ? new Date(this.fromCardCategoryToList.updatedAt).getDate(): "0" + String(new Date(this.fromCardCategoryToList.updatedAt).getDate()),
            month: new Date(this.fromCardCategoryToList.updatedAt).getMonth()+1 > 9 ? new Date(this.fromCardCategoryToList.updatedAt).getMonth()+1: "0" + String(new Date(this.fromCardCategoryToList.updatedAt).getMonth()+1),
            year: new Date(this.fromCardCategoryToList.updatedAt).getFullYear(),
        }
    },
    created() {
        console.log(this.fromCardCategoryToList, "lemparan dari category")
    },
    methods: {
        showEdit(id) {
            console.log('masuk?')
            this.editBtn = false
            this.deleteBtn = false
            this.isEdit = true
            axios({
                method: 'GET',
                url: `https://ancient-reef-69810.herokuapp.com/tasks/${id}`,
                headers: {
                    access_token: localStorage.token
                }   
            })
            .then(results => {
                console.log(results)
                this.title = results.data.title
                this.category = results.data.category
            })
            .catch(err => {
                console.log(err)
                this.isEdit = false
                this.editBtn = true
                this.deleteBtn = true
                swal({
                    title: "Warning!",
                    text: `Sorry, you don't have an access for this task..\nPlease contact ${this.fromCardCategoryToList.User.email} for any updated info`,
                    icon: "warning",
                });
            })
        },
        edited(id) {
            axios({
                method: 'PUT',
                url: `https://ancient-reef-69810.herokuapp.com/tasks/${id}`,
                headers: {
                    access_token: localStorage.token
                },
                data: {
                    title: this.title,
                    category: this.category
                }
            })
            .then(results => {
                console.log(results, "Ini dari edited")
                this.$emit("fromEditedCardList")
                
                this.editBtn = true
                this.deleteBtn = true
                this.isEdit = false
                this.title = ""
                this.category = ""
            })
            .catch(err => {
                console.log(err)
                swal({
                    title: "Warning!",
                    text: "Either Title nor Category Can't be left empty!",
                    icon: "warning",
                });
            })
        },
        deleted(id) {
            console.log('masuk?')
            axios({
                method:'DELETE',
                url: `https://ancient-reef-69810.herokuapp.com/tasks/${id}`,
                headers: {
                    access_token: localStorage.token
                }   
            })
            .then(results => {
                console.log(results)
                this.$emit("fromDeletedCardList")
            })
            .catch(err => {
                console.log(err)
                swal({
                    title: "Warning!",
                    text: `Sorry, you don't have an access for this task..\nPlease contact ${this.fromCardCategoryToList.User.email} for any updated info`,
                    icon: "warning",
                });
            })
        },
    }
}
</script>

<style></style>