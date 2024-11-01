<template>
  <section class="container py-5 my-5">
    <div class="d-flex justify-content-between align-items-center">
      <h2>Items</h2>
    </div>
    <div class="row row-cols-6 g-2 py-3 justify-content-start">
      <product-card
        v-for="product in productList"
        :key="product.id"
        :product="product"
      ></product-card>
    </div>
  </section>
</template>

<script setup>
import ProductCard from '@/components/ui/ProductCard.vue'

import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const productListStatus = ref(false)
const productList = ref()

onMounted(async () => {
  try {
    await store.dispatch('product/getProductData')
    productListStatus.value = true
    productList.value = store.state.product.products
  } catch (error) {
    console.error('Error fetching product data:', error)
  }
})
</script>
