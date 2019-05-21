<template>
<div id="content" class="Home">
  <div class="container">
    <condition-selector />
    <assessment-resume v-if="assessment.length" :nodeList="assessment"/>
  </div>
</div>
</template>

<script>
import AssessmentSelector from '../components/iec/AssessmentSelector.vue'
import AssessmentResume from 'theme/components/iec/Assessment/AssessmentResume.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    'condition-selector': AssessmentSelector,
    'assessment-resume': AssessmentResume
  },
  computed: mapGetters('assessment', ['getAssessment']),
  methods: {
    ...mapActions('assessment', ['fetchAssessment']),
    sessionAssessment: function () {
      if(!this.getAssessment.length){
        return this.fetchAssessment().then((res) => {
          this.assessment = res
        })
      }
      else{
        this.assessment = this.getAssessment
      }
    }
  },
  beforeMount: function () {
    this.sessionAssessment()
  },
  data: function() {
    return {
      assessment: {}
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
