<script setup>
import { useCoachesStore } from "../../stores/coachesStore";
import { storeToRefs } from "pinia";
import CoachItem from "../../components/coaches/CoachItem.vue";
import BaseCard from "../../components/ui/BaseCard.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

const coachesStore = useCoachesStore();

const { hasCoaches, filteredCoaches } = storeToRefs(coachesStore);
</script>

<template>
  <section>
    <CoachFilter />
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton>Refresh</BaseButton>
        <BaseButton to="register" :link="true" mode="outline">
          register
        </BaseButton>
      </div>
      <ul v-if="hasCoaches">
        <CoachItem
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :coach="coach"
        />
      </ul>
      <h3 v-else>No Coaches Found</h3>
    </BaseCard>
  </section>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
