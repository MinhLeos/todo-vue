<template>
    <h2>Todos</h2>
    <Suspense>
        <template #default>
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
        <template #fallback>
            <div class="loading">Loading 1 2 3 ...</div>
        </template>
    </Suspense>
</template>

<script setup>
    import { defineAsyncComponent } from 'vue';
    import { store } from '../composables/store.js';
    import Loading from '../components/UI/Loading.vue';
    import Error from '../components/UI/Error.vue';
    // import TodoItem from '../components/Todo/TodoItem.vue';

    const { TODOS_LIST, deleteOneTodo } = store()

    // //Test to delay loading asyncComponet to show default 
    // const TodoItem = defineAsyncComponent(() => {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve(import('../components/Todo/TodoItem.vue'))
    //         }, 2000)
    //     })
    // })

    const TodoItem = defineAsyncComponent({
        // the loader function
        loader: () => import('../components/Todo/TodoItem.vue'),

        // A component to use while the async component is loading
        loadingComponent: Loading,
        // Delay before showing the loading component. Default: 200ms.
        delay: 200,

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
.loading {
    height: 5rem;
    width: 50%;
    margin: 2rem auto;
    text-align: center;
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