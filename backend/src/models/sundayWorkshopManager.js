const AbstractManager = require("./AbstractManager");

class SundayWorkshopManager extends AbstractManager {
  constructor() {
    super({ table: "sunday_workshops" });
  }

  insert(workshop) {
    return this.database.query(
      `INSERT INTO ${this.table} (date, address, maxAttendees) VALUES (?, ?, ?)`,
      [workshop.date, workshop.address, workshop.maxAttendees]
    );
  }

  update(workshop) {
    return this.database.query(
      `UPDATE ${this.table} SET date = ?, address = ?, maxAttendees = ? WHERE id = ?`,
      [workshop.date, workshop.address, workshop.maxAttendees, workshop.id]
    );
  }
}
module.exports = SundayWorkshopManager;
