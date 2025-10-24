<template>
  <v-card rounded="xl" variant="outlined">
    <!-- รูปท่า -->
    <v-img
      v-if="exercise.image"
      :src="exercise.image"
      height="180"
      cover
      class="rounded-t-xl"
    >
      <template #placeholder>
        <div class="d-flex fill-height align-center justify-center">
          <v-progress-circular indeterminate size="24" />
        </div>
      </template>
    </v-img>

    <v-card-text>
      <div class="d-flex align-center justify-space-between">
        <div class="text-subtitle-1 font-weight-bold">
          {{ exercise.name }}
        </div>
        <v-chip size="small" variant="tonal">{{ exercise.muscle }}</v-chip>
      </div>

      <div class="text-caption text-grey-darken-1 mb-2">
        ระดับ: {{ exercise.level }} • อุปกรณ์: {{ exercise.equipment }}
      </div>

      <ol class="pl-4 mb-0">
        <li v-for="(s, i) in exercise.steps" :key="i">{{ s }}</li>
      </ol>
    </v-card-text>

    <v-divider />

    <!-- ปุ่มลิงก์ -->
    <v-card-actions class="pt-0">
      <v-btn
        v-if="exercise.image_credit"
        :href="exercise.image_credit"
        target="_blank"
        rel="noopener"
        variant="text"
        prepend-icon="mdi-open-in-new"
      >
        ดูรายละเอียดท่า
      </v-btn>

      <v-spacer />

      <v-btn
        v-if="exercise.image"
        :href="exercise.image"
        target="_blank"
        rel="noopener"
        variant="tonal"
        prepend-icon="mdi-image"
      >
        เปิดรูป
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{ exercise: any }>();
</script>
