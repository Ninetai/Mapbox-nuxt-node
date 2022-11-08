<template>
  <validation-observer ref="form" v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(onSubmit)">
      <b-form-group label="Pin:" label-for="pin">
        <b-form-input
          id="pin"
          v-model="form.pin"
          placeholder="Pin"
        />
      </b-form-group>

      <validation-provider
        name="Name"
        rules="required"
        v-slot="validationContext"
      >
        <b-form-group label="Name:" label-for="name">
          <b-form-input
            id="name"
            v-model="form.name"
            placeholder="Location name"
            @input="CLEAR_ERROR"
            :state="getValidationState(validationContext)"
          />
          <b-form-invalid-feedback>
            {{ validationContext.errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <validation-provider
        name="Address"
        rules="required"
        v-slot="validationContext"
      >
        <b-form-group label="Address:" label-for="address">
          <b-form-input
            id="address"
            v-model="form.address"
            placeholder="Address"
            @input="CLEAR_ERROR"
            :state="getValidationState(validationContext)"
          />
          <b-form-invalid-feedback>
            {{ validationContext.errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>
      <b-row>
        <b-col>
          <validation-provider
            name="City"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group label="City:" label-for="city">
              <b-form-input
                id="city"
                v-model="form.city"
                placeholder="City"
                @input="CLEAR_ERROR"
                :state="getValidationState(validationContext)"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col>
          <validation-provider
            name="State"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group label="State:" label-for="state">
              <b-form-input
                id="state"
                v-model="form.state"
                placeholder="State"
                @input="CLEAR_ERROR"
                :state="getValidationState(validationContext)"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
      </b-row>

      <b-form-group label="Description:" label-for="description">
        <b-form-textarea
          id="description"
          v-model="form.description"
          placeholder="Description"
          @input="CLEAR_ERROR"
        />
      </b-form-group>

      <validation-provider
        v-if="map"
        name="Squarefeet"
        rules="required"
        v-slot="validationContext"
      >
        <b-form-group :label="map.location_unit_name" label-for="location_unit_name">
          <b-form-input
            id="location_unit_name"
            type="number"
            v-model="form.location_value"
            :placeholder="map.location_unit_name"
            @input="CLEAR_ERROR"
            :state="getValidationState(validationContext)"
          />
          <b-form-invalid-feedback>
            {{ validationContext.errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>
      <b-row>
        <b-col>
          <validation-provider
            name="Latitude"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group label="Latitude:" label-for="latitude">
              <b-form-input
                id="latitude"
                type="number"
                step="0.00000001"
                v-model="form.latitude"
                placeholder="Latitude"
                @input="CLEAR_ERROR"
                :state="getValidationState(validationContext)"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col>
          <validation-provider
            name="Longitude"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group label="Longitude:" label-for="longitude">
              <b-form-input
                id="longitude"
                type="number"
                step="0.00000001"
                v-model="form.longitude"
                placeholder="Longitude"
                @input="CLEAR_ERROR"
                :state="getValidationState(validationContext)"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
      </b-row>

      <!-- <b-form-file
        v-model="form.file"
        :state="Boolean(form.file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file> -->

      <div class="text-right">
        <b-button variant="outlined-primary" size="sm" @click="$router.go(-1)">Cancel</b-button>
        <b-button type="submit" variant="primary" size="sm" :disabled="loading">Submit</b-button>
      </div>
    </b-form>
  </validation-observer>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  middleware: 'auth',
  meta: {
    requiresAuth: true
  },
  props: {
    locationId: {
      type: Number,
      requred: true
    },
    mapId: {
      type: Number,
      requred: true
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loading: false,
    map: null,
    form: {
      pin: '',
      name: '',
      address: '',
      city: '',
      state: '',
      photo: '',
      pdf: '',
      description: '',
      squarefeet: null,
      latitude: null,
      longitude: null,
      file: null
    }
  }),
  async fetch () {
    this.CLEAR_ERROR()
    let mapId

    if (this.isEdit) {
      this.$axios.get(`/locations/${this.locationId}`).then((res) => {
        this.map = res.data.location.map
      })
    } else {
      this.$axios.get(`/maps/${this.mapId}`).then((res) => {
        this.map = res.data.map
      })
    }

    if (this.isEdit) {
      try {
        const response = await this.getLocation(this.locationId)
        this.form = response.data.location
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    ...mapActions('location', ['createLocation', 'updateLocation', 'getLocation']),
    ...mapActions('map', ['getMap']),
    ...mapMutations('location', ['CLEAR_ERROR']),
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    async onSubmit() {
      this.CLEAR_ERROR()

      try {
        this.loading = true

        if (this.isEdit) {
          const response = await this.updateLocation({ ...this.form, id: this.locationId })
          const { location } = response.data

          this.$router.push(`/maps/${location.map_id}/edit?mode=locations`)
        } else {
          const response = await this.createLocation({
            ...this.form,
            mapId: this.mapId
          })

          this.$router.push(`/maps/${this.mapId}/edit?mode=locations`)
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
