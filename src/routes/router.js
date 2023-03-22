import { createRouter, createWebHistory } from 'vue-router'
// import { defineAsyncComponent } from 'vue'

import AddTodo from '../pages/AddTodo.vue'
import EditTodo from '../pages/EditTodo.vue'
// import Loading from '../components/UI/Loading.vue'
// import Error from '../components/UI/Error.vue'
import TodosList from '../pages/TodosList.vue'

// const TodosList = defineAsyncComponent({
//   // the loader function
//   loader: () => import('../pages/TodosList.vue'),

//   // A component to use while the async component is loading
//   loadingComponent: Loading,
//   // Delay before showing the loading component. Default: 200ms.
//   delay: 20,

//   // A component to use if the load fails
//   errorComponent: Error,
//   // The error component will be displayed if a timeout is
//   // provided and exceeded. Default: Infinity.
//   timeout: 3000
// })

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: TodosList },
      { path: '/add-todo', component: AddTodo },
      { path: '/edit-todo/:id', component: EditTodo, props:  true },
    ],
    linkActiveClass: 'header-active'
  });

  export default router