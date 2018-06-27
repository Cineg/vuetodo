<template>
    <div class="todo">
        <input type="text" class="todo-input" placeholder="What do I do #today?" v-model="newTodo" @keyup.enter="addTodo" >
        <div class="todo-list">
            <div class="single-todo" v-for="(todo, deleteID) in filteredByTags" :key="todo.id">
                <div class="upper-todo-item">
                    <div>
                        <div class="check uncheck" @click="uncheck(todo)" v-if="todo.completed">
                        <i class="fas fa-times"></i></div>
                        <div class="check" @click="check(todo)" v-else><i class="fas fa-check"></i></div>
                        <span v-bind:class="{todocompleted: todo.completed}" v-if="!todo.editable" @dblclick="editTodo(todo)" class="todoTitle" 
                        >{{todo.title}} </span> 
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
                <div class="lower-todo-item">
                    <div class="tag" v-for="(tag, deleteTagID) in todo.tags" >
                        <span class="tagName" :class="{tagActive: showTodosByTag == tag}" v-on:click="showTodosTagFiltered(tag)"> {{tag}} </span>
                        <div class="deleteIcon" v-on:click="deleteTag(deleteID, deleteTagID)"><i class="fas fa-times"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <button class="filter" v-on:click="showTodosFiltered('all')" :class="{filterActive : this.showTodos=='all'}"><i class="fas fa-filter"></i> <span>All</span></button>
        <button class="filter" v-on:click="showTodosFiltered('active')" :class="{filterActive : this.showTodos=='active'}"><i class="fas fa-filter"></i> <span>To do</span></button>
        <button class="filter" v-on:click="showTodosFiltered('done')" :class="{filterActive : this.showTodos=='done'}"><i class="fas fa-filter"></i>  <span>Done</span></button>
        
        <button class="filter filterTags" v-if="this.showTodosByTag != ''" v-on:click="showTodosTagFiltered('')" :class="{filterActive : this.showTodosByTag != ''}"><i class="fas fa-filter" ></i> <span>{{this.showTodosByTag}}</span></button>
    
    </div>
   
</template>

<script>
import db from './firebaseInit'

