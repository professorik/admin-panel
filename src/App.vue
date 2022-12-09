<template>
  <div id="app">
    <PopupEditProd
        :show="showProdModal"
        :prod="prod"
        :isCreate="isProdCreate"
        :groups="groups"
        v-on:closemodal="closeModal"
        v-on:updateprod="updateProduct"
        v-on:createprod="createProduct"
        @keyup.enter="closeModal"
    />
    <Grid
        :data="products"
        :columns="prodGridColumns"
        :filter-key="searchQuery"
        title="Products"
        v-on:updateprod="updateProductPopup"
        v-on:deleteprod="deleteProduct"
    />
    <br/>
    <button class="btn" id="create-prod" v-on:click="showCreateProd">Create</button>
    <PopupEditGroup
        :show="showGroupModal"
        :group="group"
        :isCreate="isGroupCreate"
        v-on:closemodal="closeModal"
        v-on:updategroup="updateGroup"
        v-on:creategroup="createGroup"
        @keyup.enter="closeModal"
    />
    <Grid
        :data="groups"
        :columns="groupGridColumns"
        :filter-key="searchQuery"
        title="Groups"
        v-on:updateprod="updateGroupPopup"
        v-on:deleteprod="deleteGroup"
    />
    <br/>
    <button class="btn" id="create-group" v-on:click="showCreateGroup">Create</button>
  </div>
</template>

<script>
import Grid from './components/Grid.vue'
import PopupEditProd from './components/PopupEditProd.vue'
import PopupEditGroup from './components/PopupEditGroup.vue'
import * as api from './api.js'

export default {
  name: 'app',
  components: {
    Grid,
    PopupEditProd,
    PopupEditGroup,
  },
  data: function () {
    return {
      products: [],
      showProdModal: false,
      showGroupModal: false,
      isProdCreate: false,
      isGroupCreate: false,
      prod: {
        product_name: '',
        description: ''
      },
      group: {
        name: '',
      },
      searchQuery: '',
      prodGridColumns: ['id', 'group_name', 'product_name', 'description'],
      groupGridColumns: ['id', 'name'],
      groups: []
    };
  },
  created() {
    api.getGroups().then(r => {
      this.groups = r
      api.getProducts(this.groups).then(r => this.products = r)
    })
  },
  methods: {
    closeModal: function () {
      this.showProdModal = this.showGroupModal = false;
    },
    showCreateProd: function () {
      this.showProdModal = true;
      this.prod = {
        product_name: '',
        description: ''
      }
      this.isProdCreate = true
    },
    updateProductPopup: function (p) {
      this.prod = p;
      this.showProdModal = true;
      this.isProdCreate = false
    },
    showCreateGroup: function () {
      this.showGroupModal = true;
      this.group = {
        name: '',
      }
      this.isGroupCreate = true
    },
    updateGroupPopup: function (p) {
      this.group = p;
      this.showGroupModal = true;
      this.isGroupCreate = false
    },
    createProduct: function (p) {
      api.postProduct(p).then(() => {
        api.getProducts(this.groups).then(r => this.products = r)
      })
    },
    updateProduct: function (p) {
      api.patchProduct(p).then(() => {
        api.getProducts(this.groups).then(r => this.products = r)
      })
    },
    deleteProduct: function (p) {
      /*api.deleteProduct(p).then(() => {
        api.getProducts(this.groups).then(r => this.products = r)
      })*/
      const i = this.products.indexOf(p)
      if (i > -1)
        this.products.splice(i, 1)
    },
    createGroup: function (g) {
      api.postGroup(g).then(() => {
        api.getGroups().then(r => this.groups = r)
      })
    },
    updateGroup: function (g) {
      api.putGroup(g).then(() => {
        api.getGroups().then(r => {
          this.groups = r
          api.getProducts(this.groups).then(r => this.products = r)
        })
      })
    },
    deleteGroup: function (g) {
      /*api.deleteGroup(g.id).then(() => {
        api.getGroups().then(r => {
          this.groups = r
          api.getProducts(this.groups).then(r => this.products = r)
        })
      })*/
      const i = this.groups.indexOf(g)
      if (i > -1)
        this.groups.splice(i, 1)
    }
  }
}
</script>

<style>
body{
  margin: 0 0 10px;
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
#create-prod,#create-group {
  background-color: #42b983;
  border: 2px solid #42b983;
}
#create-prod:hover,#create-group:hover {
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
#create-prod:disabled,#create-group:disabled {
  background-color: #3b3b3b;
  border: 2px solid #3b3b3b;
  color: gray;
}
</style>