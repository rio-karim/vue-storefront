<template>
<div id="content" class="Home">
  <div class="container">
    <condition-selector />
  </div>
</div>
</template>

<script>
import ConditionSelector from '../components/iec/ConditionSelector.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    'condition-selector': ConditionSelector
  },
  computed: {
    ...mapGetters('assessment', ['getAssessment']),
    sessionAssessment: function () {
      if(!this.getAssessment.length) {
        this.fetchAssessment()
      }
      console.log(this.getAssessment)
      return this.getAssessment
    }
  },
  methods: mapActions('assessment', ['fetchAssessment']),
}
</script>

<style lang="scss" scoped>
@import 'theme/css/main.scss';
.Home {
    background: $color-primary;

    .container {
        height: calc(100vh - 54px);
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
