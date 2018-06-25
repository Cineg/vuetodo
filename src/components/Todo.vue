<template>
    <div class="todo">
        <input type="text" class="todo-input" placeholder="What do I do today?" v-model="newTodo" @keyup.enter="addTodo">
        <div class="todo-list">
            <div class="single-todo" v-for="(todo, deleteID) in filteredTodos" :key="todo.id">
                <div>
                    <div class="check uncheck" @click="uncheck(todo)" v-if="todo.completed">
                    <i class="fas fa-times"></i></div>
                    <div class="check" @click="check(todo)" v-else><i class="fas fa-check"></i></div>
                    <span v-bind:class="{todocompleted: todo.completed}" v-if="!todo.editable" @dblclick="editTodo(todo)" class="todoTitle" 
                    >
                        {{todo.title}}
                    </span> 
                    <input type="text" v-model="todo.title" v-if="todo.editable" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" class="editTitle" v-focus>
                </div>

                <div>
                    <button class="editButton" v-on:click="editTodo(todo)" v-if="!todo.editable">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="editButton editButton-grey" v-on:click="editTodo(todo)" v-else disabled>
                        <i class="fas fa-pencil-alt"></i>
                    </button>

                    <button class="deleteButton" @click="deleteTodo(deleteID)">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
        <button class="filter" v-on:click="showTodosFiltered('all')" :class="{filterActive : this.showTodos=='all'}"><i class="fas fa-filter"></i> <span>All</span></button>
        <button class="filter" v-on:click="showTodosFiltered('active')" :class="{filterActive : this.showTodos=='active'}"><i class="fas fa-filter"></i> <span>To do</span></button>
        <button class="filter" v-on:click="showTodosFiltered('done')" :class="{filterActive : this.showTodos=='done'}"><i class="fas fa-filter"></i>  <span>Done</span></button>
    </div>
   
</template>

<script>
export default {
    name: 'Todo',
    data(){
        return{
            newTodo: '',
            temporaryId: 3, //next unique id
            preventEmptyEdit: '',
            showTodos: 'all',
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
                editable: false,
            })
            this.newTodo = '';
            this.temporaryId +=1; 
        },
        deleteTodo(deleteID){
            this.todos.splice(deleteID, 1);
        },
        check(todo){
            todo.completed = true;
        },
        uncheck(todo){
            todo.completed = false;
        },
        editTodo(todo){
            this.preventEmptyEdit = todo.title;
            todo.editable = true;
        },
        doneEdit(todo){
            if(todo.title.trim().length == 0){
                todo.title = this.preventEmptyEdit;
            }
            todo.editable = false;
            this.preventEmptyEdit = '';
        },
        showTodosFiltered(filter){
            this.showTodos = filter;
        }
    },
    computed: {
       filteredTodos(){
           if(this.showTodos == 'all'){
               return this.todos;
           } else if(this.showTodos == 'active'){
               //return if is not completed
               return this.todos.filter(todo => !todo.completed)
           } else if(this.showTodos == 'done'){
               return this.todos.filter(todo => todo.completed)
           }
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
        padding: 6px;
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
    .todo-input:focus, .editTitle, button{
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
    }
    .editButton{
        margin-right: 5px;
        background: #87cefa;
    }
    .editButton-grey{
        background: lightslategrey;
        cursor: auto;
    }
    /* icons on buttons */
    .fa-trash-alt, .fa-pencil-alt, .fa-check, .fa-times, .fa-filter{
        color: #fff;
    }

    .todocompleted{
        text-decoration: line-through;
        color: #aaa;
        transition: .5s;
    }
    .check{
        cursor: pointer;
        margin-right: 10px;
        background-color: #add8e6;
        width: 20px;
        height: 20px;
        display: inline-flex;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease;
    }
    .uncheck{
        background-color: #ff6347;
    }

    .filter{
        margin-top: 10px;
        margin-left: 10px;
        float: left;
        background-color: #7b68ee;
    }

    .filter span{
        color: #fff;
        margin-left: 3px;
    }

    .filterActive{
        background-color: #66cdaa;
    }

</style>