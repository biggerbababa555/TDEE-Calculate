import { createRouter, createWebHistory } from "vue-router";
import CalculatorView from "../views/CalculatorView.vue";
import ExercisesView from "../views/ExercisesView.vue";
import AdviceView from "../views/AdviceView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "calc", component: CalculatorView },
    { path: "/exercises", name: "exercises", component: ExercisesView },
    { path: "/advice", name: "advice", component: AdviceView },
  ],
});
