<template>
  <div class="mt-4">
    <b-container>
      <h5>Create a new map</h5>
      <b-card no-body>
        <b-tabs content-class="mt-3" pills small card>
          <b-tab title="Settings" active>
            <map-settings-form @created="onCreated" />
          </b-tab>
          <b-tab title="Locations" disabled>
            <map-locations-table />
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  meta: {
    requiresAuth: true
  },
  data() {
    return {
    }
  },
  methods: {
    onCreated(map) {
      this.$router.push(`/maps/${map.id}/edit`)
    }
  }
}
</script>