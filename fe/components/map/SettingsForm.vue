<template>
  <validation-observer ref="form" v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(onSubmit)">
      <validation-provider
        name="Name"
        rules="required"
        v-slot="validationContext"
      >
        <b-form-group label="Name:" label-for="name">
          <b-form-input
            id="name"
            v-model="settings.title"
            placeholder="Map name"
            @input="CLEAR_ERROR"
            :state="getValidationState(validationContext)"
          />
          <b-form-invalid-feedback>
            {{ validationContext.errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <validation-provider
        name="Description"
        rules="required"
        v-slot="validationContext"
      >
        <b-form-group label="Description:" label-for="description">
          <b-form-textarea
            id="description"
            v-model="settings.description"
            placeholder="Description"
            @input="CLEAR_ERROR"
            :state="getValidationState(validationContext)"
          />
          <b-form-invalid-feedback>
            {{ validationContext.errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <b-form-group label="SEO keywords:" label-for="seo">
        <b-form-tags
          input-id="seo"
          v-model="settings.seo_keywords"
          placeholder="SEO keywords"
        />
      </b-form-group>

      <b-form-group label="URL(Copy)" label-for="url">
        <b-input-group>
          <b-form-input id="url" v-model="settings.url" readonly />
          <b-input-group-append>
            <b-button><b-icon-files></b-icon-files></b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <validation-provider
        name="Map Template"
        rules="required"
        v-slot="validationContext"
      >
        <b-form-group label="Map Template:" label-for="template">
          <b-form-select
            id="template"
            v-model="settings.template_id"
            :options="templates"
            value-field="id"
            text-field="name"
            @input="CLEAR_ERROR"
            :state="getValidationState(validationContext)"
          >
            <template #first>
              <b-form-select-option :value="null" disabled>-- Please select a template --</b-form-select-option>
            </template>
          </b-form-select>
          <b-form-invalid-feedback>
            {{ validationContext.errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>
      
      <b-form-group label="Drivetime Rings">
        <div class="d-flex ml-4 mt-1 align-items-center">
          <label style="width: 120px;">Working</label>
          <b-form-radio-group
            v-model="settings.working_time_ring"
            :options="[{ text: 'On', value: true }, { text: 'Off', value: false }]"
            buttons
            button-variant="outline-primary"
            class="ml-2"
            size="sm"
          ></b-form-radio-group>
        </div>
        <div class="d-flex ml-4 mt-1 align-items-center">
          <label style="width: 120px;">Bicycling</label>
          <b-form-radio-group
            v-model="settings.bicycle_time_ring"
            :options="[{ text: 'On', value: true }, { text: 'Off', value: false }]"
            buttons
            button-variant="outline-primary"
            class="ml-2"
            size="sm"
          ></b-form-radio-group>
        </div>
        <div class="d-flex ml-4 mt-1 align-items-center">
          <label style="width: 120px;">Driving</label>
          <b-form-radio-group
            v-model="settings.drive_time_ring"
            :options="[{ text: 'On', value: true }, { text: 'Off', value: false }]"
            buttons
            button-variant="outline-primary"
            class="ml-2"
            size="sm"
          ></b-form-radio-group>
        </div>
      </b-form-group>

      <b-form-group label="Distance Rings">
        <div class="d-flex ml-4 mt-1">
          <div>
            <b-form-input v-model="settings.distance_ring1" type="range" min="0" max="10" step="0.1" style="width: 300px;"></b-form-input>
            <div class="mt-n2">{{ settings.distance_ring1 }} miles</div>
          </div>
          <b-form-radio-group
            v-model="settings.distance_ring1_on"
            :options="[{ text: 'On', value: true }, { text: 'Off', value: false }]"
            buttons
            button-variant="outline-primary"
            class="ml-2"
            size="sm"
            style="height: 32px;"
          ></b-form-radio-group>
        </div>
        <div class="d-flex ml-4 mt-1">
          <div>
            <b-form-input v-model="settings.distance_ring2" type="range" min="0" max="10" step="0.1" style="width: 300px;"></b-form-input>
            <div class="mt-n2">{{ settings.distance_ring2 }} miles</div>
          </div>
          <b-form-radio-group
            v-model="settings.distance_ring2_on"
            :options="[{ text: 'On', value: true }, { text: 'Off', value: false }]"
            buttons
            button-variant="outline-primary"
            class="ml-2"
            size="sm"
            style="height: 32px;"
          ></b-form-radio-group>
        </div>
        <div class="d-flex ml-4 mt-1">
          <div>
            <b-form-input v-model="settings.distance_ring3" type="range" min="0" max="10" step="0.1" style="width: 300px;"></b-form-input>
            <div class="mt-n2">{{ settings.distance_ring3 }} miles</div>
          </div>
          <b-form-radio-group
            v-model="settings.distance_ring3_on"
            :options="[{ text: 'On', value: true }, { text: 'Off', value: false }]"
            buttons
            button-variant="outline-primary"
            class="ml-2"
            size="sm"
            style="height: 32px;"
          ></b-form-radio-group>
        </div>
      </b-form-group>
      
      <b-form-group
        label="Basemap Selector:"
        label-for="basemap-selector"
        class="d-flex align-items-center"
        label-class="mr-2 mb-1"
      >
        <b-form-checkbox id="basemap-selector" v-model="settings.basemap_selector" switch></b-form-checkbox>
      </b-form-group>

      <b-form-group
        label="Address finder:"
        label-for="address-finder"
        class="d-flex align-items-center"
        label-class="mr-2 mb-1"
      >
        <b-form-checkbox id="address-finder" v-model="settings.address_finder" switch></b-form-checkbox>
      </b-form-group>

      <validation-provider
        name="location_unit_name"
        rules="required"
        v-slot="validationContext"
      >
        <b-form-group label="Location value unit:" label-for="location_unit_name">
          <b-form-input
            id="location_unit_name"
            v-model="settings.location_unit_name"
            placeholder="Location value unit"
            @input="CLEAR_ERROR"
            :state="getValidationState(validationContext)"
          />
          <b-form-invalid-feedback>
            {{ validationContext.errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <div class="text-right">
        <b-button variant="outlined-primary" size="sm" to="/dashboard">Cancel</b-button>
        <b-button type="submit" variant="primary" size="sm" :disabled="loading">Submit</b-button>
      </div>
    </b-form>
  </validation-observer>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { BIcon, BIconFiles } from 'bootstrap-vue'

export default {
  middleware: 'auth',
  meta: {
    requiresAuth: true
  },
  components: {
    BIcon, BIconFiles
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loading: false,
    settings: {
      title: '',
      url: '',
      description: '',
      template_id: null,
      seo: [],
      drive_time_ring: false,
      bicycle_time_ring: false,
      working_time_ring: false,
      distance_ring1: 0,
      distance_ring1_on: false,
      distance_ring2: 0,
      distance_ring2_on: false,
      distance_ring3: 0,
      distance_ring3_on: false,
      address_finder: false,
      basemap_selector: false,
      location_unit_name: ''
    }
  }),
  computed: {
    ...mapState('map', ['templates', 'error'])
  },
  async mounted () {
    this.CLEAR_ERROR()
    this.getMapTemplates()
    if (this.isEdit) {
      try {
        const response = await this.getMap(this.$route.params.id)

        this.settings.title = response.data.map.title
        this.settings.url = `${window.location.origin}/maps/${this.$route.params.id}/preview`
        this.settings.description = response.data.map.description
        this.settings.template_id = response.data.map.template_id
        this.settings.seo_keywords = response.data.map.seo_keywords
        this.settings.drive_time_ring = response.data.map.drive_time_ring
        this.settings.bicycle_time_ring = response.data.map.bicycle_time_ring
        this.settings.working_time_ring = response.data.map.working_time_ring
        this.settings.distance_ring1 = response.data.map.distance_ring1
        this.settings.distance_ring1_on = response.data.map.distance_ring1_on
        this.settings.distance_ring2 = response.data.map.distance_ring2
        this.settings.distance_ring2_on = response.data.map.distance_ring2_on
        this.settings.distance_ring3 = response.data.map.distance_ring3
        this.settings.distance_ring3_on = response.data.map.distance_ring3_on
        this.settings.address_finder = response.data.map.address_finder
        this.settings.basemap_selector = response.data.map.basemap_selector
        this.settings.location_unit_name = response.data.map.location_unit_name
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    ...mapActions('map', ['createMap', 'updateMap', 'getMapTemplates', 'getMap']),
    ...mapMutations('map', ['CLEAR_ERROR']),
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    async onSubmit() {
      this.CLEAR_ERROR()

      try {
        this.loading = true
        let response

        if (this.isEdit) {
          response = await this.updateMap({
            ...this.settings, id: this.$route.params.id
          })
          this.$emit('updated', response.data.map)
        } else {
          response = await this.createMap(this.settings)
          this.$emit('created', response.data.map)
        }

      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
