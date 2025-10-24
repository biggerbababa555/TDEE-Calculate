import { defineStore } from "pinia";

type Sex = "male" | "female";
type Activity = "sedentary" | "light" | "moderate" | "active" | "athlete";

const activityFactor: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  athlete: 1.9,
};

export const useCalcStore = defineStore("calc", {
  state: () => ({
    sex: "male" as Sex,
    age: 25,
    heightCm: 170,
    weightKg: 65,
    activity: "moderate" as Activity,
  }),
  getters: {
    bmi(state) {
      const h = state.heightCm / 100;
      return +(state.weightKg / (h * h)).toFixed(2);
    },
    bmr(state) {
      const { sex, weightKg, heightCm, age } = state;
      const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
      return Math.round(sex === "male" ? base + 5 : base - 161);
    },
    tdee(): number {
      // @ts-ignore
      return Math.round(this.bmr * activityFactor[this.activity]);
    },
    targets(): { maintain: number; cut: number; bulk: number } {
      const maintain = this.tdee;
      return {
        maintain,
        cut: Math.round(maintain * 0.9), // -10%
        bulk: Math.round(maintain * 1.1), // +10%
      };
    },
  },
});
