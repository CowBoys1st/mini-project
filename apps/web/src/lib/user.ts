'use client';

import { Event } from '@/type/chart';
import { IUserLogin, IUserReg } from '@/type/user';

const base_url = process.env.BASE_URL_API || 'http://localhost:8000/api';

export const regUser = async (data: IUserReg) => {
  try {
    const res = await fetch(`${base_url}/users/register`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();
    return result ;
    
  } catch (err) {
    console.log(err);
  }
 
 
};

export const loginUser = async (data: IUserLogin) => {
  const res = await fetch(`${base_url}/users/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Unknown error');
  }

  const result = await res.json();

  if (result.status === 'ok' && result.token && result.user) {
    localStorage.setItem('token', result.token);
    return { user: result.user, ok: true };
  } else {
    throw new Error('Invalid login response');
  }
};

export const logOut = async () => {
  localStorage.removeItem('token');
};

export const getUserById = async (id: number) => {
  const res = await fetch(`${base_url}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Failed to fetch user data');
  }

  const result = await res.json();

  if (result.status === 'ok' && result.users) {
    return { user: result.users, ok: true };
  } else {
    throw new Error('Invalid user data');
  }
};

export const getPoints = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found in localStorage");
  }

  try {
    const response = await fetch('http://localhost:8000/api/users/point', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg ? data.msg.message : 'Unknown error occurred');
    }

    return data; 
  } catch (error) {
    console.error("Error fetching points:", error);
    throw error;
  }
};


export const deletePoints = async()=>{
  const token = localStorage.getItem("token")

  if (!token) throw "no token found"

  try {
    const response = await fetch ('http://localhost:8000/api/users/point', {
      method:"DELETE",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json()

    return data;
  } catch (err) {
    console.log("error fetching delete points:", err);
    
  }
}

export const getUserEvents = async () => {
  const token = localStorage.getItem('token')

  try {
    const response = await fetch('http://localhost:8000/api/events/eo/eo', {
      method:"GET",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json()
    console.log(data.events);
    

    return data

  } catch (error) {
    console.log(error);
  }
}

export const verifyToken = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    return null;
  }

  try {
    const response = await fetch('http://localhost:8000/api/users/get/token', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to verify token");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null; 
  }
};
