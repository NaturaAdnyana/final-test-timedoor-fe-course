<template>
  <section class="container py-5 my-5">
    <h1 class="fs-4">Cart</h1>
    <div class="row">
      <div class="col-lg-9">
        <ul class="list-group">
          <li class="list-group-item p-4 list-group-item-light">
            <i class="fa-solid fa-location-dot me-2"></i>Shipping to
            <b>IKN</b>
          </li>
          <li class="list-group-item p-4" v-if="cartData.length !== 0">
            <div
              class="card mb-3"
              v-for="(cart, index) in cartData"
              :key="index"
            >
              <div class="row g-0">
                <div
                  class="col-md-4"
                  style="max-width: 150px; overflow: hidden"
                >
                  <img
                    :src="cart.image"
                    class="img-fluid rounded-start"
                    :alt="cart.name"
                  />
                </div>
                <router-link
                  :to="`/product/${cart.productId}`"
                  class="col-md-8 d-flex flex-column justify-content-center text-dark"
                >
                  <div
                    class="card-body d-flex flex-column justify-content-center"
                  >
                    <h5 class="card-title">{{ cart.name }}</h5>
                    <p class="card-text">
                      <small class="text-body-secondary">
                        {{ cart.color }} / {{ cart.size }}</small
                      >
                    </p>
                    <p class="card-text">
                      Rp. {{ Number(cart.price).toLocaleString() }}
                    </p>
                  </div>
                </router-link>
                <div
                  class="card-footer bg-transparent d-flex justify-content-between py-3"
                >
                  <button
                    class="btn btn-outline-danger"
                    @click="deleteProductFromCartHandler(cart.id)"
                  >
                    <i class="fa-solid fa-trash-can"></i>
                    Remove
                  </button>
                  <div class="d-flex justify-content-end btn-group w-25">
                    <button
                      class="btn btn-outline-secondary"
                      @click="updateQuantity(cart.id, cart.quantity - 1)"
                      :disabled="quantityLoading"
                    >
                      -
                    </button>
                    <input
                      class="w-25 btn"
                      style="border: #6c757d 1px solid"
                      type="number"
                      :value="cart.quantity"
                    />
                    <button
                      class="btn btn-outline-secondary"
                      @click="updateQuantity(cart.id, cart.quantity + 1)"
                      :disabled="quantityLoading"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li
            class="list-group-item p-5 d-flex flex-column align-items-center"
            v-else
          >
            <img
              class="mb-5 rounded"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP8pht33JK6ovE6xqux5YQt3pCL4DV5JHLSg&s"
            />
            <h3>Your Cart is Empty</h3>
            <p class="text-secondary">
              Find your favorite items and add to cart before check out.
            </p>
            <router-link to="/products/" class="btn btn-success px-3"
              >Find Products</router-link
            >
          </li>
        </ul>
      </div>
      <div class="col-lg-3">
        <ul class="list-group position-sticky" style="top: 100px">
          <li class="list-group-item pt-4">
            <h2 class="d-flex justify-content-between mb-2 fs-6">
              <b>Order Summary</b>
              <b>
                Rp.
                {{ Number(cartTotalPrice).toLocaleString() }}
              </b>
            </h2>
            <p class="d-flex justify-content-between">
              <small> {{ store.state.cart.cart.length }} Items </small>
              <small>Not include shipping fee</small>
            </p>
          </li>
          <li class="list-group-item py-3">
            <button
              class="btn btn-success w-100"
              :disabled="cartData.length === 0"
            >
              Checkout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { store } from '@/store'
import { onMounted, ref } from 'vue'

const cartData = ref({})
const cartTotalPrice = ref(0)
const quantityLoading = ref(false)

onMounted(async () => {
  try {
    await store.dispatch('cart/getCartData')
    getCartDataFromStore()
  } catch (error) {
    console.error('Error fetching product data:', error)
  }
})

const getCartDataFromStore = () => {
  cartData.value = store.state.cart.cart
  calculateCartTotal()
}

const calculateCartTotal = () => {
  cartTotalPrice.value = cartData.value.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  )
}

const deleteProductFromCartHandler = async id => {
  const confirmDelete = confirm(
    'Are you sure want to remove this product from cart?',
  )
  if (confirmDelete) {
    try {
      await store.dispatch('cart/deleteProductFromCart', id)
      getCartDataFromStore()
    } catch (err) {
      console.log(err)
    }
  } else {
    console.log('delete not run')
  }
}

const updateQuantity = async (productId, newQuantity) => {
  if (newQuantity < 1) return
  quantityLoading.value = true
  try {
    await store.dispatch('cart/updateProductQuantity', {
      productId,
      quantity: newQuantity,
    })
  } catch (err) {
    console.log(err)
  } finally {
    quantityLoading.value = false
    getCartDataFromStore()
  }
}
</script>
