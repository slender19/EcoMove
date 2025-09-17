import { stations } from "../data/stations";
import Station from "../models/Station";

export default class StationRepository {
  static getAll() {
    return stations;
  }

  static findById(id) {
    return stations.find((s) => s.id === id);
  }

  static add(name, location, capacity) {
    const newStation = new Station(stations.length + 1, name, location, capacity);
    stations.push(newStation);
    return newStation;
  }

  static update(id, name, location, capacity) {
    const station = this.findById(id);
    if (!station) return null;

    station.name = name;
    station.location = location;
    station.capacity = capacity;
    return station;
  }

  static delete(id) {
    const index = stations.findIndex((s) => s.id === id);
    if (index === -1) return false;

    stations.splice(index, 1);
    return true;
  }
}
