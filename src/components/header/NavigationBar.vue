<template>
  <nav class="navbar navbar-expand-lg fixed-top bg-glass">
    <div class="container-md px-5">
      <img src="@/assets/logo.png" width="50px" class="pe-2" />
      <router-link class="navbar-brand fw-bold text-success" to="/"
        >Vintage</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse my-2" id="navbarSupportedContent">
        <form class="d-flex w-100 mx-5" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search for items..."
            aria-label="Search"
          />
        </form>
        <ul class="navbar-nav me-auto">
          <component :is="components[menuComponent]"></component>
          <li
            class="nav-item dropdown border-start ps-1 d-flex align-items-center"
          >
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              EN
            </a>
            <ul class="dropdown-menu custom-dropdown-menu">
              <li><a class="dropdown-item" href="#">ID</a></li>
              <li><a class="dropdown-item" href="#">JP</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" href="#">Except Israel</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import AuthMenu from './AuthMenu.vue'
import ProfileMenu from './ProfileMenu.vue'

import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

const menuComponent = ref('signup-menu')
const store = useStore()

const components = {
  'auth-menu': AuthMenu,
  'profile-menu': ProfileMenu,
}

const getToken = computed(() => {
  return store.state.auth.token
})

if (!getToken.value) {
  menuComponent.value = 'auth-menu'
} else {
  menuComponent.value = 'profile-menu'
}

watch(getToken, newValue => {
  if (!newValue) {
    menuComponent.value = 'auth-menu'
  } else {
    menuComponent.value = 'profile-menu'
  }
})
</script>
