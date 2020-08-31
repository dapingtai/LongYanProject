<template>
  <b-col sm="6">
    <b-form-select v-model="selectedIndex">
      <option v-for="(x, i) in options" :value="i" :key="i">
        {{ x }}
      </option>
    </b-form-select>
  </b-col>
</template>

<script>

let selectedIndex = {
  get: function() {
    return this.value;
  },
  set: function(v) {
    this.$emit('input', v)
  }
}

export default {
  name: 'MySelect',
  props: [
    'value',
    'options'
  ],
  computed: {
    selectedIndex,
  }
}
</script>
