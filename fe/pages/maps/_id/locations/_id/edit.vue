<template>
  <div class="mt-4">
    <b-container>
      <h5>Edit Location</h5>
      <location-form :location-id="+$route.params.id" :is-edit="true" />
    </b-container>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  meta: {
    requiresAuth: true
  }
}
</script>