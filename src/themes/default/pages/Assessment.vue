<template lang="html">
  <div class="container">
    <AssessmentForm/>
  </div>
</template>

<script>
import AssessmentForm from 'theme/components/iec/form/AssessmentForm.vue'
export default {
  components: {
    AssessmentForm
  }
}
</script>

<style lang="scss" scoped>
@import 'theme/css/main.scss';
.container{
  padding:30px;
  display:flex;
  align-items:center;
  justify-content:center;
}
</style>
