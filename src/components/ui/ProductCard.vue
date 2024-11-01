<template>
  <div>
    <router-link
      :to="`/product/${product.id}`"
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
          <button class="btn-heart">
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
})
</script>
