import User from "../models/User";
import { users } from "../data/users";

export default class UserRepository {
  static getAll() {
    return users;
  }

  static findByEmail(email) {
    return users.find((u) => u.email === email);
  }

  static add(name, email, password) {
    const newUser = new User(users.length + 1, name, email, password, "user");
    users.push(newUser);
    return newUser;
  }
}
