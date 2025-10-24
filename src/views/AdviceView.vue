<template>
  <v-app>
    <v-main>
      <v-container class="py-4" style="max-width: 520px">
        <!-- ===== Header ===== -->
        <header class="text-h6 font-weight-bold mb-4 text-center">
          บันทึกข้อมูลร่างกาย
        </header>

        <!-- ===== Form ===== -->
        <v-card rounded="lg" variant="flat" class="mb-4 pa-4">
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model.number="weight"
                label="น้ำหนัก (กก.)"
                type="number"
                variant="outlined"
                density="comfortable"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model.number="muscleMass"
                label="มวลกล้ามเนื้อ (กก.)"
                type="number"
                variant="outlined"
                density="comfortable"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model.number="bodyFat"
                label="เปอร์เซ็นต์ไขมัน (%)"
                type="number"
                variant="outlined"
                density="comfortable"
              />
            </v-col>
          </v-row>

          <v-row dense class="mt-2">
            <v-col cols="6">
              <v-btn
                block
                color="grey-darken-1"
                variant="flat"
                prepend-icon="mdi-restore"
                @click="onReset"
              >
                Reset
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                block
                color="primary"
                variant="flat"
                prepend-icon="mdi-content-save"
                @click="onSave"
              >
                บันทึก
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <!-- ===== รูปภาพรูปร่างตาม % ไขมันล่าสุด ===== -->
        <v-card
          v-if="latestRecord"
          rounded="lg"
          variant="flat"
          class="pa-4 mb-4 text-center"
        >
          <div class="text-subtitle-1 font-weight-bold mb-1">
            ภาพรูปร่างตามเปอร์เซ็นต์ไขมันล่าสุด
          </div>
          <div class="text-body-2 text-grey-darken-1 mb-2">
            %ไขมันล่าสุด: {{ latestRecord.bodyFat }}%
          </div>

          <v-img
            :src="bodyFatImage"
            aspect-ratio="1"
            contain
            class="mx-auto rounded-lg"
            max-width="280"
          />
        </v-card>

        <!-- ===== ตารางประวัติ ===== -->
        <v-card rounded="lg" variant="flat" v-if="logs.length">
          <v-card-text>
            <div class="text-subtitle-1 font-weight-bold mb-2">
              ประวัติการบันทึก
            </div>
            <v-table density="compact">
              <thead>
                <tr>
                  <th class="text-left">วันที่</th>
                  <th class="text-center">น้ำหนัก</th>
                  <th class="text-center">มวลกล้าม</th>
                  <th class="text-center">% ไขมัน</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(log, i) in logs" :key="i">
                  <td>{{ formatDate(log.date) }}</td>
                  <td class="text-center">{{ log.weight }}</td>
                  <td class="text-center">{{ log.muscleMass }}</td>
                  <td class="text-center">{{ log.bodyFat }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>

        <v-alert
          v-else
          variant="tonal"
          color="grey"
          class="text-center mt-4"
          icon="mdi-chart-timeline-variant"
        >
          ยังไม่มีข้อมูลบันทึก
        </v-alert>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";

// ===== ฟอร์มกรอกข้อมูล =====
const weight = ref<number | null>(null);
const muscleMass = ref<number | null>(null);
const bodyFat = ref<number | null>(null);

// ===== รายการบันทึก =====
const logs = ref<
  { date: string; weight: number; muscleMass: number; bodyFat: number }[]
>([]);

// ===== โหลดข้อมูลจาก LocalStorage =====
onMounted(() => {
  const saved = localStorage.getItem("bodyLogs");
  if (saved) {
    try {
      logs.value = JSON.parse(saved);
    } catch {
      logs.value = [];
    }
  }
});

// ===== บันทึกอัตโนมัติเมื่อ logs เปลี่ยน =====
watch(
  logs,
  (val) => {
    localStorage.setItem("bodyLogs", JSON.stringify(val));
  },
  { deep: true }
);

// ===== ฟังก์ชัน =====
const onSave = () => {
  if (!weight.value || !muscleMass.value || !bodyFat.value) {
    alert("กรุณากรอกข้อมูลให้ครบก่อนบันทึก");
    return;
  }

  logs.value.unshift({
    date: new Date().toISOString(),
    weight: weight.value,
    muscleMass: muscleMass.value,
    bodyFat: bodyFat.value,
  });

  onReset();
};

const onReset = () => {
  weight.value = null;
  muscleMass.value = null;
  bodyFat.value = null;
};

// ===== แปลงวันที่ =====
const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

// ===== ดึงข้อมูลล่าสุด =====
const latestRecord = computed(() => logs.value[0]);

// ===== ภาพ Body Fat ตามช่วงใหม่ =====
const bodyFatImage = computed(() => {
  if (!latestRecord.value) return "";
  const fat = latestRecord.value.bodyFat;

  if (fat < 15) return "/bodyfat-under15.png";
  if (fat < 19) return "/bodyfat-15-18.png";
  if (fat < 23) return "/bodyfat-19-22.png";
  if (fat <= 30) return "/bodyfat-23-30.png";
  return "/bodyfat-over30.png";
});
</script>

<style scoped>
.v-table th {
  font-weight: 600;
}
</style>
