"use client";

import * as React from "react";
import { AuthContext } from "@/context/auth-context";

export function useAuth() {
  return React.useContext(AuthContext);
}
