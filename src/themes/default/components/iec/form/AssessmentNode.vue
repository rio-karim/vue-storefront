<template>
  <div :class="{ 'active': isActive, 'form-question-container': node.parentId && node.parentOption, 'form-question': !node.parentId && !node.parentOption }">
    <div v-if="!node.parentId && !node.parentOption" class="form-question-container sub-active">
      <div class="form-question-container__wrapper">
        <label class="form-question__label">{{ node.text }}</label>
        <div v-if="node.type === 'input'" class="wrapper-input" type="text" name="" value="">
          <input v-model="answer" type="text" name="" value="">
        </div>
        <div v-else-if="node.type === 'choose'" class="wrapper-choose">
          <button :key="option" v-for="option in node.options" :class="{ 'selected': answer === option }" :question="node.text" @click="answer = option"> {{ option }}</button>
        </div>
        <div v-else-if="node.type === 'checkbox'" class="wrapper-checkbox" :key="option" v-for="option in node.options">
          <input type="checkbox" v-model="answer" :name="option" :value="option"><span> {{ option }}</span>
        </div>
      </div>
    </div>
    <div v-else class="form-question-container__wrapper">
      <label class="form-question__label">{{ node.text }}</label>
      <div v-if="node.type === 'input'" class="wrapper-input" type="text" name="" value="">
        <input v-model="answer" type="text" name="" value="">
      </div>
      <div v-else-if="node.type === 'choose'" class="wrapper-choose">
        <button :key="option" v-for="option in node.options" :class="{ 'selected': answer === option }" :question="node.text" @click="answer = option"> {{ option }}</button>
      </div>
      <div v-else-if="node.type === 'checkbox'" class="wrapper-checkbox" :key="option" v-for="option in node.options">
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
        if (this.node.type === 'input') { resolve(this.validInput(answer)) } else if (this.node.type === 'checkbox' && answer.length) { resolve(true) } else if (this.node.type === 'choose' && answer) { resolve(true) } else { resolve(false) }
      })
    },
    validInput: function (input) {
      return input === 'test'
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
    this.validateAnswer(this.answer).then((isValid) => {
      console.log({ id: this.node.id, answer: this.answer, isValid })
      this.$root.$emit('updateAssessment', { id: this.node.id, answer: this.answer, isValid })
    })
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
    &.active{
      display:flex;
    }
    &-container{
      flex:1;
      width:100%;
      display:none;
      align-items:center;
      justify-content:center;
      &__wrapper{
        width:100%;
        max-width:400px;
        display:flex;
        flex-flow:column nowrap;
        justify-content: center;
        align-items: center;
        label{
          font-size:26px;
          margin-bottom:30px;
          text-align: center;
        }
        .wrapper-input{
          width:100%;
          border-radius:50px;
          overflow: hidden;
          display:flex;
          align-items: center;
          border:solid 1px $color-primary;
          justify-content: center;
          box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
          input{
            width:100%;
            border:none;
            padding:0 20px;
            text-align: center;
            font-size:18px;
            &:focus{
              outline:none;
            }
          }
        }
        .wrapper-choose{
          width:100%;
          display:flex;
          flex-flow:row wrap;
          align-items: center;
          justify-content: space-evenly;
          button{
            text-align: center;
            font-size:18px;
            background: none;
            border-radius:50px;
            border: solid $color-primary 1px;
            display:flex;
            justify-content: center;
            align-items: center;
            padding:15px 20px;
            margin:5px;
            transition: all .2s ease-in-out;
            box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
            &.selected{
              background:$color-primary;
              color:white;
            }
            &:hover{
              border-color: #CC7685;
              background-color: #CC7685;
              color:white;
            }
          }
        }
      }
      &.sub-active{
        display:flex;
      }
    }
  }
</style>
