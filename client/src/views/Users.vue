<template>
  <div class="catalogue">
    <h1>Users</h1>
    <!-- {{messages}} -->
    <hr>
    <div class="list-unstyled" v-for="message in messages" :key="message._id">
        <li class="media">
            <img v-if="message.picture" class="mr-3" width="200" height="200"
            :src="message.picture" :alt="message.name">
            <div class="media-body">
                <h4 class="mt-0 mb-1">User: {{ message.name }}</h4>
                <h5 class="mt-0 mb-1">Status: {{ message.status }}</h5>
                <button type="button" class="btn btn-success">Edit</button>
                <button type="button" class="btn btn-info">Info</button>
                <button type="button" class="btn btn-danger">Remove</button>
            </div>
        </li>
        <hr>
    </div>
  </div>
</template>

<script>

const API_URL = 'http://localhost:4000/api/users';

export default {
  name: 'Users',
  data: () => ({
    error: '',
    messages: [],
    size: 'height:200px;width:200px;',
  }),

  mounted() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      fetch(API_URL)
        .then((response) => response.json())
        .then((result) => {
          this.messages = result;
        });
    },
  },
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
