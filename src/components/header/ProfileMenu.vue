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
      class="rounded-circle w-50 h-100"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkdqJslofS3py9Q3E3oJv8zBQ8ENi2FlcSIg&s"
      alt="Profile Picture"
      style="object-fit: cover"
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
            ><i class="fa-regular fa-user me-3"></i>My Profile</router-link
          >
          <router-link to="/user/user-recipe" class="dropdown-item"
            ><i class="fa-regular fa-rectangle-list me-3"></i>My
            Order</router-link
          >
          <li><hr class="dropdown-divider" /></li>
          <li class="dropdown-item" @click="logout">
            <i class="fa-solid fa-arrow-right-from-bracket me-3"></i>Logout
          </li>
        </ul>
      </li>
    </ul>
  </li>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const logout = () => {
  store.commit('auth/setUserLogout')
  router.push('/')
}
</script>
