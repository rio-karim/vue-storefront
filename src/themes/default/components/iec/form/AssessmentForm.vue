<template>
  <div class="form">
    <button @click="cycleQuestion('down')" class="cycle-question cycle-question--left" type="button" name="button">LEFT CYCLE</button>
    <assessment-node v-for="node in payload" :key="node.id" :node="node"/>
    <button @click="cycleQuestion('up')" class="cycle-question cycle-question--right" type="button" name="button">RIGHT CYCLE</button>
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
          text: 'Height (in centimetres):',
          type: 'input',
          active: true
        },
        {
          id: 1,
          text: 'Weight (in kilograms):',
          type: 'input'
        },
        {
          id: 2,
          text: 'Have you had your blood pressure checked in the last 6 months?',
          type: 'choose',
          options: [
            'Yes',
            'No'
          ]
        },
        {
          id: 3,
          text: 'Is your blood pressure:',
          type: 'choose',
          options: [
            'Normal: Between 90/60 - 140/90',
            'Low: Below 90/60',
            'High - Above 140/90'
          ],
          subQuestions: [{
            parentId: 2,
            parentOption: 'High - Above 140/90',
            id: 9,
            text: 'Is your blood pressure currently being controlled with medication?',
            type: 'choose',
            options: [
              'Yes',
              'No'
            ]
          }]
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
      response: []
    }
  },
  methods: {
    cycleQuestion: function (traverse) {
      // Extend to render new active payloads
      let self = this
      let currentIndex = self.$_.findIndex(this.payload, (checkIndex) => checkIndex.active)
      if (traverse === 'up' && currentIndex < (this.payload.length - 1)) {
        delete this.payload[currentIndex].active
        this.payload[currentIndex + 1].active = true
      } else if (traverse === 'down' && currentIndex > 0) {
        delete this.payload[currentIndex].active
        this.payload[currentIndex - 1].active = true
      }
      console.log(this.payload)
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
    this.$root.$on('updateAssessment', data => {
      console.log('%c Node Recieved: ', 'color: #75cbbc;', data)
      this.response = this.extendDeep(this.payload, { id: data.id, answer: data.answer })
    })
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
      right:40px;
    }
  }
}
</style>
