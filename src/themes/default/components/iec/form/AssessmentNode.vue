<template>
  <li class="form-node">
    <span class="label">{{ node.text }}</span>
    <ul v-if="node.subQuestions && node.subQuestions.length">
      <node v-for="question in node.subQuestions" :key="question.id" :node="question"/>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'Node',
  props: {
    node: {

      default: null,
      type: Object
    }
  }
}
</script>
