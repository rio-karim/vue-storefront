<template>
<div id="content" class="Home">
  <div class="container">
    <condition-selector />
    <assessment-resume v-if="assessmentStats && assessmentStats.answered > 0" :completed="assessmentStats"/>
  </div>
</div>
</template>

<script>
import AssessmentSelector from 'theme/components/iec/AssessmentSelector.vue'
import AssessmentResume from 'theme/components/iec/Assessment/AssessmentResume.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    'condition-selector': AssessmentSelector,
    'assessment-resume': AssessmentResume
  },
  methods: mapGetters('assessment', ['getAssessmentStats']),
  mounted: function () {
    this.assessmentStats = this.getAssessmentStats()
  },
  data: function () {
    return {
        assessmentStats: null
    }
  }
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
