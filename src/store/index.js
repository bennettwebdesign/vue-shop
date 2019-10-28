import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const neo4j = require("neo4j-driver").v1;
const neo4jDriver = neo4j.driver(
  "http://localhost:7474",
  neo4j.auth.basic("neo4j", "123")
);
const db = neo4jDriver.session();

export default new Vuex.Store({
  state: {
    products: [],
    currentProduct: {},
    currentProductData: {},
    addProduct: {}
  },
  mutations: {
    SET_PRODUCTS: (state, products) => {
      if (products && products.length) {
        state.products = products.map(product => {
          return {
            data: product.get("product"),
            category: product.get("category")
          };
        });
      }
    },
    SET_CURRENT_PRODUCT: (state, product) => {
      state.currentProduct = product;
    },
    SET_CURRENT_PRODUCT_DATA: (state, products) => {
      state.currentProductData = {};
      if (products && products.length) {
        state.currentProductData.category = state.currentProduct.category;
        state.currentProductData.products = products.map(product => {
          return product.get("product");
        });
      }
    },
    ADD_PRODUCT_GROUP: (state, product) => {
      state.addProduct = product;
    }
  },
  actions: {
    LOAD_PRODUCTS: ({ commit }) => {
      const query =
        "MATCH (product:ProductGroup) " +
        "MATCH (category:Category)-[:HAS_PRODUCT_GROUP]->(productGroup) " +
        "RETURN category, product";

      const result = db.run(query);
      result.then(result => {
        db.close();
        commit("SET_PRODUCTS", result && result.records ? result.records : []);
        neo4jDriver.close();
      });
    },
    GET_CURRENT_PRODUCT: ({ commit, state }) => {
      if (state.currentProduct.data && state.currentProduct.data.identity) {
        const query =
          "MATCH (productGroup) WHERE id(productGroup) = {productId} " +
          "MATCH (productGroup)-[:HAS_PRODUCT]->(product) " +
          "RETURN product";

        const result = db.run(query, {
          productId: state.currentProduct.data.identity
        });

        result.then(result => {
          db.close();
          commit(
            "SET_CURRENT_PRODUCT_DATA",
            result && result.records ? result.records : []
          );
          neo4jDriver.close();
        });
      }
    },
    ADD_PRODUCT_GROUP: ({ commit }, product) => {
      commit("ADD_PRODUCT_GROUP", product);
      console.log(product);
    }
  },
  modules: {}
});
