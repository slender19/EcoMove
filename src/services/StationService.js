import StationRepository from "../repositories/StationRepository";

export default class StationService {
  static createStation(name, location, capacity) {
    if (!name || !location || !capacity) {
      return { success: false, message: "Todos los campos son obligatorios" };
    }

    if (capacity <= 0) {
      return { success: false, message: "La capacidad debe ser mayor a 0" };
    }

    const newStation = StationRepository.add(name, location, capacity);
    return { success: true, station: newStation };
  }

  static listStations() {
    return StationRepository.getAll();
  }

  static updateStation(id, name, location, capacity) {
    const updated = StationRepository.update(id, name, location, capacity);
    if (!updated) {
      return { success: false, message: "Estación no encontrada" };
    }
    return { success: true, station: updated };
  }

  static deleteStation(id) {
    const deleted = StationRepository.delete(id);
    if (!deleted) {
      return { success: false, message: "Estación no encontrada" };
    }
    return { success: true, message: "Estación eliminada correctamente" };
  }
}
