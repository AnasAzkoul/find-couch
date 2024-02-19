<script setup>
import BaseBadge from "../../components/ui/BaseBadge.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import BaseCard from "../../components/ui/BaseCard.vue";
import { computed, onBeforeMount, ref } from "vue";
import { useCoachesStore } from "../../stores/coachesStore";

const selectedCoach = ref(null);

const props = defineProps(["id"]);

const coachesStore = useCoachesStore();

onBeforeMount(() => {
  const coach = coachesStore.coaches.find((item) => item.id === props.id);
  selectedCoach.value = coach;
});

const fullName = computed(() => {
  return `${selectedCoach.value.firstName} ${selectedCoach.value.lastName}`;
});

const rate = computed(() => {
  return selectedCoach.value.hourlyRate;
});

const contactLink = computed(() => {
  return `${props.id}/contact`;
});

const areas = computed(() => {
  return selectedCoach.value.areas;
});

const description = computed(() => {
  return selectedCoach.value.description;
});
</script>

<template>
  <section>
    <BaseCard>
      <h2>{{ fullName }}</h2>
      <h3>$ {{ rate }}</h3>
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <header>
        <h2>Interested? Reach out now!</h2>
        <BaseButton link :to="contactLink">Contact</BaseButton>
      </header>
      <RouterView />
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <BaseBadge v-for="area in areas" :key="area" :type="area" :title="area" />
      <p>{{ description }}</p>
    </BaseCard>
  </section>
</template>
