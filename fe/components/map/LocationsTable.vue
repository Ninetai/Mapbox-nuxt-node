<template>
  <b-table
    v-if="map"
    striped
    hover
    :items="locations"
    :fields="fields"
    class="mt-2"
  >
    <template #cell(actions)="row">
      <!-- <b-button size="sm" variant="outline-danger" class="mr-1" :to="`/maps/${row.item.id}/preview`">
        <b-icon-trash></b-icon-trash>
      </b-button> -->
      <b-button size="sm" class="mr-1" :to="`locations/${row.item.id}/edit`">
        <b-icon-pencil></b-icon-pencil>
      </b-button>
    </template>
  </b-table>
</template>

<script>
import { BIcon, BIconPlus, BIconPencil, BIconTrash } from 'bootstrap-vue'
export default {
  middleware: 'auth',
  meta: {
    requiresAuth: true
  },
  props: {
    locations: {
      type: Array,
      default: () => []
    }
  },
  components: {
    BIcon, BIconPlus, BIconPencil, BIconTrash
  },
  data() {
    return {
      map: null
    }
  },
  computed: {
    fields() {
      return [
        {
          key: 'name',
          label: 'Name',
          sortable: true
        }, {
          key: 'address',
          label: 'Address'
        }, {
          key: 'city',
          label: 'City',
          sortable: true
        }, {
          key: 'state',
          label: 'State',
          sortable: true
        }, {
          key: 'location_value',
          label: this.map?.location_unit_name,
          sortable: true
        }, {
          key: 'latitude',
          label: 'Latitude'
        }, {
          key: 'longitude',
          label: 'Longitude',
          sortable: true
        }, {
          key: 'actions',
          label: 'Actions'
        }
      ]
    }
  },
  mounted() {
    this.$axios.get(`/maps/${this.$route.params.id}`).then((res) => {
      this.map = res.data.map
    })
  },
  methods: {
  }
}
</script>