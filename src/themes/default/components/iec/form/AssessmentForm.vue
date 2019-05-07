<template>
  <div class="tree">
    <ul class="tree-list">
      <assessment-node v-for="node in payload" :key="node.id" :node="node"/>
    </ul>
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
          type: 'input'
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
      ]
    }
  }
}
</script>

<style>
</style>
