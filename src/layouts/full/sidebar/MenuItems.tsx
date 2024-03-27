import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconReceiptRefund,
  IconStethoscope,
  IconUserCircle,
  IconDisabled,
  IconListDetails,
  IconLogin,
  IconMoodHappy,
  IconSettings,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Patient",
    icon: IconDisabled,
    href: "/patient",
  },
  {
    id: uniqueId(),
    title: "Doctor",
    icon: IconStethoscope,
    href: "/doctor",
  },
  {
    id: uniqueId(),
    title: "Forms",
    icon: IconListDetails,
    href: "/case",
  },
  // {
  //   id: uniqueId(),
  //   title: "Followup Forms",
  //   icon: IconReceiptRefund,
  //   href: "/followup",
  // },
  {
    id: uniqueId(),
    title: "Profile",
    icon: IconUserCircle,
    href: "/profile",
  },
  {
    navlabel: true,
    subheader: "Settings",
  },
  {
    id: uniqueId(),
    title: "Typography",
    icon: IconSettings,
    href: "/utilities/typography",
  },
  {
    id: uniqueId(),
    title: "Shadow",
    icon: IconCopy,
    href: "/utilities/shadow",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
  {
    navlabel: true,
    subheader: "Extra",
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons",
  },
  {
    id: uniqueId(),
    title: "Sample Page",
    icon: IconAperture,
    href: "/sample-page",
  },
];

export default Menuitems;
