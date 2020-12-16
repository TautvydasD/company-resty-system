<template>
  <div class="catalogue">
    <h1>Shop list</h1>
    <!-- {{messages}} -->
    <hr>
    <div class="list-unstyled" v-for="message in messages" :key="message._id">
        <li class="media">
            <img v-if="message.picture" class="mr-3" width="200" height="200"
            :src="message.picture" :alt="message.name">
            <div class="media-body">
                <h4 class="mt-0 mb-1">Product: {{ message.name }}</h4>
                <h5 class="mt-0 mb-1">Price: {{ message.price }}</h5>
                <br/>
                <small>Amount: {{ message.amount }}</small>
                <br/>
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

const API_URL = 'http://localhost:4000/api/products';

export default {
  name: 'Catalogue',
  data: () => ({
    error: '',
    messages: [],
    size: 'height:200px;width:200px;',
  }),

  mounted() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => {
        this.messages = result;
      });
  },
  methods: {},
};
</script>
