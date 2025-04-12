import frontend from "../assets/frontend.png";
import backend from "../assets/backend.png";
import tools from "../assets/tools.png";
import soft from "../assets/soft.png";
import profile1 from "../assets/test1.png";
import profile2 from "../assets/test2.png";
import profile3 from "../assets/test3.png";
import profile4 from "../assets/test4.png";

export const SkILLS = [
  {
    title: "Frontend",
    iconUrl: frontend,
    skills: [
      { skill: "Html", percentage: "90%" },
      { skill: "CSS", percentage: "85%" },
      { skill: "JavaScript", percentage: "75%" },
      { skill: "Next Js", percentage: "75%" },
      { skill: "TypeScript", percentage: "70%" },
      { skill: "React Native", percentage: "80%" },
    ],
  },
  {
    title: "Backend",
    iconUrl: backend,
    skills: [
      { skill: "Node Js", percentage: "70%" },
      { skill: "Express Js", percentage: "65%" },
      { skill: "Next Js", percentage: "70%" },
    ],
  },
  {
    title: "Tools",
    iconUrl: tools,
    skills: [
      { skill: "Git & Github", percentage: "70%" },
      { skill: "Visual Studio Code", percentage: "75%" },
      { skill: "Webpack", percentage: "60%" },
      { skill: "Responsive Design", percentage: "75%" },
    ],
  },
  {
    title: "Soft Skills",
    iconUrl: soft,
    skills: [
      { skill: "Problem Solving", percentage: "80%" },
      { skill: "Collaboration", percentage: "85%" },
      { skill: "Attention to Detail", percentage: "75%" },
    ],
  },
];

export const WORK = [
  {
    title: "React Native developer at lofty logix",
    date: "May 2024 - Nov 2024",
    responsibilities: [
      "Builds mobile apps for both Android and iOS using a single codebase.",
      "Uses JavaScript and React concepts to create mobile interfaces.",
      "Can integrate native code (Java, Swift, Objective-C) for advanced features.",
      "Supports hot reloading for quick testing and faster development cycles.",
    ],
  },
  {
    title: "Next js  developer at lofty logix",
    date: "Nov 2024 - Present",
    responsibilities: [
      "Builds both frontend and backend using React and API routes.",
      "Optimizes performance and SEO with SSR and static site generation.",
      "Uses file-based routing system for quick page creation.",
      "Built-in image optimization, fast loading, and code splitting.",
    ],
  },
];

export const TEST = [
  {
    name: "James Miller",
    imgUrl: profile1,
    review:
      "Your work as a frontend developer was exceptional. The UI is visually stunning, responsive, and highly functional. Your attention to detail, adherence to best practices, and seamless collaboration made the project a success. Highly recommended!",
  },
  {
    name: "Emma Davis",
    imgUrl: profile3,
    review:
      "Excellent work! The interface is clean, responsive, and user-friendly. Your expertise in modern frameworks and attention to detail ensured a polished final product. Truly a professional job!",
  },
  {
    name: "William Taylor",
    imgUrl: profile2,
    review:
      "Outstanding job! The backend is robust, efficient, and seamlessly integrated with the frontend. Your attention to scalability and security demonstrates true expertise. Highly recommend your work!",
  },
  {
    name: "Charlotte Moore",
    imgUrl: profile4,
    review:
      "Impressive work! You delivered a seamless full-stack solution with a polished frontend and a reliable, efficient backend. Your ability to manage both ends with such expertise is remarkable. Highly recommended!",
  },
];
