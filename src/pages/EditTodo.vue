<template>
    <Dialog @close="confirmError" title="Invalid Input" :open="inputIsInvalid">
        <template #default>
            <p>Unfortunately, at least one input value is invalid.</p>
            <p>Please check all inputs and make sure you enter at least a few characters into each input field.</p>
        </template>
        <template #actions>
            <Button @click="confirmError">Okay</Button>
        </template>
    </Dialog>
    <h2 class="edit-todo-header custom-h2">Edit Todo</h2>
    <Wrapper>
        <form class="edit-todo-form">

            <!-- <div class="edit-todo-form-div">
                <label for="name">Name</label>
                <input id="name" name="name" :value="name" @input="changeName"/>
            </div> -->
            <Input :input-value="name" input-name="edit-todo-name" @change-input="changeName"></Input>
            <div class="edit-todo-form-div">
                <label for="description">Description</label>
                <textarea id="description" name="description" @input="changeDescription">{{ description }}</textarea>
            </div>
        </form>
        <Button @click="handleSubmitEdit" title="Save"></Button>
    </Wrapper>
</template>

<script setup>
    import { ref, computed, toRefs } from 'vue';
    import { useRouter } from 'vue-router';
    import { store } from '../composables/store.js';
    import Wrapper from '../components/UI/Wrapper.vue';
    import Button from '../components/UI/Button.vue';
    import Dialog from '../components/UI/Dialog.vue';
    import Input from '../components/UI/Input.vue';

    const { TODOS_LIST, editTodo } = store()
    const props = defineProps(['id'])
    const router = useRouter()

    const inputIsInvalid = ref(false)
    const todo = computed(() => {
        const findTodo = TODOS_LIST.find(todo => todo.id === props.id)
        return findTodo
    })
    const { name, description } = toRefs(todo.value)
    
    function changeName(inputValue) {
        name.value = inputValue
        // name.value = event.target.value
    }
    function changeDescription(event) {
        description.value = event.target.value
    }
    function handleSubmitEdit() {
        if (name.value.trim() === '' || description.value.trim() === '') {
            inputIsInvalid.value = true
            return
        }
        editTodo(props.id, name.value, description.value)
        router.push('/')
    }
    function confirmError() {
        inputIsInvalid.value = false
    }
</script>

<style lang="scss" scoped>
@import '../scss/edit-todo.scss';
</style>