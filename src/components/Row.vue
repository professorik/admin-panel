<template>
  <tr>
    <td v-for="key in columns" :key="key">
      {{ item[key] }}
    </td>
    <td>
      <button class="btn" id="update" v-on:click="update">Update</button>
    </td>
    <td>
      <button class="btn" id="delete" v-on:click="deleteProd">Delete</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "Row",
  props: {
    columns: Array,
    item: Object
  },
  methods: {
    deleteProd: function () {
      this.$emit('deleteprod', this.item);
    },
    update: function () {
      this.$emit('updateprod', this.item);
    },
  },
}
</script>

<style scoped>
td {
  background-color: #f9f9f9;
  min-width: 120px;
  padding: 10px 20px;
  text-align: center;
}
</style>