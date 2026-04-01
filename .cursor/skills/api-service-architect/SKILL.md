---
name: api-service-architect
description: Expert in creating modular, type-safe API services using Axios and TypeScript.
---

# Service Implementation Rules:

1. **Type Definition**: Always define `interface` for the API response.
2. **HTTP Methods**: Use appropriate methods: `get`, `post` (create), `put`/`patch` (update), `delete`.
3. **URL Paths**: Use template literals for dynamic IDs (e.g., `` `/users/${id}` ``).
4. **Axios Integration**: Use the shared `@/services/axiosInstance`.

## Example Structure:

```typescript
import { axiosInstance } from "@/services/axiosInstance";
import { User, CreateUserDto } from "@/types/user";

export const userService = {
  getAll: (params?: object) => axiosInstance.get<User[]>("/users", { params }),

  getById: (id: string) => axiosInstance.get<User>(`/users/${id}`),

  create: (data: CreateUserDto) => axiosInstance.post<User>("/users", data),

  update: (id: string, data: Partial<CreateUserDto>) =>
    axiosInstance.put<User>(`/users/${id}`, data),

  delete: (id: string) => axiosInstance.delete(`/users/${id}`),
};
```
