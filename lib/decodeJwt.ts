import { jwtDecode } from "jwt-decode";
import { getToken } from "./token";

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

export function decodeJWT(token?: string): TokenPayload | null {
  const localToken = token ?? getToken();

  if (!localToken) {
    return null;
  }

  try {
    const decoded = jwtDecode<TokenPayload>(localToken);
    const now = Date.now() / 1000;

    if (decoded.exp && decoded.exp < now) {
      console.warn("JWT expired");
      return null;
    }
    return decoded;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
}