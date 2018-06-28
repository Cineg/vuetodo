import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import Todo from '@/components/Todo';
import Login from '@/components/Login';
import NavigationBar from '@/components/NavigationBar';
import Register from '@/components/Register';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Todo',
            component: Todo
        }
    ]
})