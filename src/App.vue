<template>
  <div id="app">
    <PopupEdit
        :show="showModal"
        :prod="prod"
        :isCreate="isCreate"
        :groups="groups"
        v-on:closemodal="closeModal"
        v-on:updateprod="updateProduct"
        v-on:createprod="createProduct"
        @keyup.enter="closeModal"
    />
    <Grid
        :data="products"
        :columns="gridColumns"
        :filter-key="searchQuery"
        title="Products"
        v-on:updateprod="updateProductPopup"
        v-on:deleteprod="deleteProduct"
    />
    <br/>
    <button class="btn" id="create" v-on:click="showCreate">Create</button>
  </div>
</template>

<script>
import Grid from './components/Grid.vue'
import PopupEdit from './components/PopupEdit.vue'
import Vue from "vue";
import * as api from './api.js'

export default {
  name: 'app',
  components: {
    Grid,
    PopupEdit
  },
  data: function () {
    return {
      products: [],
      showModal: false,
      isCreate: false,
      prod: {
        product_name: '',
        description: ''
      },
      searchQuery: '',
      gridColumns: ['id', 'group_name', 'product_name', 'description'],
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
      this.showModal = false;
    },
    showCreate: function () {
      this.showModal = true;
      this.prod = {
        product_name: '',
        description: ''
      }
      this.isCreate = true
    },
    updateProductPopup: function (p) {
      this.prod = p;
      this.showModal = true;
      this.isCreate = false
    },
    createProduct: function (p) {
      /*api.postProduct(p).then(() => {
        api.getGroups().then(r => {
          this.groups = r
          api.getProducts(this.groups).then(r => this.products = r)
        })
      })*/
      const crypto = require('crypto')
      p.group_name = this.groups[p.groupId].name
      p.id = crypto.createHash('sha1').update(p.groupId + p.name + p.description).digest('hex')
      this.products.push(p)
    },
    updateProduct: function (p) {
      /*api.patchProduct(p).then(() => {
        api.getGroups().then(r => {
          this.groups = r
          api.getProducts(this.groups).then(r => this.products = r)
        })
      })*/
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === p.id) {
          Vue.set(this.products, i, p)
        }
      }
    },
    deleteProduct: function (p) {
      /*api.deleteProduct(p).then(() => {
        api.getGroups().then(r => {
          this.groups = r
          api.getProducts(this.groups).then(r => this.products = r)
        })
      })*/
      const i = this.products.indexOf(p)
      if (i > -1)
        this.products.splice(i, 1)
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