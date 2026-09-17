import ensimLogo from "../assets/logos/ensim.png";
import ensiasLogo from "../assets/logos/ensias.jpg";
import uaeLogo from "../assets/logos/uae.png";

import stmArchitecture from "../assets/projects/stm/01-architecture.jpg";
import stmSignin from "../assets/projects/stm/02-signin.jpg";
import stmJobConfig from "../assets/projects/stm/03-job-config.jpg";
import stmJobOverride from "../assets/projects/stm/04-job-override.jpg";
import stmJobContentModal from "../assets/projects/stm/05-job-content-modal.jpg";
import stmQuickEdit from "../assets/projects/stm/06-quick-edit.jpg";
import stmBranchSelect from "../assets/projects/stm/07-branch-select.jpg";
import stmValidationError from "../assets/projects/stm/08-validation-error.jpg";
import stmJobTriggered from "../assets/projects/stm/09-job-triggered.jpg";
import stmReportReady from "../assets/projects/stm/10-report-ready.jpg";
import stmHistory from "../assets/projects/stm/11-history.jpg";
import stmFaq from "../assets/projects/stm/12-faq.jpg";

import iotLogin from "../assets/projects/iot/01-login.jpg";
import iotSignup from "../assets/projects/iot/02-signup.jpg";
import iotChart from "../assets/projects/iot/03-chart.jpg";
import iotAddDevice from "../assets/projects/iot/04-add-device.jpg";
import iotDeviceList from "../assets/projects/iot/05-device-list.jpg";

import cloudArchitecture from "../assets/projects/cloud/01-architecture.svg";

import docomptiaDashboard from "../assets/projects/docomptia/01-dashboard.png";
import docomptiaInbox from "../assets/projects/docomptia/02-inbox.png";
import docomptiaInvoices from "../assets/projects/docomptia/03-invoices.png";
import docomptiaApprovals from "../assets/projects/docomptia/04-approvals.png";
import docomptiaAccounting from "../assets/projects/docomptia/05-accounting.png";
import docomptiaExports from "../assets/projects/docomptia/06-exports.png";
import docomptiaDocuments from "../assets/projects/docomptia/07-documents.png";
import docomptiaSuppliers from "../assets/projects/docomptia/08-suppliers.png";
import docomptiaClients from "../assets/projects/docomptia/09-clients.png";
import docomptiaReports from "../assets/projects/docomptia/10-reports.png";
import docomptiaIntegrations from "../assets/projects/docomptia/11-integrations.png";
import docomptiaSettings from "../assets/projects/docomptia/12-settings.png";
import docomptiaUserProfile from "../assets/projects/docomptia/13-user-profile.png";

export const profile = {
  name: "Mohamed Nacer Er-Ragragy",
  displayName: "Nacer Er-Ragragy",
  title: "Full-Stack Software Engineer",
  location: "Paris, France",
  email: "mnacer082@gmail.com",
  phone: "+33 7 71 53 99 95",
  linkedin: "https://linkedin.com/in/nacererragragy",
  github: "https://github.com/NacerRgr",
  stack: ["Java", "Spring Boot", "TypeScript", "React"],
  summary:
    "I work across Java, Spring Boot, React and TypeScript to speed up internal tools, simplify user journeys and ship changes safely.",
};

export type IntroLine = {
  emoji: string;
  text: string;
};

export const introLines: IntroLine[] = [
  { emoji: "🛠️", text: "Currently at LesFurets.com" },
  { emoji: "💼", text: "Open to freelance projects" },
  { emoji: "📍", text: "Paris, France" },
];

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  title: string;
  role: string;
  impact: string;
  description: string;
  features: string[];
  tech: string[];
  note: string;
  images: ProjectImage[];
  link?: string;
};

