<template>
  <form @submit.prevent="submitProduct" class="mt-4" v-if="!isLoading">
    <div class="mb-3">
      <div class="row gx-5">
        <div class="col-4">
          <img
            :src="productData.image"
            :alt="productData.name"
            class="image w-100 rounded"
            style="object-fit: cover; position: sticky; top: 100px"
          />
        </div>
        <div class="col-8">
          <div class="mb-3">
            <label for="productPicture" class="form-label"
              >Product Picture</label
            >
            <input
              class="form-control"
              type="file"
              id="productPicture"
              @input="checkImage"
            />
          </div>
          <div class="mb-3">
            <label for="fullname" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="fullname"
              v-model="productData.name"
              placeholder="Your product name"
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea
              class="form-control"
              :id="description"
              v-model="productData.description"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="category" class="form-label">Category</label>
            <select
              id="category"
              class="form-select"
              v-model="productData.category"
            >
              <option
                v-for="(item, index) in categoryOptions"
                :value="item"
                :key="index"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="size" class="form-label">Size</label>
            <select id="size" class="form-select" v-model="productData.size">
              <option
                v-for="(item, index) in sizeOptions"
                :value="item"
                :key="index"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input
              type="number"
              class="form-control"
              id="price"
              v-model="productData.price"
            />
          </div>
          <div class="mb-3">
            <label for="shipping" class="form-label">Shipping</label>
            <input
              type="number"
              class="form-control"
              id="shipping"
              v-model="productData.shipping"
            />
          </div>
          <div class="mb-3">
            <label for="color" class="form-label">Color</label>
            <select id="color" class="form-select" v-model="productData.color">
              <option
                v-for="(item, index) in colorOptions"
                :value="item"
                :key="index"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <div class="py-2 d-flex justify-content-end">
            <button type="submit" class="btn btn-success w-100">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  isEdit: { type: Boolean, default: false },
})

const categoryOptions = [
  'Dress',
  'T-Shirts (Short Sleeves)',
  'Long Sleeve Shirts',
  'Jacket',
  'Jeans',
  'Bag',
  'Hat',
  'Sweater',
  'Hoodie',
  'Skirt',
  'Pants',
  'Shorts',
  'Socks',
  'Shoes',
  'Accessories',
]

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

const colorOptions = [
  'Black',
  'White',
  'Gray',
  'Navy Blue',
  'Royal Blue',
  'Light Blue',
  'Red',
  'Maroon',
  'Pink',
  'Orange',
  'Yellow',
  'Beige',
  'Brown',
  'Green',
  'Olive Green',
  'Purple',
  'Lavender',
  'Teal',
  'Burgundy',
  'Cream',
]

import { onMounted, ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const route = useRoute()

const isLoading = ref(true)

const productData = reactive({
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJfnLgDiGKYaxVQApYVsxChexmtMbI42TYw&s',
  category: '',
  description: '',
  name: '',
  price: 0,
  shipping: 0,
  color: '',
})

onMounted(async () => {
  if (props.isEdit) {
    try {
      await store.dispatch('product/getProductDetail', route.params.id)
      Object.assign(productData, store.state.product.productDetail)
    } catch (err) {
      console.log(err)
    } finally {
      isLoading.value = false
    }
  } else {
    isLoading.value = false
  }
})

const checkImage = e => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)

  reader.addEventListener('load', () => {
    productData.image = reader.result
  })
}

const submitProduct = async () => {
  if (props.isEdit) {
    try {
      await store.dispatch('product/updateProduct', {
        id: route.params.id,
        newProduct: productData,
      })
    } catch (err) {
      console.log(err)
    }
  } else {
    try {
      await store.dispatch('product/addNewProduct', productData)
      router.push('/user/my-products')
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
