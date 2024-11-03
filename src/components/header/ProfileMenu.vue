<template>
  <li class="nav-item dropdown ps-1 d-flex align-items-center me-4">
    <router-link to="/cart">
      <i class="fa-regular fa-rectangle-list fa-lg text-dark"></i>
    </router-link>
  </li>
  <li class="nav-item dropdown ps-1 d-flex align-items-center me-4">
    <router-link to="/favorites">
      <i class="fa-regular fa-heart fa-lg text-dark"></i>
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
            ><i class="fa-solid fa-clock-rotate-left me-3"></i>My
            Order</router-link
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
import { computed } from 'vue'
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
</script>
