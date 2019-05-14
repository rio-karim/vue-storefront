<template>
  <div :class="{ 'active': isActive, 'form-question-container': node.parentId && node.parentOption, 'form-question': !node.parentId && !node.parentOption }">
    <div v-if="!node.parentId && !node.parentOption" class="form-question-container sub-active">
      <div class="form-question-container__wrapper">
        <label class="form-question__label">{{ node.text }}</label>
        <div v-if="node.type === 'input'" type="text" name="" value="">
          <input v-model="answer" type="text" name="" value="">
        </div>
        <div v-else-if="node.type === 'choose'" class="" :key="option" v-for="option in node.options">
          <button :class="{ 'selected': answer === option }" :question="node.text" @click="answer = option"> {{ option }}</button>
        </div>
        <div v-else-if="node.type === 'checkbox'" class="" :key="option" v-for="option in node.options">
          <input type="checkbox" v-model="answer" :name="option" :value="option"><span> {{ option }}</span>
        </div>
      </div>
    </div>
    <div v-else class="form-question-container__wrapper">
      <label class="form-question__label">{{ node.text }}</label>
      <div v-if="node.type === 'input'" type="text" name="" value="">
        <input v-model="answer" type="text" name="" value="">
      </div>
      <div v-else-if="node.type === 'choose'" class="" :key="option" v-for="option in node.options">
        <button :class="{ 'selected': answer === option }" :question="node.text" @click="answer = option"> {{ option }}</button>
      </div>
      <div v-else-if="node.type === 'checkbox'" class="" :key="option" v-for="option in node.options">
        <input type="checkbox" v-model="answer" :name="option" :value="option"><span> {{ option }}</span>
      </div>
    </div>
    <node v-for="question in node.subQuestions" v-if="node.subQuestions && node.subQuestions.length && question.parentOption === answer" :key="question.id" :parent-node="question.parentId" :node="question"/>
  </div>
</template>

<script>
export default {
  name: 'Node',
  props: {
    node: {
      default: null,
      type: Object
    },
    parentNode: {
      default: 0,
      type: Number
    }
  },
  data: function () {
    return {
      answer: this.node.type === 'checkbox' ? [] : '',
      isActive: false
    }
  },
  methods: {
    validateAnswer: function (answer) {
      return new Promise((resolve, reject) => {
        if (this.node.text.includes('Height')) { resolve(this.validHeight(answer)) } else {
          if (answer) {
            resolve(true)
          }
        }
      })
    },
    validHeight: function (height) {
      return height === 'test'
    }
  },
  beforeMount: function () {
    this.$root.$on('activeAssessment', data => {
      this.isActive = this.node.id === data.id
    })
  },
  mounted: function () {
    let nestedQuestion = this.$el.parentNode.querySelector('.form-question-container__wrapper').nextElementSibling
    if (nestedQuestion) {
      nestedQuestion.parentNode.parentNode.appendChild(nestedQuestion)
    }
  },
  beforeUpdate: function () {
    if (this.answer) {
      this.validateAnswer(this.answer).then((isValid) => {
        this.$root.$emit('updateAssessment', { id: this.node.id, answer: this.answer, isValid })
      })
    }
  }

}
</script>
<style lang='scss' scoped>
@import 'theme/css/main.scss';
  .form-question{
    position:absolute;
    right:0;
    width:50%;
    top:0;
    bottom:0;
    padding:20px 0;
    align-items: center;
    justify-content: center;
    background:white;
    display:none;
    flex-flow:column nowrap;
    button{
      padding:10px;
      &.selected{
        background:$color-primary;
        color:white;
      }
    }
    &.active{
      display:flex;
    }

    &-container{
      flex:1;
      display:none;
      align-items:center;
      justify-content:center;
      &__wrapper{
        max-width:1280px;
      }
      &.sub-active{
        display:flex;
      }
    }
  }
</style>
