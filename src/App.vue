<template>
  <v-app>
    <v-main>
      <!-- จุดที่ router จะใส่หน้า view เข้ามา -->
      <router-view />
    </v-main>

    <!-- แถบเมนูล่าง (optional สำหรับมือถือ) -->
    <v-bottom-navigation elevation="4" grow>
      <v-btn :to="{ name: 'calc' }" prepend-icon="mdi-calculator-variant">
        คำนวณ
      </v-btn>
      <v-btn :to="{ name: 'exercises' }" prepend-icon="mdi-dumbbell">
        ท่าออกกำลัง
      </v-btn>
      <v-btn :to="{ name: 'advice' }" prepend-icon="mdi-notebook-edit">
        บันทึกน้ำหนัก
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
