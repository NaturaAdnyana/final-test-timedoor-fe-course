<template>
  <li class="nav-item dropdown ps-1 d-flex align-items-center me-4">
    <router-link to="/cart" class="rounded-circle position-relative">
      <span
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger text-badge-xxs"
      >
        {{ store.state.cart.cart.length }}
        <span class="visually-hidden">unread messages</span>
      </span>
      <i class="fa-solid fa-cart-shopping text-black-50"></i>
    </router-link>
  </li>
  <li class="nav-item dropdown ps-1 d-flex align-items-center me-4">
    <router-link to="/favorites" class="rounded-circle">
      <i class="fa-solid fa-heart text-black-50"></i>
    </router-link>
  </li>
  <li
    class="header__signup col-8 col-sm-4 fw-semibold d-flex justify-content-evenly align-items-center text-decoration-none me-2"
    style="text-align: right"
  >
    <img
      style="width: 40px; height: 40px; object-fit: cover"
      class="rounded-circle"
      :src="
        userData.imageLink ||
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjxTOc1Z5yT4gzy6apVD7dFJXL-nHVcYA3xg&s'
      "
      alt="Profile Picture"
    />
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
        >
        </a>
        <ul class="dropdown-menu">
          <router-link to="/user/personal-info" class="dropdown-item"
            ><i class="fa-solid fa-user me-3"></i>My Profile</router-link
          >
          <router-link to="/user/transaction-history" class="dropdown-item"
            ><i class="fa-solid fa-truck me-3"></i>My Order</router-link
          >
          <router-link to="/user/change-password" class="dropdown-item"
            ><i class="fa-solid fa-user-lock me-3"></i>Change
            Password</router-link
          >
          <li><hr class="dropdown-divider" /></li>
          <router-link to="/user/my-products" class="dropdown-item"
            ><i class="fa-solid fa-tag me-3"></i>My Products</router-link
          >
          <li><hr class="dropdown-divider" /></li>
          <li class="dropdown-item pointer" @click="logout">
            <i class="fa-solid fa-arrow-right-from-bracket me-3"></i>Logout
          </li>
        </ul>
      </li>
    </ul>
  </li>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const logout = () => {
  store.commit('auth/setUserLogout')
  router.push('/')
}

const userData = computed(() => {
  return store.state.auth.userLogin
})

onMounted(async () => {
  await store.dispatch('cart/getCartData')
})
</script>
