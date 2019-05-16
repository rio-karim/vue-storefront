<template lang="html">
  <div id="content" class="Assessment">
    <AssessmentForm/>
  </div>
</template>

<script>
import AssessmentForm from 'theme/components/iec/form/AssessmentForm.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    AssessmentForm
  },
  computed: {
    ...mapGetters('category', ['getCategories']),
    categories () {
      return this.getCategories.filter((op) => {
        return op.level === (this.$store.state.config.entities.category.categoriesDynamicPrefetchLevel ? this.$store.state.config.entities.category.categoriesDynamicPrefetchLevel : 2) // display only the root level (level =1 => Default Category), categoriesDynamicPrefetchLevel = 2 by default
      })
    },
    visibleCategories () {
      return this.categories.filter(category => {
        return category.product_count > 0 || category.children_count > 0
      })
    }
  },
  mounted: function () {
    console.log(this.visibleCategories)
  }
}
</script>

<style lang="scss" scoped>
@import 'theme/css/main.scss';
.Assessment{
  position:fixed;
  top:54px;
  bottom:0;
  left:0;
  right:0;
  display:flex;
  z-index:2000;
  width:unset;
  max-width:unset;
}
</style>
