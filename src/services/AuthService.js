import UserRepository from "../repositories/UserRepository";

export default class AuthService {
  static login(email, password) {
    const user = UserRepository.findByEmail(email);

    if (!user) {
      return { success: false, message: "El correo no está registrado" };
    }

    if (user.password !== password) {
      return { success: false, message: "La contraseña es incorrecta" };
    }

    return { success: true, user };
  }

  static register(name, email, password) {
    const existing = UserRepository.findByEmail(email);
    if (existing) {
      return { success: false, message: "El correo ya está registrado" };
    }

    const newUser = UserRepository.add(name, email, password);
    return { success: true, user: newUser };
  }
}
