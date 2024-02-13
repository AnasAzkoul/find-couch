<script setup>
import { defineProps, computed } from "vue";
import BaseButton from "../ui/BaseButton.vue";
import BaseBadge from "../ui/BaseBadge.vue";

const props = defineProps(["coach"]);

const fullName = computed(() => {
  return `${props.coach.firstName} ${props.coach.lastName}`;
});

const contactLink = computed(() => {
  return `/coaches/${props.coach.id}/contact`;
});

const coachDetailsLink = computed(() => {
  return `/coaches/${props.coach.id}`;
});
</script>

<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ coach.hourlyRate }}</h4>
    <div>
      <BaseBadge v-for="area in coach.areas" :key="area" :title="area" :type="area"/>
    </div>
    <div class="actions">
      <BaseButton :to="contactLink" :link="true" mode="outline"
        >Contact</BaseButton
      >
      <BaseButton :to="coachDetailsLink" :link="true">View Details</BaseButton>
    </div>
  </li>
</template>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
