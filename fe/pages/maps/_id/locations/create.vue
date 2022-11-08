<template>
  <div class="mt-4">
    <b-container>
      <h5>Create Location</h5>
      <location-form :map-id="+$route.params.id" />
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