<template>
  <div class="container">
    <div class="row justify-content-center align-items-center min-vh-100">
      <div class="col-4 border p-4 rounded">
        <form @submit.prevent="login">
          <legend>Login to Vintage</legend>
          <p class="mb-4">Enter your details below</p>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="loginData.email"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="loginData.password"
            />
          </div>
          <div>
            <button class="btn w-100 btn-success" type="submit">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const loginData = reactive({
  email: '',
  password: '',
  isLogin: true,
})

const login = async () => {
  await store.dispatch('auth/getLoginData', loginData)
  router.push('/')
}
</script>
