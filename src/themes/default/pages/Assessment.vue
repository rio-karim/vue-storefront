<template lang="html">
  <div :class="{ ready: assessment }" id="content" class="Assessment">
    <assessment-form v-if="assessment.length" :nodeList="assessment"/>
  </div>
</template>

<script>
import AssessmentForm from 'theme/components/iec/Assessment/AssessmentForm.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    'assessment-form': AssessmentForm
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
  data: function () {
    return {
      assessment: { }
    }
  }
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
    opacity:0;
    transition:opacity 1s ease-in-out;
    &.ready{
      opacity:1;
    }
}
@keyframes slide_in {
  from: { margin-left: 300px; }
  to: { margin-left: 0px; }
}
</style>