export default {
    name: 'Todo',
    data(){
        return{
            newTodo: '',
            preventEmptyEdit: '',
            showTodos: 'all',
            showTodosByTag: '',
            todos: [],
        }
    },
    created(){
        db.collection('todos').orderBy('title').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                'id': doc.id,
                'title': doc.data().title,
                'completed': doc.data().completed,
                'editable': doc.data().editable,
                'tags': doc.data().tags,
                }
                this.todos.push(data);
            })
            
        })
    },
    methods: {
        addTodo(){
            //check if input is empty
            if(this.newTodo.trim().length == 0){
                return
            }

            //regular expresion for tags
            let regexTag = /( #[a-zA-z0-9]*)/gs;
           
            //check tags and split input to tags array
            let tags = this.newTodo.trim().split(regexTag);
            let tagarr = tags.filter(tag => tag.includes("#"));

            let data = {
                //input is linked to newTodo, and delete tags from input
                title: this.newTodo.replace(regexTag, ''),
                completed: false,
                editable: false,
                tags: tagarr,
            }
            //update todos array with new todo
            db.collection('todos').add(data).then(this.todos.push(data));
            
            this.newTodo = ''; 
        },
        deleteTodo(deleteID){
            /* --- Removing from DB, need to add refresh to todolist -- */
            db.collection('todos').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                   if(doc.ref.id == this.todos[deleteID].id){
                       doc.ref.delete();
                   }
                })
            })
        },
        check(todo){
            todo.completed = true;
            //push data to db
            db.collection('todos').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if(doc.ref.id == todo.id){
                        doc.ref.update(todo);
                    }
                })
            })
        },
        uncheck(todo){
            todo.completed = false;
            db.collection('todos').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if(doc.ref.id == todo.id){
                        doc.ref.update(todo);
                    }
                })
            })
        },
        editTodo(todo){
            this.preventEmptyEdit = todo.title;
            todo.editable = true;
        },
        doneEdit(todo){
            if(todo.title.trim().length == 0){
                todo.title = this.preventEmptyEdit;
            }
            // --- TAGS --- //
            let regexTag = /( #[a-zA-z0-9]*)/gs;
            //check tags and split input to tags array
           
            let tags = todo.title.trim().split(regexTag);
            let tagarr = tags.filter(tag => tag.includes("#"));
            
            // --- TAGS --- //

            //remove tags from edited title
            todo.title = todo.title.replace(regexTag, '');
            //this will be replaced in db
            let data = {
                title: todo.title.replace(regexTag, ''),
                tags: todo.tags,
            }
            //add new tags to the array 
            tagarr.forEach(tag => {
              data.tags.push(tag);
            });
            //push data to db
            db.collection('todos').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if(doc.ref.id == todo.id){
                        doc.ref.update(data);
                    }
                })
            })

            //refresh todos
            this.todos.push();

            todo.editable = false;
            this.preventEmptyEdit = '';
        },
        showTodosFiltered(filter){
            this.showTodos = filter;
        },

        showTodosTagFiltered(tagFilter){
            //if tag is selected and clicked again, delete filter
            if(this.showTodosByTag == tagFilter){
                tagFilter = '';
                this.showTodosByTag = tagFilter;
            } else
            this.showTodosByTag = tagFilter;
        },
        deleteTag(deleteID, deleteTagID){             
           //check what is doing what
           //console.log(this.todos[deleteID], deleteID,  this.todos[deleteID].tags[deleteTagID], deleteTagID);

            this.todos[deleteID].tags.splice(deleteTagID, 1);

            db.collection('todos').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if(doc.ref.id == this.todos[deleteID].id){
                        doc.ref.update(this.todos[deleteID]);
                    }
                })
            })
        },
    },
    computed: {
       filteredTodos(){
           if(this.showTodos == 'all'){
               return this.todos;
           } else if(this.showTodos == 'active'){
               //return if is not completed
               return this.todos.filter(todo => !todo.completed)
           } else if(this.showTodos == 'done'){
               //return completed
               return this.todos.filter(todo => todo.completed)
           }
       },
       filteredByTags(){
          //check tag name
          //if tag name is empty return filteredTodos
          if(this.showTodosByTag === ''){
              return this.filteredTodos;
          } else
          //return filteredTodos(if done, active etc) and combine tags to this
          return this.filteredTodos.filter(todo => todo.tags.some(tag => tag === this.showTodosByTag));
       },
       tagList(){
           //get list of tags 
           let list = new Set();
           this.todos.forEach(todo => {
                todo.tags.forEach(tag => {
                    list.add(tag);
               })
           });
            return list;
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
        align-items: center;
        -webkit-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
        -moz-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
        box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
        margin: 10px 0;
        border-radius: 10px;
    }
    .upper-todo-item{
        display: flex;
        justify-content: space-between;
    }
    .lower-todo-item{
        display: flex;
        margin-top: 10px;
    }

    .todoTitle{
        max-width: 350px;
    }

    .editTitle{
        font-size: 18px;
        width: 350px;
        color: #2c3e50;
        border: none;
        padding: 0px;
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

    .filterTags{
        transition: ease-in-out 0.5s;
    }
    .filterTags:hover{
        background-color: #ff6347;
    }

    .tag{
        cursor: pointer;
    }

    .tagName{
        position: relative;
        background-color: #eee;
        padding: 5px 8px;
        border-radius: 10px;
        font-size: 10px;
        color: #aaa;
        max-height: 20px;
    }

    .tagActive{
        background-color: #66cdaa;
        color: white;
        transition: 0.3s;
    }

    .tag:hover .deleteIcon{
        opacity: 1;
    }
    .deleteIcon{
        font-size: 10px;
        justify-content: center;
        position: relative;
        display: inline-flex;
        transition: .3s;
        background-color: #ff6347;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: relative;
        bottom: 8px;
        right: 8px;
        cursor: pointer;
        opacity: 0;
    }

</style>