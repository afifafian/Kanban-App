<template>
    <ol class="kanban">
        <div class="kanban__title">
            <h2>{{fromCardToCategory.name}}</h2>
        </div>

        <!-- START LOOP-->
        <CardList v-for="(task, index) in fromCardToCategory.datas" :key="index"
        :fromCardCategoryToList="task"
        @fromEditedCardList="updated"
        @fromDeletedCardList="deleted">
        </CardList>
        <!-- END LOOP -->
            
        <div v-if="isAdd">
            <form v-on:submit.prevent="added">
                <input type="text" class="form-control" placeholder="title" v-model="title">
                <select  class="form-control" placeholder="category" v-model="category">
                    <option selected>{{fromCardToCategory.name}}</option>
                </select>
                <button type="submit">Add Task</button>
                <button v-on:click="isAdd=false">Cancel</button>
            </form>
        </div>
        <div class="actions">
            <button v-on:click="showAdd" class="addbutt">Add new</button>
        </div>
    </ol>
</template>

<script>
import axios from "axios"
import CardList from "./CardList"

export default {
    name: 'CardCategory',
    props: ["fromCardToCategory"],
    components: {
        CardList: CardList
    },
    data() {
        return {
            title: "",
            category: "",
            isAdd: false
        }
    },
    methods: {
        showAdd() {
            this.isAdd = true
        },
        added() {
            axios({
                method: 'POST',
                url: 'https://ancient-reef-69810.herokuapp.com/tasks',
                headers: {
                    access_token: localStorage.token
                },
                data: {
                    title: this.title,
                    category: this.category
                }
            })
            .then(results => {
                console.log(results, "ini category")
                this.$emit("fromAddedCategory")
                this.isAdd = false
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
        updated() {
            console.log("Ini di Updated")
            this.$emit("fromUpdatedCategory")
        },
        deleted() {
            this.$emit("fromDeletedCategory")
        }
    },
    created() {
        console.log(this.fromCardToCategory, "ini created category")   
    }
}
</script>

<style></style>