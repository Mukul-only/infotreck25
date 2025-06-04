// src/data/eventsData.js (Create this file or place it in EventsPage.jsx)
export const events = [
  {
    id: 1,
    title: "Algorithma",
    image: "/assets/events/algorithma.webp", // Replace with actual image path
    eventType: "technical",
    playerMode: "single player",
    subCategory: null,
    description: "Detailed description for Algorithma...",
  },
  {
    id: 2,
    title: "Type racer",
    image: "/assets/events/type-racer.webp", // Replace with actual image path
    eventType: "non-tech",
    playerMode: "single player",
    subCategory: null,
    description: "Detailed description for Type racer...",
  },
  {
    id: 3,
    title: "Emoji charades",
    image: "/assets/events/emoji-charades.webp", // Replace with actual image path
    eventType: "non-tech",
    playerMode: "team based",
    subCategory: null,
    description: "Detailed description for Emoji charades...",
  },
  {
    id: 4,
    title: "Crack the password",
    image: "/assets/events/crack-password.webp", // Replace with actual image path
    eventType: "non-tech", // As per image
    playerMode: "single player",
    subCategory: null,
    description: "Detailed description for Crack the password...",
  },
  {
    id: 5,
    title: "Reverse engineering",
    image: "/assets/events/reverse-engineering.webp", // Replace with actual image path
    eventType: "technical",
    playerMode: "single player",
    subCategory: null,
    description: "Detailed description for Reverse engineering...",
  },
  {
    id: 6,
    title: "Destinite",
    image: "/assets/events/destinite.webp", // Replace with actual image path
    eventType: "non-tech",
    playerMode: "single player",
    subCategory: null,
    description: "Detailed description for Destinite...",
  },
  {
    id: 7,
    title: "Treasure hunt",
    image: "/assets/events/treasure-hunt.webp", // Replace with actual image path
    eventType: "non-tech",
    playerMode: "team based",
    subCategory: null,
    description: "Detailed description for Treasure hunt...",
  },
  {
    id: 8,
    title: "Replicode",
    image: "/assets/events/replicode.webp", // Replace with actual image path
    eventType: "technical", // As per image
    playerMode: "team based",
    subCategory: "webdev",
    description: "Detailed description for Replicode...",
  },
  {
    id: 9,
    title: "CS Quiz",
    image: "/assets/events/cs-quiz.webp", // Replace with actual image path
    eventType: "technical",
    playerMode: "single player",
    subCategory: "cs",
    description: "Detailed description for CS Quiz...",
  },
  {
    id: 10,
    title: "Break the bug",
    image: "/assets/events/break-the-bug.webp", // Replace with actual image path
    eventType: "technical",
    playerMode: "single player",
    subCategory: null,
    description: "Detailed description for Break the bug...",
  },
  {
    id: 11,
    title: "Crypt of the Necrodancer",
    image: "/assets/events/crypt-necrodancer.webp", // Replace with actual image path
    eventType: "non-tech",
    playerMode: "single player",
    subCategory: "gaming",
    description: "Detailed description for Crypt of the Necrodancer...",
  },
];

// **Important:**
// 1. Create a folder `public/assets/events/` and place your event images there (e.g., `public/assets/events/algorithma.webp`).
//    Alternatively, if you import images into your JS, place them in `src/assets/events/` and import them.
//    For simplicity with paths, using the `public` folder is often easier for static assets like these initially.
// 2. Adjust the `image` paths in the data above accordingly.
