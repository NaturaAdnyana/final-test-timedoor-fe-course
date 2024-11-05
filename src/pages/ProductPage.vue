<template>
  <section class="container py-5 my-5">
    <div class="row justify-content-around img-gallery">
      <div class="col-8 row gx-0">
        <div class="col-6 img-box">
          <img
            :src="
              productDetail.image ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJfnLgDiGKYaxVQApYVsxChexmtMbI42TYw&s'
            "
            alt=""
          />
        </div>
        <div class="col-6 row row-cols-2 gx-0">
          <div class="col col-h-50 img-box">
            <img
              style="
                filter: sepia(44%) brightness(92%) hue-rotate(170deg);
                -webkit-filter: sepia(44%) brightness(92%) hue-rotate(170deg);
                -moz-filter: sepia(44%) brightness(92%) hue-rotate(170deg);
              "
              :src="productDetail.image"
              alt=""
            />
          </div>
          <div class="col col-h-50 img-box">
            <img
              style="
                filter: grayscale(100%);
                -webkit-filter: grayscale(100%);
                -moz-filter: grayscale(100%);
              "
              :src="productDetail.image"
              alt=""
            />
          </div>
          <div class="col col-h-50 img-box">
            <img
              style="
                filter: sepia(100%) hue-rotate(49deg) saturate(140%);
                -webkit-filter: sepia(100%) hue-rotate(49deg) saturate(140%);
                -moz-filter: sepia(100%) hue-rotate(49deg) saturate(140%);
              "
              :src="productDetail.image"
              alt=""
            />
          </div>
          <div class="col col-h-50 img-box">
            <img
              style="
                filter: sepia(100%);
                -webkit-filter: sepia(100%);
                -moz-filter: sepia(100%);
              "
              :src="productDetail.image"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="col-3 shadow p-4 rounded">
        <h2 class="text-left">
          Rp. {{ Number(productDetail.price).toLocaleString() }}
        </h2>
        <h1 class="fs-3 text">{{ productDetail.name }}</h1>
        <small class="text-secondary"
          >{{ productDetail.color }} / {{ productDetail.size }} •</small
        >
        <small class="text-secondary"> Very Good •</small>
        <small class="text-secondary"> Denpasar</small>
        <hr />
        <small class="text-secondary">Item Description</small>
        <p>
          {{ productDetail.description }}
        </p>
        <div class="row row-cols-2">
          <div class="col my-1">
            <span>Category</span>
          </div>
          <div class="col my-1">
            <span class="text-secondary">{{ productDetail.category }}</span>
          </div>
          <div class="col my-1">
            <span>Size</span>
          </div>
          <div class="col my-1">
            <span class="text-secondary">{{ productDetail.size }}</span>
          </div>
          <div class="col my-1">
            <span>Condition</span>
          </div>
          <div class="col my-1">
            <span class="text-secondary">Very Good</span>
          </div>
          <div class="col my-1">
            <span>Color</span>
          </div>
          <div class="col my-1">
            <span class="text-secondary">{{ productDetail.color }}</span>
          </div>
          <div class="col my-1">
            <span>Uploaded</span>
          </div>
          <div class="col my-1">
            <span class="text-secondary">5 Hours ago</span>
          </div>
          <div class="col my-1">
            <span>Shipping</span>
          </div>
          <div class="col my-1">
            <span class="text-secondary"
              >Rp. {{ Number(productDetail.shipping).toLocaleString() }}</span
            >
          </div>
        </div>
        <hr />
        <button type="button" class="btn btn-success w-100 mb-2">
          Buy Now
        </button>
        <button
          type="button"
          class="btn btn-outline-success w-100"
          @click="addToCartHandler"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </section>
  <section class="container py-5">
    <div class="d-flex justify-content-between align-items-center">
      <h2>Other Products</h2>
      <a href="products.html" class="">See all</a>
    </div>
    <div class="row row-cols-5 g-2 py-3 justify-content-start">
      <product-card
        v-for="product in newProductList"
        :key="product.id"
        :product="product"
      ></product-card>
    </div>
  </section>
</template>

<script setup>
import ProductCard from '@/components/ui/ProductCard.vue'

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()

onMounted(async () => {
  await store.dispatch('product/getProductDetail', route.params.id)
})
import { computed } from 'vue'

const productDetail = computed(() => {
  return store.state.product.productDetail
})

const productListStatus = ref(false)
const newProductList = ref()

// For Recomendation List
onMounted(async () => {
  try {
    await store.dispatch('product/getProductData')
    productListStatus.value = true
    newProductList.value = Object.fromEntries(
      Object.entries(store.state.product.products).slice(-4),
    )
  } catch (error) {
    console.error('Error fetching product data:', error)
  }
})

const addToCartHandler = async () => {
  try {
    await store.dispatch('cart/addProductToCart', {
      productId: route.params.id,
      image: productDetail.value.image,
      name: productDetail.value.name,
      price: productDetail.value.price,
      size: productDetail.value.size,
      color: productDetail.value.color,
      quantity: 1,
    })
    alert('Product added to cart successfully')
  } catch (error) {
    console.error('Error fetching product data:', error)
  }
}
</script>
