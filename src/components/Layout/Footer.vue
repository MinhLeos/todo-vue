<template>
    <div class="footer">
        <p class="footer-all">Total: {{ todoLength.length }}</p>
        <p class="footer-done">Done: {{ todoLength.doneLength }}</p>
    </div>
</template>

<script setup>
    import { inject } from 'vue'
    const todoLength = inject('todoLength')
</script>

<style lang="scss" scoped>
@import '../../scss/footer.scss'
</style>