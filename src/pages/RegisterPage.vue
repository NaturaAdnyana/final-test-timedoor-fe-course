<template>
  <div class="container py-5 my-3">
    <div class="row justify-content-center align-items-center min-vh-100">
      <div class="col-md-12 col-lg-5 border p-4 rounded">
        <form @submit.prevent="register">
          <legend>Sign up</legend>
          <p class="mb-4">Enter your details below</p>
          <div class="mb-3">
            <label for="fullname" class="form-label">Full name</label>
            <input
              type="text"
              class="form-control"
              id="fullname"
              placeholder="Enter your fullname"
              v-model="signUpData.fullname"
            />
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="fullname"
              placeholder="Enter your username"
              v-model="signUpData.username"
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter your email"
              v-model="signUpData.email"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter your password"
              v-model="signUpData.password"
              @keyup="passwordCheck"
            />
            <div
              class="form-text text-danger"
              :style="{ display: passwordStatusDisplay }"
            >
              The password field must be at least 8 characters
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label"
              >Confirmation Password</label
            >
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter your password"
              v-model="signUpData.confirmationPassword"
              @keyup="confirmationPasswordCheck"
            />
            <div
              class="form-text text-danger"
              :style="{ display: confirmPasswordDoesNotMatch }"
            >
              The password confirmation does not match
            </div>
            <div
              class="form-text text-success"
              :style="{ display: confirmPasswordMatch }"
            >
              The password confirmation does match
            </div>
          </div>
          <div class="mb-5 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="agreement"
              v-model="agreeTermCondition"
            />
            <label class="form-check-label" for="agreement"
              >By clicking sign up, I hereby agree and consent to Term &
              Conditions; I confirm that I have read Privacy policy.</label
            >
          </div>
          <div>
            <button class="btn w-100 btn-success" type="submit">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const agreeTermCondition = ref(false)

const signUpData = reactive({
  fullname: '',
  username: '',
  email: '',
  password: '',
  confirmationPassword: '',
  isLogin: '',
})

const passwordStatusDisplay = ref('none')
const confirmPasswordDoesNotMatch = ref('none')
const confirmPasswordMatch = ref('none')

const passwordCheck = () => {
  if (signUpData.password.length < 8) {
    passwordStatusDisplay.value = 'block'
  } else {
    passwordStatusDisplay.value = 'none'
  }
}

const confirmationPasswordCheck = () => {
  if (signUpData.confirmationPassword === '') {
    confirmPasswordDoesNotMatch.value = 'none'
    confirmPasswordMatch.value = 'none'
    return
  }
  if (signUpData.password !== signUpData.confirmationPassword) {
    confirmPasswordDoesNotMatch.value = 'block'
    confirmPasswordMatch.value = 'none'
    return
  }

  confirmPasswordDoesNotMatch.value = 'none'
  confirmPasswordMatch.value = 'block'
}

const register = async () => {
  if (agreeTermCondition.value) {
    if (
      signUpData.password !== signUpData.confirmationPassword ||
      signUpData.password.length < 8
    ) {
      signUpData.confirmationPassword = ''
      signUpData.password = ''
      confirmPasswordDoesNotMatch.value = 'none'
      confirmPasswordMatch.value = 'none'
    } else {
      await store.dispatch('auth/getRegisterData', signUpData)
      router.push('/')
    }
  }
}
</script>
