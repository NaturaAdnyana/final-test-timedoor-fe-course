<template>
  <ul class="list-group">
    <li class="list-group-item p-4">
      <h1 class="my-0 fs-4 fw-semibold mb-3">Transaction History</h1>
      <div
        class="border p-2 rounded my-3 bg-light"
        v-for="(order, index) in orderHistoryData"
        :key="index"
      >
        <h2 class="text-secondary fs-6 my-2">
          <i class="fa-solid fa-bag-shopping mx-2 mb-2"></i>
          <b class="me-3">Shopping</b>
          <span class="badge rounded-pill text-bg-success me-3">Success</span>
          <span class="text-secondary" style="font-size: 14px"
            >ORD-{{ new Date(order.createdAt).toLocaleString() }}</span
          >
        </h2>
        <template v-for="(product, pIndex) in order" :key="pIndex">
          <div
            class="card mb-3 mx-3"
            v-if="typeof product !== 'string' && typeof product !== 'number'"
          >
            <div class="row g-0">
              <div class="col-md-2" style="max-width: 150px; overflow: hidden">
                <img
                  :src="product.image"
                  class="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div class="col-md-7">
                <div class="card-body position-relative">
                  <h5 class="card-title">{{ product.name }}</h5>
                  <p class="card-text">
                    <small class="text-body-secondary">
                      {{ product.quantity }} × Rp.
                      {{ Number(product.price).toLocaleString() }}
                    </small>
                  </p>
                  <p class="card-text">
                    <small class="text-body-secondary">
                      {{ product.color }} / {{ product.size }}
                    </small>
                  </p>
                  <router-link
                    :to="`/product/${product.productId}`"
                    class="btn btn-success buy-again"
                  >
                    Buy Again
                  </router-link>
                </div>
              </div>
              <div
                class="col-md-3 d-flex flex-column justify-content-center px-5"
                style="border-left: dashed 1px #b3b3b3"
              >
                <p class="my-0 text-secondary" style="font-size: 14px">
                  Total Price
                </p>
                <b>Rp. {{ calculateOrderTotal(order).toLocaleString() }}</b>
              </div>
            </div>
          </div>
        </template>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { store } from '@/store'
import { onMounted, ref } from 'vue'

const orderHistoryData = ref()

onMounted(async () => {
  try {
    await store.dispatch('order/getOrderHistory')
    getOrderHistoryFromStore()
  } catch (error) {
    console.error('Error fetching product data:', error)
  }
})

const getOrderHistoryFromStore = async () => {
  orderHistoryData.value = await store.state.order.orderHistory.reverse()
  console.log(orderHistoryData.value)
}

const calculateOrderTotal = order => {
  let total = 0
  for (const product of Object.values(order)) {
    if (typeof product !== 'string' && typeof product !== 'number') {
      total += product.quantity * product.price
    }
  }
  return total
}
</script>
