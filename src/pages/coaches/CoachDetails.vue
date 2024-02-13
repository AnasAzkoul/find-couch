<script setup>
import BaseBadge from "../../components/ui/BaseBadge.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import BaseCard from "../../components/ui/BaseCard.vue";
import { defineProps, computed, onBeforeMount, ref } from "vue";
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

const contactLink = computed(() => {
  return `contact/${props.id}`;
});

const description = computed(() => {
  return selectedCoach.value.description;
});
</script>

<template>
  <section>
    <BaseCard>
      <h2>{{ fullName }}</h2>
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
      <BaseBadge
        v-for="area in selectedCoach.areas"
        :key="area"
        :type="area"
        :title="area"
      />
      <p>{{ description }}</p>
    </BaseCard>
  </section>
</template>
