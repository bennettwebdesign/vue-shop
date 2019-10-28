<template>
  <b-modal :id="'modal--product__' + action" :title="title" @ok="onSubmit" :ok-title="cta">
    <div class="row">
      <div class="col-12">
        <b-form class="product--form" @submit="onSubmit">
          <b-form-group id="product--name__group" label="Product Name" label-for="product--name">
            <b-form-input
              id="product--name"
              v-model="product.name"
              type="text"
              required
              placeholder="Enter product name"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="product--category__group"
            label="Product Category"
            label-for="product--category"
          >
            <b-form-input
              id="product--category"
              v-model="product.category"
              type="text"
              required
              placeholder="Add Categories"
            ></b-form-input>
          </b-form-group>
        </b-form>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "ProductGroupModal",
  props: ["action", "title", "cta", "data"],
  data() {
    return {
      product: {
        name: "",
        category: ""
      }
    };
  },
  created() {},
  methods: {
    onSubmit: function() {
      switch (this.action) {
        case "add":
          this.$store.dispatch("ADD_PRODUCT_GROUP", this.product);
          break;
        case "update":
          break;
        default:
          return;
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>
