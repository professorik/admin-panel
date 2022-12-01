<template>
  <div id="app">
    <PopupEdit
        :show="showModal"
        :prod="prod"
        :title="title"
        :groups="shit"
        v-on:closemodal="closeModal"
        @keyup.enter="closeModal"
    />
    <DemoGrid
        :data="gridData"
        :columns="gridColumns"
        :filter-key="searchQuery"
        v-on:updateprod="updateProduct"
        v-on:deleteprod="deleteProduct"
    />
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
      products: [],
      showModal: false,
      title: 'Edit',
      prod: {
        product_name: '',
        description: ''
      },
      searchQuery: '',
      gridColumns: ['id', 'group_name', 'product_name', 'description'],
      gridData: [
        {id: 'Chuck Norris', group_name: Infinity, product_name: 'kar1', description: 'far1'},
        {id: 'Bruce Lee', group_name: 9000, product_name: 'kar2', description: 'far2'},
        {id: 'Jackie Chan', group_name: 7000, product_name: 'kar3', description: 'far3'},
        {id: 'Jet Li', group_name: 8000, product_name: 'kar4', description: 'far4'}
      ],
      shit: [
        {name: "hello", id: 1},
        {name: "my", id: 2},
        {name: "name", id: 3},
        {name: "is", id: 4},
        {name: "Slim Shady", id: 5}
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
        product_name: '',
        description: ''
      }
      this.title = 'Create'
    },
    updateProduct: function (p) {
      this.prod = p;
      this.showModal = true;
      this.title = 'Edit'
    },
    deleteProduct: function (p) {
      const i = this.gridData.indexOf(p)
      if (i > -1)
        this.gridData.splice(i, 1)
      console.log("deleted", p)
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
#create:disabled {
  background-color: #3b3b3b;
  border: 2px solid #3b3b3b;
  color: gray;
}
</style>