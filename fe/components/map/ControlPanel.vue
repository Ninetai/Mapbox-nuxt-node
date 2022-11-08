<template>
  <div class="mt-2">
    <div class="px-3 py-2">
      <b-form-checkbox
        v-model="value.showTravelTimes"
        switch
        class="text-uppercase"
        @input="onTravelModeToggled"
      >Tranvel Times</b-form-checkbox>
      <b-form-checkbox
        v-model="value.showRadiusRings"
        switch
        class="text-uppercase"
        @input="onRadiusRingsToggled"
      >Radius Rings</b-form-checkbox>
      <b-form-group class="mt-2">
        <b-form-radio-group
          v-if="value.showTravelTimes"
          :checked="value.travelMode"
          :options="travelModeOptions"
          buttons
          button-variant="outline-primary"
          size="sm"
          @input="onTravelModeChanged"
        ></b-form-radio-group>
      </b-form-group>
      <div class="mt-1">
        <label v-if="locations.length" for="available-sqm" class="text-uppercase">Available {{ locations[0].map.location_unit_name }}</label>
        <vue-slider
          v-model="location_value_range"
          :min="0"
          :max="1000"
        ></vue-slider>
      </div>
    </div>
    
    <b-list-group flush class="mt-2">
      <b-list-group-item
        variant="danger"
        button
        @click="$emit('reset-bounds')"
      >
        <div class="py-3">Reset Map Zoom</div>
      </b-list-group-item>
      <b-list-group-item
        v-for="(location, i) in filteredLocations"
        :key="location.id"
        button
        variant="primary"
        class="d-flex justify-content-between align-items-center text-light"
        :active="selectedLocationId == location.id"
        @click="onListClick(location)"
      >
        <div>
          <div class="h5">{{ location.name }}</div>
          <small>{{ location.map.location_unit_name }}: {{ location.location_value }}</small>
        </div>
        <div class="h1">{{ i + 1 }}</div>
      </b-list-group-item>
    </b-list-group>

    <b-card id="minutes" bg-variant="primary" text-variant="white">
      <b-card-text>
        <div>Drive Time In Minutes</div>
        <b-button-group style="width: 200px;">
          <b-button
            v-for="(option, i) in minuteOptions"
            :key="i"
            size="sm"
            :style="`background-color: ${option.variant}; border-color: ${option.variant};`"
            disabled
          >{{ option.text }}</b-button>
        </b-button-group>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { BIcon, } from 'bootstrap-vue'

export default {
  middleware: 'auth',
  meta: {
    requiresAuth: true
  },
  components: {
    BIcon,
    // VueSlider
  },
  props: {
    travelModeOptions: {
      required: true,
      type: Array
    },
    value: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    loading: false,
    radius: true,
    location_value_range: [1, 1000],
    selectedLocationId: null,
    minuteOptions: [{
      text: '5',
      value: 5,
      variant: '#3c1483'
    }, {
      text: '10',
      value: 10,
      variant: '#532d97'
    }, {
      text: '15',
      value: 15,
      variant: '#9880c3'
    }]
  }),
  computed: {
    ...mapState('location', ['locations']),
    filteredLocations() {
      return this.locations.filter((location) => location.location_value > this.location_value_range[0] && location.location_value < this.location_value_range[1])
    }
  },
  async fetch () {
    this.getLocations(this.$route.params.id)
  },
  methods: {
    ...mapActions('location', ['getLocations']),
    onListClick(location) {
      this.selectedLocationId = location.id
      this.$emit('selected', location)
    },
    onTravelModeChanged(val) {
      this.$nextTick(() => {
        this.$emit('input', { ...this.value, travelMode: val })
        this.$emit('iso-input', val)
      })
    },
    onTravelModeToggled(val) {
      this.$emit('travel-times-toggled', val)
      this.$emit('input', { ...this.value, showTravelTimes: val })
    },
    onRadiusRingsToggled(val) {
      this.$emit('radius-rings-toggled', val)
      this.$emit('input', { ...this.value, showRadiusRings: val })
    }
  }
}
</script>
<style scoped>
.list-group-item-danger {
  color: #ffffff;
  background-color: #d14a59;
}
.list-group-item-danger:hover {
  color: #ffffff;
  background-color: #dd3145;
}
#minutes {
  position: absolute;
  z-index: 2;
  left: 340px;
  bottom: 20px;
}
#minutes .card-body {
  padding: 0.6rem;
}
</style>