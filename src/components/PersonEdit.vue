<template>
  <div>
    <div class="info">
        <h2> Fill the form </h2>
        <label> First Name <input type="text" v-model="firstName" /></label><br><br>
        <label> Last Name <input type="text" v-model="lastName" /></label>
        <br><br>
        <div>Position</div>
        <label><input type="radio" value="student" v-model="position"> Student </label>
        <br>
        <label><input type="radio" value="postgraduate" v-model="position"> Postgraduate </label>
        <br>
        <label> <input type="radio" value="lecturer" v-model="position"> Lecturer </label>
        <br><br>
        <input type="checkbox" id="isActive" v-model="active">
        <label for="isActive">Active</label>
    </div>

    <div class="info">
        <h2> Information about Person </h2>
        <p>Name: {{firstName}} {{lastName}} </p>
        <p>Position: {{position}} </p>
        <p>Status: <span v-if="active">Active</span>
        <span v-else>Inactive</span> </p>
    </div>
 </div>
</template>

<script>
  export default {
    name: 'person-edit',
    data () {
        return {
        firstName: '',
        lastName: '',
        position: '',
        active: false
        }
    }
  }
</script>

<style>
  .info {
      border: 4px solid blue;
      margin: 15px;
      padding: 15px;
      width: 300px;
  }
</style>
