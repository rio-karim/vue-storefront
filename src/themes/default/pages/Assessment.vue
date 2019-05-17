<template lang="html">
  <div id="content" class="Assessment">
    <AssessmentForm/>
  </div>
</template>

<script>
import AssessmentForm from 'theme/components/iec/form/AssessmentForm.vue'
export default {
  components: {
    AssessmentForm
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
    z-index: 2000;
    width: unset;
    max-width: unset;
}
</style>
