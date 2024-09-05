"use client"

import { IUserLogin, IUserReg } from "@/type/user"


const base_url = process.env.BASE_URL_API || 'http://localhost:8000/api'

export const regUser = async (data:IUserReg) => {
    const res = await fetch(`${base_url}/users/register`, {
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    })
    const result = await res.json()
    return {result, ok: res.ok}
}

export const loginUser = async (data: IUserLogin) => {
    const res = await fetch(`${base_url}/users/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Unknown error");
    }
  
    const result = await res.json();
  
    if (result.status === "ok" && result.token && result.user) {
        localStorage.setItem("token", result.token);
        return { user: result.user, ok: true };
      } else {
        throw new Error("Invalid login response");
      }
  };
  