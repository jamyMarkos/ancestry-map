/**
 * Sorts events by their eventDate in ascending order
 * @param {Array} events - Array of events objects
 * @returns {Array} - Sorted array of events
 */

export const sortEventsByDate = (events: any) => {
  return events.sort(
    (a: any, b: any) =>
      new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
  );
};
