<script setup>
import { provide, computed } from 'vue'
import Header from './components/Layout/Header.vue'
import Footer from './components/Layout/Footer.vue'

import { TODOS_LIST } from './ultis/store.js'

const todoLength = computed(() => {
  const length = TODOS_LIST.length
  const doneLength = TODOS_LIST.filter(todo => todo.isDone === true).length
  return {
    length, doneLength
  }
})

provide('todoLength', todoLength)

</script>

<template>
  <Header></Header>
  <main>
    <RouterView></RouterView>
  </main>
  <Footer></Footer>
</template>

<style scoped>
main {
  margin-top: 5rem;
}
</style>
