<template>
  <ul class="list-group">
    <li class="list-group-item p-4">
      <p class="my-0 fs-4 fw-semibold">Personal Info</p>
      <p>
        These details will be used for all the Meredith profiles associated with
        your email address. By filling out this information, you will receive a
        more personalized experience across all Meredith websites
      </p>
    </li>
    <li class="list-group-item p-4">
      <p class="my-0 fs-5 fw-semibold" v-show="isLoading.value">
        Edit Basic Info
      </p>
      <form @submit.prevent="updateProfile" class="mt-4 w-50">
        <div class="mb-3">
          <label for="profilePicture" class="form-label">Profile Picture</label>
          <div class="d-flex align-items-center">
            <img
              :src="userData.imageLink"
              :alt="userData.name"
              class="image rounded-circle"
              style="width: 100px; height: 100px; object-fit: cover"
            />
            <input
              class="form-control ms-5"
              type="file"
              id="profilePicture"
              @input="checkImage"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="fullname" class="form-label">Fullname</label>
          <input
            type="text"
            class="form-control"
            id="fullname"
            v-model="userData.fullname"
          />
        </div>
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="userData.username"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="userData.email"
          />
        </div>
        <div class="py-2 d-flex justify-content-end">
          <button type="submit" class="btn btn-success w-100">
            Update Profile
          </button>
        </div>
      </form>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const isLoading = ref(false)

const userData = reactive({
  imageLink:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjxTOc1Z5yT4gzy6apVD7dFJXL-nHVcYA3xg&s',
  fullname: '-',
  username: '-',
  email: '-',
})

const checkImage = e => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)

  reader.addEventListener('load', () => {
    userData.imageLink = reader.result
  })
}

onMounted(async () => {
  isLoading.value = true
  try {
    const getUserData = await store.state.auth.userLogin
    userData.imageLink = getUserData.imageLink
    userData.fullname = getUserData.fullname
    userData.username = getUserData.username
    userData.email = getUserData.email
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
})

const updateProfile = async () => {
  try {
    await store.dispatch('auth/updateUserEmail', userData)
    router.push('/user/personal-info')
  } catch (err) {
    console.log(err)
  }
}
</script>
