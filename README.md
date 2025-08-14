# 🏋️‍♂️ FitnessFirst — Train Your Feed

**FitnessFirst** is the ultimate workout for your social feed — a gym-themed dynamic forum where fitness enthusiasts can share their sessions, track their progress, and get spotted by the community.  

Every post gets an automatic **visual pump**:
- **Workouts** → Exercise images fetched from the **ExerciseDB API** based on the Session Name  
- **Other Focuses** → High-quality background image from the **Unsplash API** based on the Session Name  

---

## 🏗 Warm-Up — Building Your Session
- Create new **sessions** with:
  - **Session Name** (mandatory)
  - Optional **Breakdown** (extra text)
  - Optional external image URL (overridden for Workouts with ExerciseDB image)
- Choose your **Focus** (e.g., Workouts, Nutrition, Progress)
- Protect your session edits with an **Access Code** (pseudo-auth)

---

## 💪 Main Workout — Flexing in the Feed
- **Home feed** displays:
  - Session Name  
  - Time posted  
  - Current gains (likes)  
- Card layout:
  - Full-size background image with category color overlay  
  - Text neatly overlaid  
- Clicking a card opens the **Session Detail Page** with:
  - Breakdown  
  - Image  
  - Spotters (comments)  
- Community interaction:
  - Leave spotter comments on sessions  
  - Rack up gains (unlimited upvotes)  
  - Repost previous sessions (original appears inline below with a link)

---

## 🏋️‍♀️ Accessories — Flex, Search & Filter
- **Flex By**:
  - Fresh Pumps (newest sessions)
  - Most Reps (most gains)  
- **Focus Filter**:
  - Always-visible custom-styled dropdown menu for category selection  
- **Search Bar**:
  - Expanding search for Session Name only

---

## 🎨 Aesthetic Gains — Styling & UX
- Black-and-white global theme with custom fonts  
- Category-specific color overlays on background images  
- **Custom Font Awesome icons** throughout  
- Fully styled dropdown menu for Focus selection  
- Gym-themed loading animation — a **rotating weight plate**

---

## 🤖 Automatic Spotters — API Integration
- **ExerciseDB API**: Fetches exercise images for Workout sessions  
- **Unsplash API**: Fetches images for all other Focuses  

---

## 🗺 Routes
- `/` → Home feed with Flex controls, Focus filter, and search  
- `/post/:id` → Session detail with breakdown, image, spotters, gains, edit/delete/repost  
- `/create` → New session creation form  
- `*` → 404 page  

---

## 🖼 Preview

> **Walkthrough GIF**  
<img src='./Walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [Kap](https://getkap.co/) for macOS  

---

## 🛠 Built With
- React (JSX)  
- JavaScript (ES6+)  
- HTML5 / CSS3  
- [ExerciseDB API](https://exercisedb.io/)  
- [Unsplash API](https://unsplash.com/developers)  
- [Font Awesome](https://fontawesome.com/)  

---

## 📜 License

    Copyright [2025] [Kelvin Mathew]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
