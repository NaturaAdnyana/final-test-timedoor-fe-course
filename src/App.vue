<template>
  <web-header></web-header>
  <main>
    <RouterView />
  </main>
  <web-footer></web-footer>
</template>

<script setup>
import { RouterView } from 'vue-router'

import WebHeader from '@/components/header/WebHeader.vue'
import WebFooter from '@/components/footer/WebFooter.vue'
</script>
