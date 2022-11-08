<template>
  <div class="d-flex justify-content-center align-center mt-5">
    <div>
      <Logo />
      <h1 class="title">
        Home Page
      </h1>
      <b-alert show>
        You are authenticated as User
      </b-alert>
    </div>
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
