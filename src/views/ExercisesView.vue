<template>
  <v-app>
    <v-main>
      <v-container class="py-4" style="max-width: 520px">
        <header class="text-h6 font-weight-bold mb-2">
          คลังท่าออกกำลังกาย
        </header>

        <v-text-field
          variant="outlined"
          density="comfortable"
          v-model="q"
          label="ค้นหาท่า..."
          prepend-inner-icon="mdi-magnify"
          class="mt-3"
          bg-color="white"
        />

        <v-chip-group v-model="muscle" mandatory row class="mb-3">
          <v-chip v-for="m in muscles" :key="m" :value="m" variant="flat">{{
            m
          }}</v-chip>
        </v-chip-group>

        <exercise-card
          v-for="ex in filtered"
          :key="ex.id"
          :exercise="ex"
          class="mb-2"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import ExerciseCard from "../components/ExerciseCard.vue";

const q = ref("");
const muscle = ref("ทั้งหมด");
const muscles = ["ทั้งหมด", "อก", "หลัง", "ไหล่", "แขน", "ขา", "แกนกลาง"];

type Ex = {
  id: string;
  name: string;
  muscle: string;
  level: string;
  equipment: string;
  steps: string[];
};
const all = ref<Ex[]>([]);

onMounted(async () => {
  // Load the JSON at runtime to avoid requiring `--resolveJsonModule`
  try {
    // Fetch from an absolute public path (move exercises.json to your project's public folder)
    const res = await fetch("/exercises.json");
    if (!res.ok) {
      console.error("Failed to load exercises.json:", res.status);
      return;
    }
    all.value = (await res.json()) as Ex[];
  } catch (err) {
    console.error("Error loading exercises.json:", err);
  }
});

const filtered = computed(() =>
  all.value.filter(
    (x) =>
      (muscle.value === "ทั้งหมด" || x.muscle === muscle.value) &&
      x.name.toLowerCase().includes(q.value.toLowerCase())
  )
);
</script>
