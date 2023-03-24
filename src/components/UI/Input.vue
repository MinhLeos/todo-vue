<template>
    <div>
        <label :for="inputName">Name</label>
        <input :id="inputName" :name="inputName" ref="inputRef" :value="inputValue" @input="handleChangeInput" v-focus/>
    </div>
</template>

<script setup>
import { toRefs, ref } from 'vue';

    //Simple Custom Directives
    const vFocus = {
        mounted: (el) => el.focus()
    }
    const props = defineProps(['inputValue', 'inputName'])
    const { inputValue, inputName } = toRefs(props)
    const inputRef = ref(null)
    const emit = defineEmits(['change-input'])

    function handleChangeInput () {
        emit('change-input', inputRef.value.value)
    }
</script>

<style scoped>
    div {
        flex-direction: column;
        align-items: center;
        margin-bottom: 2rem;
    }
    div input {
        display: block;
        width: 100%;
        font: inherit;
        padding: 0.15rem 0.5rem;
        border: 1px solid #ccc;
    }
    div input:focus {
        outline: none;
        border-color: #3a0061;
        background-color: #f7ebff;
    }
    div label {
        font-weight: bold;
        display: block;
        margin-bottom: 0.5rem;
        text-align: start;
    }
</style>