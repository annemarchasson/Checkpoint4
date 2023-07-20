const AbstractManager = require("./AbstractManager");

class SundayWorkshopManager extends AbstractManager {
  constructor() {
    super({ table: "sunday_workshops" });
  }

  insert(workshop) {
    return this.database.query(
      `INSERT INTO ${this.table} (organizer, date, address, maxAttendees) VALUES (?, ?, ?, ?)`,
      [
        workshop.organizer,
        workshop.date,
        workshop.address,
        workshop.maxAttendees,
      ]
    );
  }

  update(workshop) {
    return this.database.query(
      `UPDATE ${this.table} SET organizer = ?, date = ?, address = ?, maxAttendees = ? WHERE id = ?`,
      [
        workshop.organizer,
        workshop.date,
        workshop.address,
        workshop.maxAttendees,
        workshop.id,
      ]
    );
  }
}
module.exports = SundayWorkshopManager;
