<template>
  <div>
    <h1>{{ title }}</h1>
    <table v-if="filteredData.length">
      <thead>
      <tr>
        <th v-for="key in columns"
            @click="sortBy(key)"
            :class="{ active: sortKey === key }"
            :key="key">
          {{ capitalize(key) }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
        <th key="update">Update</th>
        <th key="delete">Delete</th>
      </tr>
      </thead>
      <tbody>
        <Row v-for="(entry, i) in filteredData" :key="i"
             :columns="columns"
             :item="entry"
             v-on:updateprod="update"
             v-on:deleteprod="deleteProd"
        />
      </tbody>
    </table>
    <p v-else>No matches found.</p>
  </div>
</template>

<script>
import Row from "./Row.vue";

export default {
  name: 'DemoGrid',
  components: {
    Row
  },
  props: {
    title: String,
    data: Array,
    columns: Array,
    filterKey: String,
    product: Object
  },
  computed: {
    filteredData() {
      const sortKey = this.sortKey
      const filterKey = this.filterKey && this.filterKey.toString().toLowerCase()
      const order = this.sortOrders[sortKey] || 1
      let data = this.data
      if (filterKey) {
        data = data.filter((row) => {
          return Object.keys(row).some((key) => {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort((a, b) => {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  data() {
    return {
      sortKey: '',
      sortOrders: this.columns.reduce((o, key) => ((o[key] = 1), o), {})
    }
  },
  methods: {
    deleteProd: function (item) {
      this.$emit('deleteprod', item);
    },
    update: function (item) {
      this.$emit('updateprod', item);
    },
    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
}
</script>

<style scoped>
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}
th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  user-select: none;
}
td {
  background-color: #f9f9f9;
}
th,
td {
  min-width: 120px;
  padding: 10px 20px;
}
th.active {
  color: #fff;
}
th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}
.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}
.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
