import VehicleRepository from "../repositories/VehicleRepository";
import StationRepository from "../repositories/StationRepository";

export default class VehicleService {
  static createVehicle(type, status, stationId) {
    if (!type || !status || !stationId) {
      return { success: false, message: "Todos los campos son obligatorios" };
    }

    const station = StationRepository.findById(stationId);
    if (!station) {
      return { success: false, message: "La estación no existe" };
    }

    const newVehicle = VehicleRepository.add(type, status, stationId);
    return { success: true, vehicle: newVehicle };
  }

  static listVehicles() {
    return VehicleRepository.getAll();
  }

  static listVehiclesByStation(stationId) {
    return VehicleRepository.findByStation(stationId);
  }

  static updateVehicle(id, type, status, stationId) {
    const updated = VehicleRepository.update(id, type, status, stationId);
    if (!updated) {
      return { success: false, message: "Vehículo no encontrado" };
    }
    return { success: true, vehicle: updated };
  }

  static deleteVehicle(id) {
    const deleted = VehicleRepository.delete(id);
    if (!deleted) {
      return { success: false, message: "Vehículo no encontrado" };
    }
    return { success: true, message: "Vehículo eliminado correctamente" };
  }
}
