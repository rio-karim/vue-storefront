<template>
<div id="content" class="Home">
  <div class="container">
    <condition-selector />
  </div>
</div>
</template>

<script>
import ConditionSelector from '../components/iec/ConditionSelector.vue'
export default {
  components: {
    'condition-selector': ConditionSelector
  },
  created() {}
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
