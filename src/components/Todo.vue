<template>
    <div class="todo">
        <input type="text" class="todo-input" placeholder="What do I do today?" v-model="newTodo" @keyup.enter="addTodo">
        <div class="todo-list">
            <div class="single-todo" v-for="(todo, deleteID) in todos" :key="todo.id">
                <div>
                    <input type="checkbox" v-model="todo.completed">
                    <span v-bind:class="{todocompleted: todo.completed}" v-if="!todo.editable" @dblclick="editTodo(todo)" 
                    >
                        {{todo.title}}
                    </span> 
                    <input type="text" v-model="todo.title" v-if="todo.editable" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" class="editTitle" v-focus>
                </div>

                <div>
                    <button class="editButton" v-on:click="editTodo(todo)" v-if="!todo.editable">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="editButton" v-on:click="doneEdit(todo)" v-if="todo.editable">
                        <i class="fas fa-check"></i>
                    </button>

                    <button class="deleteButton" @click="deleteTodo(deleteID)">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
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
                    'editable': false,
                },
                {
                    'id': 2,
                    'title': 'Find a job',
                    'completed': false,
                    'editable': false,
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
        deleteTodo(deleteID){
            this.todos.splice(deleteID, 1);
        },
        editTodo(todo){
            todo.editable = true;
        },
        doneEdit(todo){
            todo.editable = false;
        }
    },
    directives: {
        focus: {
            inserted: function(el){
                el.focus();
            }
        }
    },
}

</script>

<style>
    * {
        box-sizing: border-box;
    }
    button{
        min-width: 60px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .todo{
        width: 600px;
        margin: 0 auto;
    }
    .todo-input{
        width: 100%;
        padding: 20px;
        border-radius: 10px;
        border: none;
        font-size: 24px;
        margin-bottom: 15px;
        -webkit-box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.2);
        -moz-box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.2);
        box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.2);
    }

    /* focus after click */
    .todo-input:focus, .deleteButton, .editButton, .editTitle{
        outline: 0;
    }

    .single-todo{
        width: 100%;
        text-align: left;
        padding: 15px;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        -webkit-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
        -moz-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
        box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
        margin: 10px 0;
        border-radius: 10px;
    }

    .editTitle{
        font-size: 18px;
        color: #2c3e50;
        border: none;
        padding: 0px 5px;
    }

    .deleteButton{
        margin-right: 20px;
        background: #ff6347;
        padding: 6px;
    }
    .editButton{
        margin-right: 5px;
        padding: 6px;
        background: #87cefa;
    }
    /* icons on buttons */
    .fa-trash-alt, .fa-pencil-alt, .fa-check{
        color: #fff;
    }

    .todocompleted{
        text-decoration: line-through;
        color: #aaa;
        transition: .5s;
    }
    

</style>