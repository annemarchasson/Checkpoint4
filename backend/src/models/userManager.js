const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, email, hashedPassword, isAdmin, address, phoneNumber) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.hashedPassword,
        user.isAdmin,
        user.address,
        user.phoneNumber,
      ]
    );
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} SET firstname = ?, lastname = ?, email = ?, hashedPassword = ?, isAdmin = ?, address = ?, phoneNumber = ? WHERE id = ?`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.hashedPassword,
        user.isAdmin,
        user.address,
        user.phoneNumber,
        user.id,
      ]
    );
  }

  findByUsernameWithPassword(username) {
    return this.database.query(
      `select * from  ${this.table} where username = ?`,
      [username]
    );
  }
}

module.exports = UserManager;