export const projects: Project[] = [
  {
    title: "Docomptia: Invoice-to-Accounting Platform",
    role: "Project Lead & Backend Engineer (team of 3)",
    impact: "1,471 automated tests",
    description:
      "I built Docomptia with two teammates for the French e-invoicing reform. It gives accounting teams one place to receive invoices, review OCR results, prepare balanced entries and export them to their accounting software.",
    features: [
      "Receives e-invoices, PDFs and scanned documents in one inbox",
      "Extracts invoice fields with Tesseract and shows confidence scores",
      "Separates operator, accountant and admin responsibilities",
      "Blocks export until debit and credit entries are balanced",
      "Keeps documents, approvals and exports traceable",
    ],
    tech: ["React", "TypeScript", "Java", "Spring Boot", "Python", "FastAPI", "PostgreSQL", "Docker"],
    note: "Built by a team of three for our ENSIM capstone project in 2026. Protected by 804 frontend and 667 backend tests.",
    images: [
      { src: docomptiaDashboard, alt: "Docomptia dashboard showing invoice processing pipeline, recent invoices, and items needing attention" },
      { src: docomptiaInbox, alt: "Inbox screen reviewing incoming invoices and their OCR processing status" },
      { src: docomptiaInvoices, alt: "Invoices list showing validation, approval, accounting, and export status per invoice" },
      { src: docomptiaApprovals, alt: "Approvals screen for invoices awaiting an accounting decision" },
      { src: docomptiaAccounting, alt: "Accounting screen reviewing balanced debit/credit entries before export" },
      { src: docomptiaExports, alt: "Exports screen with the ready-to-export queue and export history" },
      { src: docomptiaDocuments, alt: "Documents screen for searching and retrieving processed invoice files" },
      { src: docomptiaSuppliers, alt: "Suppliers directory with SIRET and VAT legal identifiers" },
      { src: docomptiaClients, alt: "Clients directory screen" },
      { src: docomptiaReports, alt: "Reports screen with spending breakdown and invoice processing analytics" },
      { src: docomptiaIntegrations, alt: "Integrations screen listing accounting software connections and invoice channels" },
      { src: docomptiaSettings, alt: "Workspace settings screen with organization identity and localization preferences" },
      { src: docomptiaUserProfile, alt: "User profile screen with personal details and preferences" },
    ],
  },
  {
    title: "CI Automation Platform",
    role: "Full-Stack Engineer",
    impact: "75% faster validation",
    description:
      "At STMicroelectronics, I built this internal service to replace a slow, fragmented validation workflow. Engineers could configure and launch Jenkins jobs, follow progress in real time and retrieve reports without jumping between tools.",
    features: [
      "Dynamic build configuration",
      "Multi-job launches with custom parameters",
      "Real-time notifications and reports",
      "JSON import/export & personal history",
      "Secure LDAP login",
    ],
    tech: ["React", "Spring Boot", "MySQL", "Docker", "Gerrit"],
    note: "Used by several teams at STMicroelectronics.",
    images: [
      {
        src: stmArchitecture,
        alt: "System architecture diagram of the CI automation platform, showing the front end, backend, and its integrations with Jenkins, Gerrit, LDAP, and a relational database",
      },
      { src: stmSignin, alt: "Sign-in screen for the CI automation platform" },
      { src: stmJobConfig, alt: "Job configuration form with distro, machine, and target selectors" },
      { src: stmJobOverride, alt: "Job configuration with override parameters expanded" },
      { src: stmJobContentModal, alt: "Modal showing raw artifact configuration content" },
      { src: stmQuickEdit, alt: "Quick-edit dialog for a build override value" },
      { src: stmBranchSelect, alt: "Branch reference selector for a coupled patch" },
      { src: stmValidationError, alt: "Form validation warning when a required field is missing" },
      { src: stmJobTriggered, alt: "Confirmation notification after successfully triggering a build job" },
      { src: stmReportReady, alt: "Notification that a job's report is ready, with a link to view it" },
      { src: stmHistory, alt: "Build job history table with statuses and report links" },
      { src: stmFaq, alt: "In-app FAQ panel with a sample README preview" },
    ],
  },
  {
    title: "IoT Sensor Platform",
    role: "Full-Stack Engineer",
    impact: "Real-time data on AWS",
    description:
      "I built this platform at ENSIM to learn what a real-time IoT pipeline looks like end to end: device onboarding, secure data ingestion, live dashboards and cloud deployment.",
    features: [
      "Real-time dashboards with dynamic charts",
      "Secure authentication using JWT",
      "Customizable sensor management",
      "Fast data transmission with MQTT and WebSockets",
      "Deployed on AWS (EC2, DynamoDB, VPC)",
    ],
    tech: ["Next.js", "React", "Spring Boot", "MongoDB", "MQTT", "AWS"],
    note: "Course project at ENSIM. Deployed on AWS (EC2, DynamoDB, VPC).",
    images: [
      { src: iotLogin, alt: "Login screen for the IoT sensor platform" },
      { src: iotSignup, alt: "Sign-up screen for the IoT sensor platform" },
      { src: iotChart, alt: "Real-time line chart of sensor temperature readings over time" },
      { src: iotAddDevice, alt: "Add-device form with a live JSON payload preview" },
      { src: iotDeviceList, alt: "Dashboard listing connected devices and recent sensor data" },
    ],
  },
  {
    title: "Black Friday Survival: Cloud Architecture",
    role: "Cloud Engineer (team of 2)",
    impact: "90K concurrent users",
    description:
      "With a teammate, I took Google's Online Boutique demo and designed the AWS infrastructure needed for a simulated Black Friday peak. Over three weeks, we increased the load from 1,000 to 90,000 concurrent users and adjusted the platform after each test.",
    features: [
      "Provisioned an EKS cluster, multi-AZ network and IAM roles with Terraform",
      "Progressive load testing from 1K to 90K concurrent users across weekly milestones",
      "Cost optimization with mixed on-demand/spot instances and workload rightsizing",
      "Autoscaling (HPA), network policies, and automated security scans",
      "Chaos engineering drills and incident runbooks with MTTR tracking",
    ],
    tech: ["Terraform", "AWS", "Kubernetes", "Grafana"],
    note: "Team project based on Google's open-source Online Boutique. Our work focused on cloud infrastructure, reliability and cost.",
    images: [
      {
        src: cloudArchitecture,
        alt: "Cloud architecture diagram: load testing tools ramping traffic through an Application Load Balancer into an AWS EKS cluster running the Online Boutique microservices, with Terraform provisioning the VPC and IAM roles, HPA autoscaling pods, mixed on-demand/spot node groups, Grafana and Prometheus monitoring, security scans and network policies, and chaos engineering drills feeding incident runbooks with MTTR tracking",
      },
    ],
    link: "https://github.com/NacerRgr/architecture_cloud_project",
  },
];

