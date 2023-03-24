<script setup>
import Header from './components/Layout/Header.vue';
import Footer from './components/Layout/Footer.vue';
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
