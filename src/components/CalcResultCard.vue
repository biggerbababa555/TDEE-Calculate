<template>
  <v-card rounded="lg" variant="flat">
    <v-card-text>
      <div class="d-flex align-center justify-space-between mb-2">
        <div class="text-subtitle-1 font-weight-bold">ผลลัพธ์</div>

        <!-- ✅ แสดงเฉพาะเมื่อมีค่า bmiLabel -->
        <v-chip
          v-if="bmiLabel"
          label
          :color="bmiColor"
          variant="tonal"
          class="font-weight-bold"
        >
          {{ bmiLabel }}
        </v-chip>
      </div>

      <v-row dense>
        <v-col cols="4">
          <div class="label">BMI</div>
          <div class="value">{{ bmiDisplay }}</div>
        </v-col>
        <v-col cols="4">
          <div class="label">BMR</div>
          <div class="value">{{ bmrDisplay }}</div>
          <div class="note">kcal/วัน</div>
        </v-col>
        <v-col cols="4">
          <div class="label">TDEE</div>
          <div class="value">{{ tdeeDisplay }}</div>
          <div class="note">kcal/วัน</div>
        </v-col>
      </v-row>

      <v-divider class="my-3" />

      <div class="text-subtitle-2 font-weight-bold mb-2">เป้าหมายแคลอรี่</div>
      <v-row dense>
        <v-col cols="4">
          <div class="mini">รักษาน้ำหนัก</div>
          <div class="kcal">{{ targets.maintain || "-" }}</div>
        </v-col>
        <v-col cols="4">
          <div class="mini">ลดช้า</div>
          <div class="kcal">{{ targets.cut || "-" }}</div>
        </v-col>
        <v-col cols="4">
          <div class="mini">เพิ่มช้า</div>
          <div class="kcal">{{ targets.bulk || "-" }}</div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  bmi: number | null;
  bmr: number | null;
  tdee: number | null;
  targets: { maintain: number; cut: number; bulk: number };
}>();

const bmiDisplay = computed(() => (props.bmi ? props.bmi.toFixed(2) : "-"));
const bmrDisplay = computed(() => (props.bmr ? props.bmr : "-"));
const tdeeDisplay = computed(() => (props.tdee ? props.tdee : "-"));

const bmiLabel = computed(() => {
  const x = props.bmi;
  if (!x) return "";
  if (x < 18.5) return "น้ำหนักน้อย";
  if (x < 23) return "ปกติ";
  if (x < 25) return "ท้วม";
  if (x < 30) return "อ้วนระดับ 1";
  return "อ้วนระดับ 2";
});

const bmiColor = computed(() => {
  const x = props.bmi;
  if (!x) return "grey";
  if (x < 18.5) return "blue";
  if (x < 23) return "green";
  if (x < 25) return "amber";
  if (x < 30) return "orange";
  return "red";
});
</script>
