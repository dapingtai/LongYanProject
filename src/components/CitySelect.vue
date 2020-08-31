<template>
  <div>
    <b-form-group
        label-cols-sm="3"
        label="縣市區域:"
        label-align-sm="right"
        label-for="nested-state"
    >
      <MySelect id="town-select" v-model="townIndex" :options="towns" />
      <MySelect id="area-select" v-model="areaIndex" :options="areas" />
    </b-form-group>

    <b-form-group
        label-cols-sm="3"
        label="郵遞區號:"
        label-align-sm="right"
        label-for="nested-state"
    >
      <b-form-input class="text-center" v-model="zip" id="nested-city" disabled></b-form-input>
    </b-form-group>

  </div>
</template>

<script>
import MySelect from './MySelect.vue';
import cities from '../../models/cities';

let towns = function () {
  return cities.map(
    (record) => {
      return record.name
    }
  )
}

let areas = function() {
  return cities[this.townIndex].areas.map(x => x.name)
}

let zip = function() {
  return cities[this.townIndex].areas[this.areaIndex].zip
}

let townIndex = function() {
  this.areaIndex = 0
}


export default {
  name: "CitySelect",

  components: {
    MySelect
  },

  data: () => ({
    townIndex: 0,
    areaIndex: 0,
  }),

  computed: {
    towns,
    areas,
    zip,
  },

  watch: {
    townIndex,
    zip
  }
}

</script>
