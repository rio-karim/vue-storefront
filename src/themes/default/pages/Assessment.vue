<template lang="html">
  <div id="content" class="Assessment">
    <AssessmentForm :nodeList="sessionAssessment"/>
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
    ...mapGetters('assessment', ['getAssessment']),
    sessionAssessment: function () {
      return this.getAssessment
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'theme/css/main.scss';
.Assessment {
    position: fixed;
    top: 54px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    z-index: 2;
    width: unset;
    max-width: unset;
}
</style>
