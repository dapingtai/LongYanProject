import Vue from 'vue';
import Router from 'vue-router';
import MainPage from "../components/MainPage.vue";

Vue.use(Router);

// // 創建多個好友路由
// let friendCount = 10;
// let friendRoutes = [];
//
// for(var i=0 ; i <= friendCount; i++){
//     let router = {
//         path: '/',
//         name: 'Master',
//         component: MainPage
//     }
//     if (i > 0){
//         router.path = `/share/:000${i}`;
//         router.name = `MainPage${i}`;
//         friendRoutes.push(router);
//     }else {
//         friendRoutes.push(router);
//     }
// }
// console.log(friendRoutes);


// 引入Vue 分頁
export default new Router({
    // routes: friendRoutes
    routes: [
        {
            path: '/:friendId',
            name: 'MainPage',
            component: MainPage
        }
    ]
})
