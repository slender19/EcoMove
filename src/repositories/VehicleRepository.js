import { vehicles } from "../data/vehicles";
import Vehicle from "../models/Vehicle";

export default class VehicleRepository {
  static getAll() {
    return vehicles;
  }

  static findById(id) {
    return vehicles.find((v) => v.id === id);
  }

  static findByStation(stationId) {
    return vehicles.filter((v) => v.stationId === stationId);
  }

  static add(type, status, stationId) {
    const newVehicle = new Vehicle(vehicles.length + 1, type, status, stationId);
    vehicles.push(newVehicle);
    return newVehicle;
  }

  static update(id, type, status, stationId) {
    const vehicle = this.findById(id);
    if (!vehicle) return null;

    vehicle.type = type;
    vehicle.status = status;
    vehicle.stationId = stationId;
    return vehicle;
  }

  static delete(id) {
    const index = vehicles.findIndex((v) => v.id === id);
    if (index === -1) return false;

    vehicles.splice(index, 1);
    return true;
  }
}
