<template>
  <div class="form">
    <button @click="cycleQuestion('down')" class="cycle-question cycle-question--left" type="button" name="button">LEFT CYCLE</button>
    <assessment-node v-for="node in payload" :key="node.id" :node="node"/>
    <button @click="cycleQuestion('up')" class="cycle-question cycle-question--right" :class="{ valid : canSubmit }" type="button" name="button">RIGHT CYCLE</button>
  </div>
</template>

<script>
import AssessmentNode from './AssessmentNode'

export default {
  components: {
    AssessmentNode
  },
  data: function () {
    return {
      payload: [
        {
          id: 0,
          text: 'Is your blood pressure:',
          type: 'choose',
          options: [
            'Normal: Between 90/60 - 140/90',
            'Low: Below 90/60',
            'High - Above 140/90'
          ],
          subQuestions: [{
            parentId: 3,
            parentOption: 'High - Above 140/90',
            id: 9,
            text: 'Level 2 Test',
            type: 'choose',
            options: [
              'Yes',
              'No'
            ],
            subQuestions: [{
              parentId: 9,
              parentOption: 'Yes',
              id: 21,
              text: 'Level 3 Test',
              type: 'choose',
              options: [
                'Yes',
                'No'
              ],
              subQuestions: [{
                parentId: 21,
                parentOption: 'Yes',
                id: 37,
                text: 'Level 4 Test',
                type: 'choose',
                options: [
                  'Yes',
                  'No'
                ]
              }]
            }]
          }]
        },
        {
          id: 1,
          text: 'Height (in centimetres):',
          type: 'input',
          active: true
        },
        {
          id: 2,
          text: 'Weight (in kilograms):',
          type: 'input'
        },
        {
          id: 3,
          text: 'Have you had your blood pressure checked in the last 6 months?',
          type: 'choose',
          options: [
            'Yes',
            'No'
          ]
        },
        {
          id: 4,
          text: 'Do you know your exact blood pressure?',
          type: 'input'
        },
        {
          id: 5,
          text: 'Tick the appropriate boxes to show whether you have, or have ever been diagnosed with, any of the following.',
          type: 'checkbox',
          options: [
            'Diabetes',
            'High blood pressure',
            'Thyroid problem',
            'Stroke'
          ]
        }
      ],
      response: [],
      canSubmit: false
    }
  },
  methods: {
    cycleSubQuestion: function (question, traverse) {
      let self = this
      if (question.subQuestions) {
        let findSubquestion = self.$_.filter(question.subQuestions, (subQuestion) => {
          return subQuestion.parentOption === question.answer
        })
        if (findSubquestion.length) {
          // Clear sub-active status from hard-coded origin question
          let currentSub = self.$el.querySelector('.form-question.active .form-question-container.sub-active')
          let el = traverse === 'down' ? currentSub.previousElementSibling : currentSub.nextElementSibling
          if (traverse === 'up') {
            if (!el) {
              console.log('Next master question')
              return false
            }
          }
          self.$_.each(self.$el.querySelectorAll('.form-question.active .form-question-container'), (el) => {
            if (el.classList.contains('sub-active')) {
              el.classList.remove('sub-active')
            }
          })
          el.classList.add('sub-active')
          console.log('Next sub question')
          return true
        }
      }
      console.log('Next master question')
      return false
    },
    isValid: function (question) {
      return question.isValid && question.answer
    },
    cycleQuestion: function (traverse) {
      let self = this
      let currentIndex = self.getActive()
      // Go forward in the questions
      if (traverse === 'up' && currentIndex < (this.payload.length - 1)) {
        // If there are subquestions to go forward to, check the required answer has been given
        let cycling = self.cycleSubQuestion(this.payload[currentIndex], traverse)
        if (!cycling && self.isValid(this.payload[currentIndex])) {
          delete this.payload[currentIndex].active
          this.$root.$emit('activeAssessment', {
            id: currentIndex + 1,
            active: true
          })
          this.payload[currentIndex + 1].active = true
        }
      } else if (traverse === 'down' && currentIndex > 0) {
        // Code here to check there are subquestions to back into
        let cycling = self.cycleSubQuestion(this.payload[currentIndex], traverse)
        if (!cycling) {
          delete this.payload[currentIndex].active
          this.$root.$emit('activeAssessment', {
            id: currentIndex - 1,
            active: true
          })
          this.payload[currentIndex - 1].active = true
        }
      }
    },
    getActive: function () {
      return this.$_.findIndex(this.payload, (checkIndex) => checkIndex.active)
    },
    extendDeep: function (arr, data) {
      let jsonFind = JSON.stringify(this.findDeep(arr, data.id))
      let jsonReplace = JSON.stringify(this.$_.extend(this.findDeep(arr, data.id), data))
      return JSON.parse(JSON.stringify(arr).replace(jsonFind, jsonReplace))
    },
    findDeep: function (arr, id) {
      for (const obj of arr) {
        if (obj.id === id) { return obj }
        if (obj.subQuestions) {
          let result = this.findDeep(obj.subQuestions, id)
          if (result) { return result }
        }
      }
    },
    submitOrder: function () {
      console.log('%c Sending Response: ', 'color: #75cbbc;', this.response)
    }
  },
  beforeMount: function () {
    this.payload[0].active = true
    this.$root.$on('updateAssessment', data => {
      console.log('%c Node Recieved: ', 'color: #75cbbc;', data)
      this.response = this.extendDeep(this.payload, { id: data.id, answer: data.answer, isValid: data.isValid })
      this.canSubmit = data.isValid
    })
  },
  mounted: function () {
    this.$root.$emit('activeAssessment', { id: this.getActive(), active: true })
  }
}
</script>

<style lang='scss' scoped>
.form{
  align-items: center;
  justify-content:center;
  position:absolute;
  right:0;
  left:-100%;
  bottom:0;
  top:0;

  button.cycle-question{
    position:fixed;
    top:50%;
    bottom:50%;
    height:40px;
    width:40px;
    display:block;
    z-index:3000;
    &--left{
      left:40px;
    }
    &--right{
      &:not(.valid){
        display:none;
      }
      right:40px;
    }
  }
}
</style>
