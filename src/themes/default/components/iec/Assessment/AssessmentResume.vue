<template lang="html">

  <router-link
    class="AssessmentResume"
    to="/assessment"
    exact>

    <div class="AssessmentResume__progress">
      <span :style="`width:${(completed.answered/completed.length)*100}%;`" class="AssessmentResume__progress-bar"></span>
      <span class="AssessmentResume__progress-text">Continue Assessment</span>
    </div>
    <div class="AssessmentResume__icon">
      <span>ED</span>
    </div>

  </router-link>
</template>

<script>
export default {
  props: {
    completed: {
      type: Object,
      default: () => {}
    },
  },
}
</script>
<style lang="scss" scoped>
@import 'theme/css/main.scss';
.AssessmentResume{
  border-radius: 50px;
  background-color: #000C00;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  height: 40px;
  position:absolute;
  top:85px;
  right:25px;
  width:200px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
  &__progress{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    width:100%;
    border-radius: 50px;
    z-index:1;
    background:transparent;
    overflow:hidden;
    display:flex;
    align-items: center;
    justify-content: center;
    &-bar{
      position:absolute;
      top:0;
      bottom:0;
      left:0;
      z-index:1;
      background:#CC7685;
    }
    &-text{
      color: white;
      z-index:2;
    }
  }
  &__icon{
    color: #CC7685;
    border-radius: 50%;
    font-size: 10px;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.6);
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    position:absolute;
    padding: 5px;
    top:-10px;
    left:-10px;
    z-index:2;

  }
}
</style>
