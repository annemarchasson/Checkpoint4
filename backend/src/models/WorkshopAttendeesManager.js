const AbstractManager = require("./AbstractManager");

class SundayWorkshopManager extends AbstractManager {
  constructor() {
    super({ table: "workshop_attendees" });
  }

  create(workshopAttendees) {
    return this.database.query(
      `INSERT INTO ${this.table} (userId, workshopId)
      VALUES (?, ?)`,
      [workshopAttendees.userId, workshopAttendees.workshopId]
    );
  }
}

module.exports = SundayWorkshopManager;
