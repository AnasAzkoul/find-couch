<template>
  <button v-if="!link" :class="modeClass">
    <slot></slot>
  </button>
  <RouterLink v-else :to="props.to" :class="modeClass">
    <slot></slot>
  </RouterLink>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  link: Boolean,
  to: {
    type: String,
    required: false,
    default: "/",
  },
  mode: {
    type: String,
    required: false,
    default: "",
  },
});

const modeClass = computed(() => {
  switch(props.mode) {
    case 'outline': 
      return 'outline'
    case 'flat': 
      return 'flat'
    default: 
      return ''
  }
});
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>
