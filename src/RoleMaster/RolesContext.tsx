import React, { createContext, useContext, useState } from "react";


export interface Role {
  name: string;
  description: string;
  status: string;
  activityLogs: string;
}

const initialRoles: Role[] = [
  { name: "Read Only", description: "View access to system data", status: "ACTIVE", activityLogs: "Viewed by Admin" },
  { name: "User", description: "Standard user access with edit capabilities", status: "ACTIVE", activityLogs: "Edited 2 days ago" },
  { name: "Administrator", description: "Full administrative access", status: "ACTIVE", activityLogs: "Created on Aug 1" },
  { name: "Super Admin", description: "Complete system control", status: "ACTIVE", activityLogs: "No recent actions" },
  { name: "Operator", description: "Operational access for daily tasks", status: "INACTIVE", activityLogs: "Logged in today" },
];

const RolesContext = createContext<{
  roles: Role[];
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
} | undefined>(undefined);

export function RolesProvider({ children }: { children: React.ReactNode }) {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  return (
    <RolesContext.Provider value={{ roles, setRoles }}>{children}</RolesContext.Provider>
  );
}

export function useRoles() {
  const context = useContext(RolesContext);
  if (!context) throw new Error("useRoles must be used within a RolesProvider");
  return context;
}
