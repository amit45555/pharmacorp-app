// Mock user store for demo purposes
export type Role = "superAdmin" | "approver" | "plantAdmin" | "user";

export interface MockUser {
  id: number;
  username: string;
  password: string;
  role: Role;
  permissions: string[];
}

function ensureViewPermissions(perms: string[]): string[] {
  const set = new Set(perms);
  perms.forEach((p) => {
    if (p.endsWith(":add") || p.endsWith(":edit") || p.endsWith(":update")) {
      set.add(p.replace(/:(add|edit|update)$/, ":view"));
    }
  });
  return Array.from(set);
}

export const mockUsers: MockUser[] = [
  {
    id: 1,
    username: "superadmin1",
    password: "superadmin123",
    role: "superAdmin",
    permissions: ensureViewPermissions([
      "dashboard:view",
      "users:create",
      "users:edit",
      "requests:view",
      "requests:approve",
      "settings:edit",
    ]),
  },
  {
    id: 2,
    username: "approver1",
    password: "approver123",
    role: "approver",
    permissions: ensureViewPermissions([
      "dashboard:view",
      "requests:view",
      "requests:approve",
    ]),
  },
  {
    id: 3,
    username: "plantadmin1",
    password: "plantadmin123",
    role: "plantAdmin",
    permissions: ensureViewPermissions(["dashboard:view", "plants:edit"]),
  },
  {
    id: 4,
    username: "user1",
    password: "user123",
    role: "user",
    permissions: ensureViewPermissions(["userform:submit"]),
  },
];
