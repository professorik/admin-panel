<template>
  <div class="b-popup" v-show="show">
    <div class="b-popup-content">
      <button id="close" v-on:click="exit"> X </button>
      <h2> Edit product </h2>
      <label> Product Name <input type="text" v-model="prod.productName" /></label><br><br>
      <label> Description <textarea v-model="prod.description" /></label>
      <div class="buttons">
        <button class="btn" id="create" v-on:click="update"> Save </button>
        <button class="btn" id="delete" v-on:click="exit"> Exit </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupEdit',
  props: {
    show: Boolean,
    prod: Object
  },
  data: function(){
    return {
      productName: '',
      description: '',
    }
  },
  created() {
    let tmp = this
    document.addEventListener('keyup', function (evt) {
      if (evt.key === "Escape") {
        tmp.exit()
      }
    });
  },
  methods:{
    update: function() {
      if (!this.prod.id) {  // if there is no Id, we create a new prod
        this.prod.groupId = 3;
        //postProduct(this.prod);
      } else {              // otherwise we update existing one
        // TODO: updateProd(this.prod);
      }
      this.exit();
    },
    exit: function() {
      this.$emit('closemodal');
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.b-popup{
  width: 100%;
  min-height: 100%;
  background-color: rgba(0,0,0,0.5);
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
}
.b-popup .b-popup-content{
  width: 500px;
  height: 300px;
  padding: 10px;
  background-color: #c5c5c5;
  border-radius: 5px;
  box-shadow: 0 0 10px #000;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.b-popup .b-popup-content #close{
  margin-left: 95%;
  color: white;
  background-color: red;
}
.b-popup .b-popup-content #close:hover{
  background-color: #630000;
}
</style>
