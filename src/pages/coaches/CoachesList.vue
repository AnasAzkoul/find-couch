<template>
  <section>Filter</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <RouterLink to="register">Register</RouterLink>
    </div>
    <ul v-if="hasCoaches">
      <CoachItem v-for="coach in coaches" :key="coach.id" :coach="coach" />
    </ul>
    <h3 v-else>No Coaches Found</h3>
  </section>
</template>

<script setup>
import { useCoachesStore } from "../../stores/coachesStore";
import { storeToRefs } from "pinia";
import CoachItem from "../../components/coaches/CoachItem.vue";

const coachesStore = useCoachesStore();

const { coaches, hasCoaches } = storeToRefs(coachesStore);
</script>
