<template>
  <div id="app">
    <PopupEdit :show="showModal" :prod="prod" v-on:closemodal="closeModal" @keyup.enter="closeModal"></PopupEdit>
    <DemoGrid :data="gridData"
              :columns="gridColumns"
              :filter-key="searchQuery"/>
    <br/>
    <button class="btn" id="create" v-on:click="showCreate">Create</button>
  </div>
</template>

<script>
import DemoGrid from './components/Grid.vue'
import PopupEdit from './components/PopupEdit.vue'
import PersonEdit from './components/PersonEdit.vue'

export default {
  name: 'app',
  components: {
    DemoGrid,
    PopupEdit,
    PersonEdit
  },
  data: function () {
    return {
      message: 'Welcome to Vue.js',
      products: [],
      showModal: false,
      prod: {
        productName: '',
        description: ''
      },
      searchQuery: '',
      gridColumns: ['id', 'group_id', 'product_name', 'description'],
      gridData: [
        {id: 'Chuck Norris', group_id: Infinity, product_name: 'kar', description: 'far'},
        {id: 'Bruce Lee', group_id: 9000, product_name: 'kar', description: 'far'},
        {id: 'Jackie Chan', group_id: 7000, product_name: 'kar', description: 'far'},
        {id: 'Jet Li', group_id: 8000, product_name: 'kar', description: 'far'}
      ]
    };
  },
  created() {
    const groupId = 3;
    /*const prods = getProducts(groupId).then(r => {
      this.products = r;
      console.log('products', r)
    });*/
    this.prods = []
  },
  methods: {
    closeModal: function () {
      this.showModal = false;
    },
    showCreate: function () {
      this.showModal = true;
      this.prod = {
        productName: '',
        description: ''
      }
    },
    updateProduct: function (p) {
      this.prod = p;
      this.showModal = true;
    }
  }
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
  padding-left: 20px;
}
.btn {
  border-radius: 3px;
  color: white;
  transition-duration: 0.4s;
  padding: 15px 32px;
  text-align: center;
}
.btn:hover {
  background-color: white;
}
#create {
  background-color: #42b983;
  border: 2px solid #42b983;
}
#create:hover {
  background-color: white;
  color: #42b983;
}
#delete {
  background-color: #b94242;
  border: 2px solid #b94242;
}
#delete:hover {
  background-color: white;
  color: #b94242;
}
#update {
  background-color: #4256b9;
  border: 2px solid #4256b9;
}
#update:hover {
  background-color: white;
  color: #4256b9;
}
</style>