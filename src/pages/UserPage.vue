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

// import FavoriteRecipe from '../user/FavoriteRecipe.vue'
import PersonalInfo from '@/components/user/PersonalInfo.vue'
// import UserRecipe from '../user/UserRecipe.vue'

import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const component = {
  'personal-info': PersonalInfo,
  // 'favorite-recipes': FavoriteRecipe,
  // 'user-recipe': UserRecipe,
}

const getRoute = computed(() => {
  return route.params.component
})
</script>
