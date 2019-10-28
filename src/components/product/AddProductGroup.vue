<template>
  <div>
    <ProductGroupModal action="add" title="Add New Product" cta="Add Product" />
  </div>
</template>

<script>
import ProductGroupModal from "@/components/product/ProductGroupModal.vue";

export default {
  name: "AddProductGroup",
  components: {
    ProductGroupModal
  },
  methods: {}
};
</script>

<style scoped lang="scss">
</style>
