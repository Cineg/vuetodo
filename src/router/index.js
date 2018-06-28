import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import Todo from '@/components/Todo';
import Login from '@/components/Login';
import Register from '@/components/Register';

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'Todo',
            component: Todo,
            meta:{
                requiresAuth: true,
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta:{
                requiresGuest: true,
            }
        },
        {
            path: '/register',
            name: '/register',
            component: Register,
            meta:{
                requiresGuest: true,
            }
        }
    ]
});

//Nav guards

router.beforeEach((to, from, next) => {
    //if requiredAuth
    if(to.matched.some(record => record.meta.requiresAuth)) {
        //if not logged
        if(!firebase.auth().currentUser){
            next({
                //redirect to login
                path: '/login',
                query: {
                    redirect: to.fullPath,
                }
            });
        } else {
            next();
        }
    } else if(to.matched.some(record => record.meta.requiresGuest)){
        //if logged in
        if(firebase.auth().currentUser){
            //redirect to todo
            next({
                path: '/',
                query: {
                    redirect: to.fullPath,
                }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;