<template>
    <Dialog v-if="todoIsDone" @close="confirmError" title="Edit">
        <template #default>
            <p>Unable to edit task done</p>
            <p>You cannot edit a task that has been completed before reopening the task.</p>
        </template>
        <template #actions>
            <Button @click="confirmError">Okay</Button>
        </template>
    </Dialog>
    <Dialog v-if="isDelete" @close="confirmDelete(false)" title="Delete">
        <template #default>
            <p>You definitely want to delete this task?</p>
            <p>This will delete the data from memory and cannot be recovered. Are you sure you still want to continue?</p>
        </template>
        <template #actions>
            <Button @click="confirmDelete(false)">Cancel</Button>
            <Button @click="confirmDelete(true)">Delete</Button>
        </template>
    </Dialog>
    <Wrapper>
        <div class="todo-item-title flex items-center justify-center mb-4">
            <h3 class="text-[#50d71e]">{{ props.name }}</h3>
            <p :class="status.class" @click="handleChangeStatus">{{ status.title }}</p>
        </div>
        <div class="w-[70%] my-0 mx-auto text-start">
            <p v-for="des in listDes" :key="des">{{ des }}</p>
        </div>
        <p class="mt-4"><i>{{ new Date(props.createdAt).toISOString() }}</i></p>
        <p><i>Id: {{ props.id }}</i></p>
        <div class="mt-8">
            <Button title="Edit" action="edit" @click="editClick"></Button>
            <Button title="Delete" action="delete" :disable="isDisable.value" @click="deleteClick"></Button>
        </div>
    </Wrapper>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { ref, computed, defineAsyncComponent, nextTick, watch, toRefs, reactive } from 'vue';
    import { store } from '../../composables/store.js';
    import Wrapper from '../UI/Wrapper.vue';
    import Button from '../UI/Button.vue';
    // import Dialog from '../UI/Dialog.vue';

    // const Dialog = () => import('../UI/Dialog.vue') //>>> Dynamic Import , chỉ dc hỗ trợ bởi Vue Router
    const Dialog = defineAsyncComponent (() => import('../UI/Dialog.vue')) // AsyncComponent

    const props = defineProps(['name', 'description', 'isDone', 'createdAt', 'id', 'length'])
    const emit = defineEmits(['delete'])

    const todoIsDone = ref(false)
    const isDelete = ref(false)
    const isDisable = reactive({value: false})

    const { changeStatus } = store()

    const listDes = computed(() => {
        const list = props.description.split('\n')
        return list
    })

    const { length } = toRefs(props)
    // use watch to listen change of length to disable button delete
    watch(length, (newValue) => {
        if (newValue === 1) {
            isDisable.value = true
        }
    }, {immediate: true})

    const status = computed(() => {
        if (props.isDone) {
            return {
                class: 'done',
                title: 'Done'
            }
        }
        return {
                class: 'active',
                title: 'New'
            }
    })

    const router = useRouter()
    function editClick() {
        if (props.isDone) {
            todoIsDone.value = true
            return
        }
        router.push('/edit-todo/' + props.id)
    }
    function deleteClick() {
        if (props.length === 1) {
            return
        }
        isDelete.value = true
    }
    function handleChangeStatus() {
        changeStatus(props.id)
    }
    function confirmError() {
        todoIsDone.value = false
    }
    function confirmDelete(confirm) {
        isDelete.value = false
        if (confirm) {
            emit('delete', props.id)
        } 
        // if (confirm) {
        //     //Demo test nextTick
        //     nextTick(() => {
        //         console.log('test nexttick')
        //         emit('delete', props.id)
        //     })
        //     setTimeout(() => {
        //         console.log('emit delete')
        //         emit('delete', props.id)
        //     }, 3000)
        // }
    }
</script>

<style lang="scss" scoped>
    @import '../../scss/todo-item.scss';
</style>