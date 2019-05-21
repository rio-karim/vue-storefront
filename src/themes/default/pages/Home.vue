<template>
<div id="content" class="Home">
  <div class="container">
    <condition-selector />
    <assessment-resume v-if="getCompletedCount.answered > 0" :completed="getCompletedCount"/>
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
  computed: mapGetters('assessment', ['getCompletedCount'])
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
