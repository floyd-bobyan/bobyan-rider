import { callScript } from "./client";

export type Driver = {
  id: string;
  name: string;
  contract: string;
  vehicle: string;
  fleet: string;
};

export async function loginRider(id: string, password: string) {
  return callScript<{ success: boolean; message?: string; driver?: Driver }>(
    "login",
    { id, password }
  );
}