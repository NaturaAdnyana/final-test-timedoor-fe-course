<template>
  <div>
    <router-link
      :to="
        isAdmin ? `/user/my-products/${product.id}` : `/product/${product.id}`
      "
      class="card position-relative h-100"
    >
      <img :src="product.image" class="card-img-top" :alt="product.name" />
      <div class="card-body">
        <h5 class="card-title">
          Rp. {{ Number(product.price).toLocaleString() }}
        </h5>
        <p class="card-text">{{ product.name }}</p>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-body-secondary"
            >{{ product.color }} / {{ product.size }}</small
          >
          <button
            class="btn btn-heart rounded-circle"
            v-if="isAdmin"
            @click.stop="event => handleDelete(event, product.id)"
          >
            <i class="fa-regular fa-trash-can"></i>
          </button>
          <button class="btn btn-heart rounded-circle" v-else>
            <i class="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  product: { type: Object, require: true },
  isAdmin: { type: Boolean, default: false },
})

import { useStore } from 'vuex'
const store = useStore()

const handleDelete = async (event, id) => {
  event.preventDefault()
  event.stopPropagation()
  const confirmDelete = confirm('Are you sure want to delete this product?')
  if (confirmDelete) {
    try {
      await store.dispatch('product/deleteProduct', id)
    } catch (err) {
      console.log(err)
    }
  } else {
    console.log('delete not run')
  }
}
</script>