export type Experience = {
  company: string;
  role: string;
  type: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    company: "Freelance",
    role: "Full-Stack Software Engineer, Document Automation",
    type: "Freelance",
    location: "Paris, France · Remote",
    start: "Mar 2026",
    end: "Sep 2026",
    highlights: [
      "Designed and developed Docomptia, a modular SaaS platform for automated supplier invoice processing.",
      "Built the frontend with React and TypeScript and the backend with Java and Spring Boot.",
      "Developed an OCR microservice using Python, FastAPI, Tesseract, and OpenCV.",
      "Implemented invoice import, data extraction, review, approval, accounting-entry preparation, and export workflows.",
      "Built secure REST APIs with JWT authentication and multi-tenant data isolation.",
      "Designed an open-source integration module for ERP and accounting software.",
      "Managed task planning, estimation, prioritization, code reviews, and technical delivery within a three-person team.",
      "Explored a containerized open-source language model to improve OCR results and accounting automation.",
    ],
    tech: ["React", "TypeScript", "Java", "Spring Boot", "Python", "FastAPI", "JWT", "Docker"],
  },
  {
    company: "LesFurets.com",
    role: "Software Engineer",
    type: "Alternance",
    location: "Paris, France",
    start: "Oct 2025",
    end: "Present",
    highlights: [
      "Redesigned a core user journey and measured a 25% retention improvement through A/B tests.",
      "Develop and maintain a high-traffic insurance platform on Java 21 / Java EE, React, and TypeScript.",
      "Hold automated test coverage above 80% with Jest, React Testing Library, Cypress, JUnit, and Mockito.",
      "Ship continuous deployments to GCP through GitLab CI/CD.",
      "Design backend services and diagnose production incidents.",
      "Build reusable components and maintain the team's Storybook design system.",
    ],
    tech: ["React", "TypeScript", "Jest", "Cypress", "GitLab CI/CD", "GCP"],
  },
  {
    company: "STMicroelectronics",
    role: "Full-Stack Software Engineer",
    type: "Internship",
    location: "Le Mans, France",
    start: "Mar 2025",
    end: "Sep 2025",
    highlights: [
      "Cut validation-job execution time by 75%.",
      "Solution adopted by multiple teams across STMicroelectronics.",
      "Built a Spring Boot REST API to launch Jenkins builds and tests, manage dynamic configuration, and store execution history in MySQL.",
      "Implemented LDAP authentication with JWT and Redis caching.",
      "Added real-time job monitoring via WebSockets and a React administration interface.",
      "Dockerized the solution and deployed it to a Linux server through Jenkins CI/CD.",
    ],
    tech: ["Spring Boot", "React", "MySQL", "JWT", "Docker", "Jenkins"],
  },
  {
    company: "Office des Changes",
    role: "Data Analyst",
    type: "Internship",
    location: "Morocco",
    start: "Aug 2022",
    end: "Sep 2022",
    highlights: [
      "Built Python predictive models reaching 92% accuracy with Statsmodels.",
      "Analyzed transaction lifecycles to surface business insights.",
      "Cleaned and prepared data using Pandas and NumPy.",
    ],
    tech: ["Python"],
  },
  {
    company: "NVIT Solutions",
    role: "Backend Developer",
    type: "Internship",
    location: "Remote",
    start: "Jul 2021",
    end: "Aug 2021",
    highlights: [
      "Developed secure REST APIs using Java and Spring Boot.",
      "Added unit and integration tests with JUnit and Mockito.",
      "Improved backend performance and integrated an external URL-shortening API.",
      "Stored application data in MySQL; worked Agile with code reviews, Git, and GitHub.",
    ],
    tech: ["Spring Boot", "MySQL", "Git"],
  },
];

