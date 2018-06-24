<template>
    <div class="todo">
        <input type="text" class="todo-input" placeholder="What do I do today?" v-model="newTodo" @keyup.enter="addTodo">
        <div class="todo-list">
            <div class="single-todo" v-for="todo in todos" :key="todo.id">
                {{todo.title}} 
                <button class="deleteButton" @click="deleteTodo(id)">Delete</button>
            </div>
        </div>
    </div>
   
</template>

<script>
export default {
    name: 'Todo',
    data(){
        return{
            newTodo: '',
            temporaryId: 3, //next unique id
            todos: [
                {
                    'id': 1,
                    'title': 'Take over the world',
                    'completed': false,
                },
                {
                    'id': 2,
                    'title': 'Find a job',
                    'completed': false,
                },
            ]
        }
    },
    methods: {
        addTodo(){
            //check if input is empty
            if(this.newTodo.trim().length == 0){
                return
            }
            //adding todo from input
            this.todos.push({
                id: this.temporaryId,
                //input is linked to newTodo 
                title: this.newTodo,
                completed: false,
            })
            this.newTodo = '';
            this.temporaryId +=1; 
        },
        deleteTodo(id){
            this.todos.splice(id, 1);
        }
    }
}
</script>

<style>
    * {
        box-sizing: border-box;
    }
    button{
        min-width: 60px;
        border-radius: 5px;
        cursor: pointer;
    }
    .todo{
        width: 600px;
        margin: 0 auto;
    }
    .todo-input{
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #999;
        font-size: 24px;
        margin-bottom: 15px;
    }
    .todo-input:focus, .deleteButton{
        outline: 0;
    }

    .single-todo{
        width: 100%;
        text-align: left;
        padding: 10px;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
    }
    .deleteButton{
        background: lightcoral;
        border: none;
        padding: 6px;
    }
    
</style>