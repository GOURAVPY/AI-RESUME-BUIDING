import {
  Briefcase,
  BriefcaseBusiness,
  FileText,
  FolderCode,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPinIcon,
  Phone,
  Sparkles,
  User,
  User2,
} from "lucide-react";

export const sectuions = [
  { id: "personal", name: "personal info", icon: User },
  { id: "summary", name: "summary info", icon: FileText },
  { id: "experience", name: "Experience info", icon: Briefcase },
  { id: "education", name: "Education info", icon: GraduationCap },
  { id: "project", name: "Project info", icon: FolderCode },
  { id: "skils", name: "Skils info", icon: Sparkles },
];

export const fields = [
  {
    key: "full_name", // ✅ FIXED
    label: "Full Name",
    icon: User2,
    type: "text",
    required: true,
  },
  {
    key: "email",
    label: "Email Address",
    icon: Mail,
    type: "text",
    required: true,
  },
  {
    key: "phone",
    label: "Phone Number",
    icon: Phone,
    type: "tel",
  },
  {
    key: "location",
    label: "Location",
    icon: MapPinIcon,
    type: "text",
  },
  {
    key: "profession",
    label: "Profession",
    icon: BriefcaseBusiness,
    type: "text",
  },
  {
    key: "linkedin",
    label: "Linkedin Profile",
    icon: Linkedin,
    type: "url",
  },
  {
    key: "website",
    label: "Personal Website",
    icon: Globe,
    type: "url",
  },
];

export const newExperience = {
  company: "",
  position: "",
  start_date: "",
  end_date: "",
  description: "",
  is_current: false,
};
export const newEducation = {
  institution: "",
  degree: "",
  field: "",
  graduation_date: "",
  gpa: "",
};

export const newProject = {
  title: "",
  tech_stack: "",
  live_link: "",
  github_link: "",
  description: "",
};