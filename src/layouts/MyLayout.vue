<template>
  <q-layout view="hHh lpR fff">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          Arduino Teacher&#8482;
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
