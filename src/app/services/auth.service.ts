import { Injectable, signal } from '@angular/core';
import { User, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'elprogreso_usuarios';
  private readonly SESSION_KEY = 'elprogreso_sesion_activa';

  // Signals reactivos para el estado de la aplicación
  readonly currentUser = signal<User | null>(this.getStoredSession());
  readonly registeredUsers = signal<User[]>(this.getStoredUsers());

  constructor() {}

  /**
   * Obtiene los usuarios guardados en localStorage
   */
  getStoredUsers(): User[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const data = localStorage.getItem(this.USERS_KEY);
        return data ? JSON.parse(data) : [];
      }
    } catch (error) {
      console.error('Error al leer usuarios de localStorage:', error);
    }
    return [];
  }

  /**
   * Obtiene la sesión activa desde localStorage
   */
  getStoredSession(): User | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const data = localStorage.getItem(this.SESSION_KEY);
        return data ? JSON.parse(data) : null;
      }
    } catch (error) {
      console.error('Error al leer sesión de localStorage:', error);
    }
    return null;
  }

  /**
   * Registra un nuevo usuario en localStorage
   */
  register(name: string, email: string, password: string): AuthResponse {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      return {
        success: false,
        message: 'Todos los campos son obligatorios.'
      };
    }

    const currentUsers = this.getStoredUsers();

    // Validar si el correo ya existe
    const exists = currentUsers.some(u => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      return {
        success: false,
        message: 'Ya existe un usuario registrado con este correo electrónico.'
      };
    }

    const newUser: User = {
      id: 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      name: cleanName,
      email: cleanEmail,
      password: password,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...currentUsers, newUser];
    this.saveUsersToStorage(updatedUsers);

    return {
      success: true,
      message: '¡Registro exitoso! Ya puedes iniciar sesión con tu cuenta.',
      user: newUser
    };
  }

  /**
   * Valida credenciales e inicia sesión desde localStorage
   */
  login(email: string, password: string): AuthResponse {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      return {
        success: false,
        message: 'Por favor, ingresa tu correo y contraseña.'
      };
    }

    const currentUsers = this.getStoredUsers();
    const userFound = currentUsers.find(u => u.email.toLowerCase() === cleanEmail);

    if (!userFound) {
      return {
        success: false,
        message: 'No existe ninguna cuenta registrada con este correo.'
      };
    }

    if (userFound.password !== password) {
      return {
        success: false,
        message: 'La contraseña ingresada es incorrecta. Inténtalo nuevamente.'
      };
    }

    // Guardar sesión activa
    this.saveSessionToStorage(userFound);

    return {
      success: true,
      message: `¡Bienvenido/a de nuevo, ${userFound.name}!`,
      user: userFound
    };
  }

  /**
   * Cierra la sesión activa
   */
  logout(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(this.SESSION_KEY);
      }
      this.currentUser.set(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  /**
   * Elimina un usuario de la lista almacenada
   */
  deleteUser(userId: string): void {
    const currentUsers = this.getStoredUsers();
    const updatedUsers = currentUsers.filter(u => u.id !== userId);
    this.saveUsersToStorage(updatedUsers);

    // Si el usuario eliminado era el activo, cerrar sesión
    const active = this.currentUser();
    if (active && active.id === userId) {
      this.logout();
    }
  }

  /**
   * Limpia todos los registros almacenados (útil para pruebas)
   */
  clearAllUsers(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(this.USERS_KEY);
        localStorage.removeItem(this.SESSION_KEY);
      }
      this.registeredUsers.set([]);
      this.currentUser.set(null);
    } catch (error) {
      console.error('Error al limpiar localStorage:', error);
    }
  }

  // Métodos privados auxiliares
  private saveUsersToStorage(users: User[]): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      }
      this.registeredUsers.set(users);
    } catch (error) {
      console.error('Error al guardar usuarios en localStorage:', error);
    }
  }

  private saveSessionToStorage(user: User): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
      }
      this.currentUser.set(user);
    } catch (error) {
      console.error('Error al guardar sesión en localStorage:', error);
    }
  }
}
