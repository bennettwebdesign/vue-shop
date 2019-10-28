<template>
  <div>
    <div class="container">
      <h1>Product Manager</h1>
      <hr />
      <div class="row products-manager">
        <div class="col-12 col-lg-3">
          <b-button
            v-b-modal.modal--product__add
            variant="outline-success"
            class="d-block products--add mb-3"
          >+ Add Product</b-button>
          <div v-if="products && products.length">
            <input class="form-control mb-3 products--search" placeholder="Search products..." />
            <b-list-group class="products--list">
              <b-list-group-item
                href="#"
                v-for="product in products"
                :key="product.identity"
                @click.prevent.stop="selectProduct(product)"
              >{{ product.data.properties.name }}</b-list-group-item>
            </b-list-group>
          </div>
          <div class="text-left" v-else>
            <span class="text-muted">No products found.</span>
          </div>
        </div>
        <div class="col-12 col-lg-9 text-left">
          <div class="products--current mt-4 mt-lg-0" v-if="currentProduct && currentProduct.data">
            <h3 class="d-flex justify-content-between">
              {{ currentProduct.data.properties.name }}
              <b-button variant="outline-danger" size="sm" @click="selectProduct({})">Close</b-button>
            </h3>
            <div class="row mt-4" v-if="currentProductData && currentProductData.products">
              <div class="col-12 col-md-8">
                <b-list-group>
                  <b-list-group-item
                    href="#"
                    v-for="product in currentProductData.products"
                    :key="product.identity"
                  >{{ product.properties.name }}</b-list-group-item>
                </b-list-group>
              </div>
              <div class="col-12 col-md-4">
                <div class="products--meta">
                  <h4>Category</h4>
                  {{ currentProductData.category.properties.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddProductGroup />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddProductGroup from "@/components/product/AddProductGroup.vue";

export default {
  name: "ProductManager",
  computed: mapState(["products", "currentProduct", "currentProductData"]),
  created() {
    this.$store.dispatch("LOAD_PRODUCTS");
  },
  methods: {
    selectProduct: function(product) {
      this.$store.commit("SET_CURRENT_PRODUCT", product);
      this.$store.dispatch("GET_CURRENT_PRODUCT");
    }
  },
  components: {
    AddProductGroup
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.products-manager {
  .products--add {
    width: 100%;
    font-weight: 600;
  }
  .products--list {
    text-align: left;
  }
  .products--current {
    border: 1px solid #eee;
    padding: 20px 25px;
    border-radius: 0.25rem;
    -webkit-box-shadow: 10px 10px 30px 0 rgba(0, 0, 0, 0.08);
    box-shadow: 10px 10px 30px 0 rgba(0, 0, 0, 0.08);
    .products--meta {
      border: 1px solid rgba(0, 0, 0, 0.125);
      padding: 10px 15px;
      border-radius: 0.25rem;
      font-size: 0.9rem;
      h4 {
        font-size: 1rem;
      }
    }
  }
}
</style>
