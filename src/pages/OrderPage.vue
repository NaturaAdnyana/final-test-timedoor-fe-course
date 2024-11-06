<template>
  <section class="container py-5 mt-5">
    <div class="d-flex mx-3">
      <button
        class="rounded-circle btn mb-2 me-1"
        style="margin: -10px 0 0 -10px"
        @click="$router.back()"
      >
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <h1 class="fs-4 mb-3">Order</h1>
    </div>
    <div class="row">
      <div class="col-lg-9">
        <ul class="list-group mb-3">
          <li class="list-group-item p-4">
            <div
              class="card my-2 position-relative"
              v-for="(order, index) in orderData"
              :key="index"
            >
              <div class="row">
                <div
                  class="col-md-4"
                  style="max-width: 150px; overflow: hidden"
                >
                  <img
                    :src="order.image"
                    class="img-fluid rounded-start"
                    :alt="order.name"
                  />
                </div>
                <div
                  class="col-md-8 d-flex flex-column justify-content-center text-dark"
                >
                  <div
                    class="card-body d-flex flex-column justify-content-center"
                  >
                    <h5 class="card-title fs-6">{{ order.name }}</h5>
                    <p class="card-text">
                      <small
                        class="text-body-secondary"
                        style="font-size: 14px"
                      >
                        {{ order.color }} / {{ order.size }}</small
                      >
                    </p>
                    <p class="card-text" style="font-size: 14px">
                      Rp. {{ Number(order.price).toLocaleString() }}
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="position-absolute"
                style="top: 20px; right: 20px; font-size: 14px"
              >
                × {{ order.quantity }}
              </div>
            </div>
          </li>
        </ul>
        <ul class="list-group mb-3">
          <li class="list-group-item p-4">
            <h2 class="fs-6 text-secondary mb-3">Location</h2>
            <div class="card my-2">
              <div class="row g-0">
                <div
                  class="col-md-4"
                  style="max-width: 100px; overflow: hidden"
                >
                  <img
                    src="@/assets/images/map.png"
                    class="img-fluid rounded-start p-4"
                  />
                </div>
                <div
                  class="col-md-8 d-flex flex-column justify-content-center text-dark"
                >
                  <div
                    class="card-body d-flex flex-column justify-content-center"
                  >
                    <h5 class="card-title fs-6">
                      Ibu Kota Nusantara - Kalimantan Timur
                    </h5>
                    <p class="card-text fs-5">
                      <small
                        class="text-body-secondary"
                        style="font-size: 14px"
                      >
                        Gedung BRI Lantai 4, Jalan Jenderal Sudirman Nomor 40,
                        Balikpapan, Kalimantan Timur (76113)</small
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul class="list-group mb-3">
          <li class="list-group-item p-4">
            <h2 class="fs-6 text-secondary mb-3">Delivery details</h2>
            <div class="card my-2">
              <div class="row g-0">
                <div
                  class="col-md-4"
                  style="max-width: 100px; overflow: hidden"
                >
                  <img
                    src="@/assets/images/approved.png"
                    class="img-fluid rounded-start p-4"
                  />
                </div>
                <div
                  class="col-md-8 d-flex flex-column justify-content-center text-dark"
                >
                  <div
                    class="card-body d-flex flex-column justify-content-center"
                  >
                    <h5 class="card-title fs-6">Si Kebut Express - Shipping</h5>
                    <p
                      class="card-text fs-5 d-flex justify-content-between w-100"
                    >
                      <small
                        class="text-body-secondary"
                        style="font-size: 14px"
                      >
                        Rp. 25,000</small
                      >
                      <small
                        class="text-body-secondary"
                        style="font-size: 14px"
                      >
                        <i class="fa-regular fa-clock me-2"></i>Home delivery in
                        1-3 working days</small
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul class="list-group">
          <li class="list-group-item p-4">
            <h2 class="fs-6 text-secondary mb-3">Payment Method</h2>
            <div class="card my-2">
              <div class="row g-0">
                <div
                  class="col-md-4"
                  style="max-width: 100px; overflow: hidden"
                >
                  <img
                    src="@/assets/images/visa.png"
                    class="img-fluid rounded-start p-4"
                  />
                </div>
                <div
                  class="col-md-8 d-flex flex-column justify-content-center text-dark"
                >
                  <div
                    class="card-body d-flex flex-column justify-content-center"
                  >
                    <h5 class="card-title fs-6">0819283210323</h5>
                    <p
                      class="card-text fs-5 d-flex justify-content-between w-100"
                    >
                      <small
                        class="text-body-secondary"
                        style="font-size: 14px"
                      >
                        23/12 • 123</small
                      >
                      <small
                        class="text-body-secondary"
                        style="font-size: 14px"
                      >
                        <i class="fa-regular fa-credit-card me-2"></i>Jack
                        Daniel Arya</small
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-lg-3">
        <ul class="list-group position-sticky" style="top: 100px">
          <li class="list-group-item pt-4">
            <h2 class="d-flex justify-content-between mb-4 fs-6">
              <b>Order Summary ({{ orderCount }}×)</b>
            </h2>
            <p class="d-flex justify-content-between">
              <small> Orders </small>
              <small>
                Rp.
                {{ Number(orderTotalPrice).toLocaleString() }}
              </small>
            </p>
            <p class="d-flex justify-content-between">
              <small> Protection fee </small>
              <small> Rp. 20,000 </small>
            </p>
            <p class="d-flex justify-content-between pb-3 border-bottom">
              <small> Shipping </small>
              <small> Rp 15,000 </small>
            </p>
            <p class="d-flex justify-content-between">
              <b> Total to pay </b>
              <b>
                {{ Number(orderTotalPrice + 20000 + 15000).toLocaleString() }}
              </b>
            </p>
          </li>
          <li class="list-group-item py-3">
            <router-link
              to="/order/"
              class="btn btn-success w-100"
              @click="checkoutHandler"
            >
              Order Now
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { store } from '@/store'
import { onMounted, ref } from 'vue'

const router = useRouter()

const orderData = ref({})
const orderCount = ref(0)
const orderTotalPrice = ref(0)

onMounted(async () => {
  try {
    getOrderDataFromStore()
  } catch (error) {
    console.error('Error fetching product data:', error)
  }
})

const getOrderDataFromStore = () => {
  orderData.value = store.state.order.order
  orderCount.value = store.state.order.totalOrder
  orderTotalPrice.value = store.state.order.order.reduce(
    (acc, product) => acc + Number(product.price) * product.quantity,
    0,
  )
}

const checkoutHandler = async () => {
  try {
    await store.dispatch('order/orderProduct', orderData.value)
    router.push('/')
  } catch (err) {
    console.log(err)
  }
}
</script>
