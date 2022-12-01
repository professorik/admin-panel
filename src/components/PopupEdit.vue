<template>
  <div class="b-popup" v-show="show">
    <div class="b-popup-content">
      <button id="close" v-on:click="exit"> X</button>
      <h2> {{ title }} product </h2>

      <label class="label">Product Name</label><br/>
      <input name="name" v-model="prod.product_name" class="input" type="text"
             placeholder="Product Name" v-bind:class="{error: isNameInvalid}" />

      <label class="label">Description</label><br/>
      <textarea class="textarea" placeholder="Textarea" v-model="prod.description"
                v-bind:class="{error: isDescInvalid}"/>

      <label class="label">Group</label>
      <select v-model="prod.groupId" v-bind:class="{error: isGroupInvalid}">
        <option disabled value="">Nothing selected</option>
        <option v-for="option in groups" v-bind:value="option.id">
          {{ option.name }}
        </option>
      </select>

      <div class="buttons">
        <button class="btn" id="create" v-on:click="update" :disabled="isGroupInvalid||isNameInvalid||isDescInvalid"> Save</button>
        <button class="btn" id="delete" v-on:click="exit"> Exit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupEdit',
  props: {
    title: String,
    groups: Array,
    show: Boolean,
    prod: Object
  },
  created() {
    let tmp = this
    document.addEventListener('keyup', function (evt) {
      if (evt.key === "Escape") {
        tmp.exit()
      }
    });
  },
  computed: {
    isNameInvalid() {
      return this.prod.product_name.length < 3
    },
    isDescInvalid() {
      return this.prod.description.length < 3
    },
    isGroupInvalid() {
      return !this.prod.groupId
    }
  },
  methods: {
    update: function () {
      if (!this.prod.id) {  // if there is no Id, we create a new prod
        this.prod.groupId = 3;
        //postProduct(this.prod);
      } else {              // otherwise we update existing one
        // TODO: updateProd(this.prod);
      }
      this.exit();
    },
    exit: function () {
      this.$emit('closemodal');
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.b-popup {
  width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
}
.b-popup .b-popup-content {
  width: 500px;
  height: 370px;
  padding: 10px;
  background-color: #c5c5c5;
  border-radius: 5px;
  box-shadow: 0 0 10px #000;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.b-popup .b-popup-content #close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  background-color: red;
}
.b-popup .b-popup-content #close:hover {
  background-color: #630000;
}


input[type=text], select, textarea {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border-radius: 4px;
  box-sizing: border-box;
}
textarea {
  height: 60px;
  resize: none;
}
.error {
  border: 1px solid red;
}

</style>
