<template>
  <ul class="list-group">
    <li class="list-group-item p-4">
      <p class="my-0 fs-4 fw-semibold">My Products</p>
      <p>These products are currently online.</p>
      <div class="row row-cols-4 g-2 py-3 justify-content-start">
        <div>
          <router-link
            to="/user/my-products/add"
            class="d-flex justify-content-center align-items-center h-100 card product-card"
          >
            <span class="mb-3">Add Product</span>
            <i class="fa-solid fa-plus text-success"></i>
          </router-link>
        </div>
        <product-card
          v-for="product in productList"
          :key="product.id"
          :product="product"
          is-admin="true"
        ></product-card>
      </div>
    </li>
  </ul>
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
