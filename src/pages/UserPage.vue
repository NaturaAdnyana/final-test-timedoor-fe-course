<template>
  <section class="container py-5 my-5">
    <div class="row">
      <user-menu @changeComponent="$router.push($event)"></user-menu>
      <div class="col-lg-9">
        <component :is="component[getRoute]"></component>
      </div>
    </div>
  </section>
</template>

<script setup>
import UserMenu from '@/components/user/UserMenu.vue'

import PersonalInfo from '@/components/user/PersonalInfo.vue'
import ChangePassword from '@/components/user/ChangePassword.vue'
import TransactionHistory from '@/components/user/TransactionHistory.vue'
import MyProducts from '@/components/user/MyProducts.vue'
import OrderList from '@/components/user/OrderList.vue'

import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const component = {
  'personal-info': PersonalInfo,
  'change-password': ChangePassword,
  'transaction-history': TransactionHistory,
  'my-products': MyProducts,
  'order-list': OrderList,
}

const getRoute = computed(() => {
  return route.params.component
})
</script>
