<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps(["coach"]);

</script>

<template>
  <li>
    <h3>{{ coach.firstName }}</h3>
    <h4>${{ coach.hourlyRate }}</h4>
    <div>
      <span v-for="area in coach.areas" :key="area">
        {{ area }}
      </span>
    </div>
    <div class="actions">
      <RouterLink :to="`/coaches/${coach.id}/contact`">Contact</RouterLink>
      <RouterLink :to="`/coaches/${coach.id}`">View Details</RouterLink>
    </div>
  </li>
</template>
