<template>
  <div class="mt-4">
    <b-container>
      <h5>Edit map</h5>
      <b-card no-body>
        <b-tabs :value="tab" content-class="mt-3" pills small card>
          <b-tab title="Settings" @click="$router.push({ query: { mode: 'settings' } })">
            <map-settings-form :is-edit="true" />
          </b-tab>
          <b-tab title="Locations" class="pt-2" @click="$router.push({ query: { mode: 'locations' } })">
            <div class="text-right">
              <b-button size="sm" :to="`/maps/${$route.params.id}/locations/create`" class="ml-auto mb-2">
                <b-icon-plus></b-icon-plus>Add location
              </b-button>
            </div>
            <map-locations-table :locations="locations" />
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { BIcon, BIconPlus } from 'bootstrap-vue'
export default {
  middleware: 'auth',
  meta: {
    requiresAuth: true
  },
  components: {
    BIcon,
    BIconPlus
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('location', ['locations']),
    tab() {
      return this.$route.query.mode === 'locations' ? 1 : 0
    }
  },
  mounted() {
    this.getLocations(this.$route.params.id)
  },
  methods: {
    // ...mapActions('map', ['getMap']),
    ...mapActions('location', ['getLocations'])
  }
}
</script>