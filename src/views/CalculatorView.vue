<template>
  <v-app>
    <v-main>
      <v-container class="py-4" style="max-width: 520px">
        <header class="text-h6 font-weight-bold mb-2">คำนวณ BMI / TDEE</header>

        <v-card rounded="lg" variant="flat" class="mb-3">
          <v-card-text class="pt-3">
            <v-btn-toggle
              variant="outlined"
              v-model="sex"
              mandatory
              class="mb-3"
              rounded="lg"
            >
              <v-btn value="male" prepend-icon="mdi-human-male">ชาย</v-btn>
              <v-btn value="female" prepend-icon="mdi-human-female">หญิง</v-btn>
            </v-btn-toggle>

            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model.number="age"
                  label="อายุ (ปี)"
                  type="number"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model.number="heightCm"
                  label="ส่วนสูง (ซม.)"
                  type="number"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model.number="weightKg"
                  label="น้ำหนัก (กก.)"
                  type="number"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="activity"
                  :items="activityItems"
                  label="ระดับกิจกรรม"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- ✅ แสดงผลเฉพาะเมื่อกด Calculate -->
        <calc-result-card
          :bmi="result?.bmi ?? null"
          :bmr="result?.bmr ?? null"
          :tdee="result?.tdee ?? null"
          :targets="result?.targets ?? { maintain: 0, cut: 0, bulk: 0 }"
          class="mb-4"
        />

        <v-row dense>
          <v-col cols="6">
            <v-btn
              block
              variant="flat"
              color="grey-darken-1"
              @click="onReset"
              prepend-icon="mdi-restore"
            >
              Reset
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              variant="flat"
              color="primary"
              @click="onCalculate"
              prepend-icon="mdi-calculator-variant"
            >
              Calculate
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CalcResultCard from "../components/CalcResultCard.vue";

const sex = ref("male");
const age = ref<number | null>(null);
const heightCm = ref<number | null>(null);
const weightKg = ref<number | null>(null);
const activity = ref("moderate");

// ผลลัพธ์ที่จะใช้แสดง
const result = ref<null | {
  bmi: number;
  bmr: number;
  tdee: number;
  targets: { maintain: number; cut: number; bulk: number };
}>(null);

const onCalculate = () => {
  if (!age.value || !heightCm.value || !weightKg.value) {
    alert("กรุณากรอกข้อมูลให้ครบก่อนคำนวณ");
    return;
  }

  // คำนวณ BMI / BMR / TDEE
  const hM = heightCm.value / 100;
  const bmi = weightKg.value / (hM * hM);
  const base = 10 * weightKg.value + 6.25 * heightCm.value - 5 * age.value;
  const bmr = sex.value === "male" ? base + 5 : base - 161;

  const factorMap = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    athlete: 1.9,
  } as const;

  const tdee = Math.round(
    bmr * factorMap[activity.value as keyof typeof factorMap]
  );
  const targets = {
    maintain: tdee,
    cut: Math.round(tdee * 0.9),
    bulk: Math.round(tdee * 1.1),
  };

  result.value = { bmi, bmr, tdee, targets };
};

const onReset = () => {
  sex.value = "male";
  age.value = null;
  heightCm.value = null;
  weightKg.value = null;
  activity.value = "moderate";
  result.value = null;
};

const activityItems = [
  { title: "นั่งทำงาน (Sedentary)", value: "sedentary" },
  { title: "ขยับเล็กน้อย (Light)", value: "light" },
  { title: "ปานกลาง 3–4 วัน/สัปดาห์ (Moderate)", value: "moderate" },
  { title: "ออกแรงสูง 5–6 วัน/สัปดาห์ (Active)", value: "active" },
  { title: "นักกีฬา (Athlete)", value: "athlete" },
];
</script>
