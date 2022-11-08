<template>
  <div class="mt-4">
    <b-container>
      <b-card>
        <template #header>
          <div class="d-flex justify-content-between">
            <h5>My Maps</h5>
            <b-button size="sm" to="/maps/create"><b-icon-plus></b-icon-plus>Add new</b-button>
          </div>
        </template>
        <b-table
          striped
          hover
          :items="maps"
          :fields="fields"
          class="mt-2"
        >
          <template #cell(actions)="row">
            <b-button size="sm" variant="outline-secondary" class="mr-1" :to="`/maps/${row.item.id}/preview`">
              <b-icon-eye></b-icon-eye>
            </b-button>
            <b-button size="sm" class="mr-1" :to="`/maps/${row.item.id}/edit?mode=settings`">
              <b-icon-pencil></b-icon-pencil>
            </b-button>
          </template>
        </b-table>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { BIcon, BIconPlus, BIconPencil, BIconEye } from 'bootstrap-vue'
export default {
  middleware: 'auth',
  meta: {
    requiresAuth: true
  },
  components: {
    BIcon, BIconPlus, BIconPencil, BIconEye
  },
  data() {
    return {
      fields: [
        {
          key: 'title',
          label: 'Title',
          sortable: true
        }, {
          key: 'description',
          label: 'Description'
        }, {
          key: 'updatedAt',
          label: 'Last Modified',
          sortable: true
        }, {
          key: 'actions',
          label: 'Actions'
        }
      ],
      users: []
    }
  },
  computed: {
    ...mapState('map', ['maps'])
  },
  async fetch() {
    try {
      const response = await this.getMaps()
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    ...mapActions('map', ['getMaps'])
  }
}
</script>