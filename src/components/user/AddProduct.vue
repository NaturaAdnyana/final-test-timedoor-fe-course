<template>
  <section class="container py-5 my-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/user/my-products">My Products</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          <span>Add Product</span>
        </li>
      </ol>
    </nav>
    <ul class="list-group">
      <li class="list-group-item p-4">
        <button
          class="rounded-circle btn mb-2"
          style="margin: -10px 0 0 -10px"
          @click="$router.back()"
        >
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h1 class="my-0 fs-4 fw-semibold">Add Product</h1>
      </li>
      <li class="list-group-item p-4">
        <product-form></product-form>
      </li>
    </ul>
  </section>
</template>

<script setup>
import ProductForm from '../products/ProductForm.vue'
</script>
