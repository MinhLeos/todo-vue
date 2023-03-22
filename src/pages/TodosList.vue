<template>
    <h2>Todos</h2>
    <div class="todo-list">
        <TodoItem v-for="todo in TODOS_LIST" 
            :name="todo.name" 
            :description="todo.description"
            :is-done="todo.isDone"
            :created-at="todo.createdAt"
            :key="todo.id"
            :id="todo.id"
            :length="TODOS_LIST.length"
            @delete="deleteTodoItem"
        ></TodoItem>
    </div>
</template>

<script setup>
    import { defineAsyncComponent } from 'vue'
    import { TODOS_LIST, deleteOneTodo } from '../ultis/store.js'
    import Loading from '../components/UI/Loading.vue'
    import Error from '../components/UI/Error.vue'
    // import TodoItem from '../components/Todo/TodoItem.vue'

    const TodoItem = defineAsyncComponent({
        // the loader function
        loader: () => import('../components/Todo/TodoItem.vue'),

        // A component to use while the async component is loading
        loadingComponent: Loading,
        // Delay before showing the loading component. Default: 200ms.
        delay: 20,

        // A component to use if the load fails
        errorComponent: Error,
        // The error component will be displayed if a timeout is
        // provided and exceeded. Default: Infinity.
        timeout: 3000
    })

    function deleteTodoItem(id) {
        if (TODOS_LIST.length === 1) {
            return
        }
        deleteOneTodo(id)
    }
</script>

<style scoped>
h2 {
    margin-bottom: 1rem;
    text-align: center;
    color: rgb(135, 151, 165);
}
.todo-list {
    max-height: 75vh;
    overflow: auto;
}
.todo-list::-webkit-scrollbar { 
  width: 0 !important;
  display: none; 
}
</style>