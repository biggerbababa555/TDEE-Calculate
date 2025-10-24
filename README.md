# big-fit — BMI / TDEE Calculator & Exercise Library

A modern **Vue 3 + Vite + Vuetify** app for calculating **BMI, BMR, TDEE** and browsing an **exercise library** with images and step-by-step instructions.

![App preview (iPhone mockup)](docs/preview2.png)

---

## ✨ Features

- **BMI / BMR / TDEE** calculation with activity multipliers  
- Clean, mobile-first UI (Vuetify)  
- **Exercise library**: search by name, filter by muscle group, show image & link to full description  
- Easy to extend (plain JSON at `/public/exercises.json`)  
- TypeScript + Composition API

---

## 🔢 Formulas

- **BMI** = `weight(kg) / [height(m)]²`
- **BMR (Mifflin–St Jeor)**  
  - Male: `10×W + 6.25×H − 5×Age + 5`  
  - Female: `10×W + 6.25×H − 5×Age − 161`
- **TDEE** = `BMR × ActivityFactor`

| Activity Level | Description                                   | Factor |
|---|---|---|
| Sedentary      | Little / no exercise                          | 1.2   |
| Light          | 1–3 days/week                                  | 1.375 |
| Moderate       | 3–4 days/week                                  | 1.55  |
| Active         | 5–6 days/week                                  | 1.725 |
| Very Active    | Hard exercise / physical job                   | 1.9   |

---

## 📦 Tech Stack

- **Vue 3**, **Vite**, **Vuetify**
- TypeScript, Composition API

---

## 🚀 Getting Started

```bash
# Install
npm install

# Dev
npm run dev

# Build
npm run build
