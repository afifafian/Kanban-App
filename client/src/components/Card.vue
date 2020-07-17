<template>
    <div class="card">

        <CardCategory v-for="(category, index) in categories" :key="index" 
        :fromCardToCategory="category"
        @fromAddedCategory="fetchIt" 
        @fromUpdatedCategory="fetchIt"
        @fromDeletedCategory="fetchIt">
        </CardCategory>
    
    </div>
</template>

<script>
import axios from "axios"
import CardCategory from "./Category"

export default {
    name: 'Card',
    components: {
        CardCategory: CardCategory
    },
    data() {
        return {
            tasks: [],
            categories: [
                {
                    name: 'Backlog',
                    datas: []
                },
                {
                    name: 'Todo',
                    datas: []
                },
                {
                    name: 'Done',
                    datas: []
                },
                {
                    name: 'Completed',
                    datas: []
                }           
            ],
        }
    },
    methods: {
        getTasks() {
            this.categories = [
                {
                    name: 'Backlog',
                    datas: []
                },
                {
                    name: 'Todo',
                    datas: []
                },
                {
                    name: 'Done',
                    datas: []
                },
                {
                    name: 'Completed',
                    datas: []
                }           
            ]
            axios({
                method: 'GET',
                url: 'https://ancient-reef-69810.herokuapp.com/tasks',
                headers: {
                    access_token: localStorage.token
                }   
            })
            .then(results => {
                console.log(results,"ini dari card")
                this.tasks = results.data
                for (let i = 0; i < this.tasks.length; i++) {
                    for (let j = 0; j < this.categories.length; j++) {
                        if (this.tasks[i].category === this.categories[j].name) {
                            this.categories[j].datas.push(this.tasks[i])
                        }
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchIt() {
            this.getTasks()
        },
    },
    created() {
        
        this.getTasks()
    }
}
</script>

<style></style>