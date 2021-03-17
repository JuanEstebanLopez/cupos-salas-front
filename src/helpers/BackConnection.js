/* eslint-disable    */

import { Api } from './api'
const ROUTES = Api.ROUTES()
const api = new Api(ROUTES.setup)
console.log(api)

class CuposSalaCOnnection {
  // constructor () { }

  /**
  * comprueba si el backend tiene información
  * @return {Promise} {setup: boolean}
  */
  isSetup() {
    return api.onRoute(ROUTES.setup).get()
  }

  /**
  * Configura la información inicial del servidor.
  * @param {Object} obj Usuario a crear como administrador
  * @param {String} obj.cedula cedula del usuario
  * @param {String} obj.nombre Nombre del usuario
  * @param {String} obj.email Email del usuario
  * @param {boolean} obj.profesor Indica si el usuario es profesor
  * @return {Promise} {mensaje: String}
  */
  setup({ cedula, nombre, email, profesor = false }) {
    return api.onRoute(ROUTES.setup).create({ cedula, nombre, email, profesor, admin: true })
  }

  /**
  * Registra un nuevo usuario.
  * @param {Object} obj Usuario a crear
  * @param {String} obj.cedula cedula del usuario
  * @param {String} obj.nombre Nombre del usuario
  * @param {String} obj.email Email del usuario
  * @param {boolean} obj.profesor Indica si el usuario es profesor
  * @param {boolean} obj.admin Indica si el usuario es administrador
  * @return {Promise} {mensaje: String}
  */
  createPersona({ cedula, nombre, email, profesor = false, admin = false }) {
    return api.onRoute(ROUTES.persona).create({ cedula, nombre, email, profesor, admin })
  }

  /**
  * @param {Number} id
  * @return {Promise} {id: Number, cedula: String, nombre: String, email: String, profesor: Boolean, admin: Boolean}
  */
  persona(id) {
    return api.onRoute(ROUTES.persona).get(id)
  }

  /**
  * @param {String} cedula
  * @return {Promise} {persona}
  */
  personaCedula(cedula) {
    return api.onRoute(ROUTES.personaCedula).get(cedula)
  }

  /**
  * @return {Promise} [{persona}, ...]
  */
  personas() {
    return api.onRoute(ROUTES.persona).list()
  }

  /**
  * Registra una nueva sala.
  * @param {Object} obj Sala a crear
  * @param {String} obj.nombre Nombre de la sala, debe ser único
  * @param {Number} obj.capacidad Capacidad de cuantas personas pueden entrar a la sala
  * @param {Number} obj.tipo_sala_id Identificador del tipo de salas
  * @param {Number} obj.propietario_sala_id Identificador del elemento al que pertenece la sala (Rol o Área)
  * @return {Promise} {mensaje: String}
  */
  createSala({ nombre, capacidad, tipo_sala_id, propietario_sala_id }) {
    return api.onRoute(ROUTES.sala).create({ nombre, capacidad, tipo_sala_id, propietario_sala_id })
  }

  /**
  * @param {Number} id
  * @return {Promise} {id: Number, nombre: String, capacidad: Number, equipos: Number, tipo_sala_id: Number, propietario_sala_id: Number, ocupacion: Number, disponibilidad: Number}
  */
  sala(id) {
    return api.onRoute(ROUTES.sala).get(id)
  }

  /**
  * @return {Promise} [{sala}, ...]
  */
  salas() {
    return api.onRoute(ROUTES.sala).list()
  }

  puedeIngresarASala(id_sala, cedula) {
    return api.onRoute(ROUTES.puedeIngresar).get(id_sala + '/' + cedula)
  }

  /**
  * Registra un ingreso o intento de ingreso a la sala.
  * @param {Object} obj Registro de Ingreso
  * @param {Number} obj.persona_id ID de de la persona
  * @param {Number} obj.sala_id ID de de la sala
  * @param {boolean} obj.pudo_ingresar Indica si pudo ingresar o canceló el ingreso
  * @return {Promise} {mensaje: String}
  */
  ingresoASala({ persona_id, sala_id, pudo_ingresar = true }) {
    return api.onRoute(ROUTES.ingreso).create({ persona_id, sala_id, pudo_ingresar })
  }

  /**
  * Actualiza el estado de un ingreso a una sala.
  * @param {Number} id ID del ingreso a la sala
  * @param {Object} obj Registro de Ingreso
  * @param {Number} obj.pudo_ingresar Indica si pudo ingresar o canceló el ingreso
  * @param {Number} obj.invalido Indica si se marcó correctamente la hora de salida
  * @param {boolean} obj.horaSalida Indica si el usuario indicó que iba a salir de la sala
  * @return {Promise} {mensaje: String}
  */
  ActualizarIngresoASala(id, { pudo_ingresar = true, invalido = false, hora_salida = true }) {
    return api.onRoute(ROUTES.ingreso).update(id, { pudo_ingresar, invalido, hora_salida })
  }
}

export default CuposSalaCOnnection