export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skills: SkillGroup[] = [
  { category: "Languages", skills: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "C++"] },
  { category: "Frontend", skills: ["React", "HTML5", "CSS3", "Jest", "React Testing Library", "Cypress"] },
  { category: "Backend", skills: ["Spring Boot", "Java EE", "Apache Shiro", "JUnit", "Mockito", "JWT"] },
  { category: "DevOps & Cloud", skills: ["Docker", "Kubernetes", "Jenkins", "Git", "GitLab CI/CD", "GCP", "AWS"] },
  { category: "Databases", skills: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"] },
  { category: "Methods", skills: ["Agile", "Scrum", "Kanban", "Jira", "Confluence", "CI/CD", "TDD", "Code Review"] },
];

export type EducationItem = {
  school: string;
  degree: string;
  detail: string;
  location: string;
  start: string;
  end: string;
  logo: string;
};

export const education: EducationItem[] = [
  {
    school: "ENSIM, Le Mans Université",
    degree: "Engineer's Degree",
    detail: "Software Engineering",
    location: "Le Mans, France",
    start: "Sep 2023",
    end: "Sep 2025",
    logo: ensimLogo,
  },
  {
    school: "ENSIAS",
    degree: "Engineer's Degree",
    detail: "Computer Science & Systems Analysis",
    location: "Rabat, Morocco",
    start: "Sep 2021",
    end: "Jul 2023",
    logo: ensiasLogo,
  },
  {
    school: "Université Abdelmalek Essaâdi",
    degree: "Bachelor's Degree",
    detail: "Computer Science",
    location: "Tétouan, Morocco",
    start: "Sep 2018",
    end: "Sep 2021",
    logo: uaeLogo,
  },
];

export type Language = {
  name: string;
  level: string;
};

export const languages: Language[] = [
  { name: "French", level: "Fluent" },
  { name: "English", level: "Professional, TOEIC B2" },
  { name: "Arabic", level: "Native" },
];
