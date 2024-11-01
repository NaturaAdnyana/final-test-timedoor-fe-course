<template>
  <div class="col-lg-3 mb-4">
    <ul class="list-group mb-2">
      <li class="list-group-item">
        <div class="d-flex align-items-center">
          <img
            :src="
              userData.imageLink ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjxTOc1Z5yT4gzy6apVD7dFJXL-nHVcYA3xg&s'
            "
            alt="Profile"
            width="36"
            height="36"
            class="rounded-circle"
            style="object-fit: cover"
          />
          <div class="ps-3">
            <p class="my-0 fs-5 fw-semibold">
              {{ userData.fullname || '-' }}
            </p>
            <p class="my-0 fs-6 text-secondary">{{ userData.email || '-' }}</p>
          </div>
        </div>
      </li>
      <li
        class="list-group-item user-menu"
        @click="menuClicked('personal-info')"
      >
        <i class="fa-solid fa-user pe-2"></i>Personal Info
      </li>
      <li
        class="list-group-item user-menu"
        @click="menuClicked('favorite-recipes')"
      >
        <i class="fa-solid fa-user-lock pe-2"></i>Change Password
      </li>
      <li class="list-group-item user-menu" @click="menuClicked('user-recipe')">
        <i class="fa-solid fa-clock-rotate-left pe-2"></i>Transaction History
      </li>
    </ul>
    <ul class="list-group">
      <li class="list-group-item">
        <p class="my-0 fs-5 fw-semibold">My Shop</p>
      </li>
      <li
        class="list-group-item user-menu"
        @click="menuClicked('personal-info')"
      >
        <i class="fa-solid fa-tag pe-2"></i>My Products
      </li>
    </ul>
  </div>
</template>

<style scoped>
.user-menu:hover {
  cursor: pointer;
}

.active-color {
  color: #4c4ddc;
}

.inactive-color {
  color: #404040;
}
</style>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const emit = defineEmits(['changeComponent'])

const menuClicked = option => {
  emit('changeComponent', option)
}

const store = useStore()
const userData = computed(() => {
  return store.state.auth.userLogin
})
</script>
