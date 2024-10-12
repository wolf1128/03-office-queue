"use strict";

import db from "../db/db";

/**
 * Deletes all data from the database.
 * This function must be called before any integration test, to ensure a clean database state for each test run.
 */

// I made this method asynchronous on purpose!
export function cleanup() {
  return new Promise<void>((resolve, reject) => {
    db.serialize(() => {
      db.run("DELETE FROM Ticket", (err) => {
        if (err) return reject(err);
        db.run("DELETE FROM Service", (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    });
  });
}
