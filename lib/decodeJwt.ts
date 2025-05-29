import { jwtDecode } from "jwt-decode";

export type TokenPayload = {
  userName: string;
  email?: string;
  role: string;
  exp?: number;
  companyCode: string;
  userCode: string;
  isActive: boolean;
  erpUserCode: string;
  warehouseCode: string;
  areaCode: string;
  shiftID: number;
  SalesRepName?: string;
};

export function decodeJWT(): TokenPayload | null {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const now = Date.now() / 1000;

    if (decoded.exp && decoded.exp < now) {
      console.warn("JWT Expired");
      return null;
    }
    return decoded;
  } catch (error) {
    console.error("failed to Decode token", error);
    return null;
  }
}
