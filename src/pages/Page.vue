<template>
  <q-page>
    <div class="q-ma-lg">
      <h1>{{ currentPage.title }}</h1>
      <h3>Code:</h3>
      <p>{{ currentPage.code }}</p>
      <h3>Instructions:</h3>
      <p>{{ currentPage.instructions }}</p>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageView',
  computed: {
    ...mapGetters('chapters', [
      'currentPage'
    ])
  }
}
</script>
