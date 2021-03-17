import Axios from 'axios'

// const PROD_URL = 'http://127.0.0.1/icesi/salas-icesi-back/public/api/'
const DEV_URL = 'http://127.0.0.1/icesi/salas-icesi-back/public/api/'

const axios = Axios.create({
  baseURL: DEV_URL
})

const BASE_ROUTES = {
  area: 'area',
  carrera: 'carrera',
  ingreso: 'ingreso',
  inscripcioncarrera: 'inscripcioncarrera',
  persona: 'persona',
  personaCedula: 'persona-cedula',
  rol: 'rol',
  sala: 'sala',
  tiposala: 'tiposala',
  setup: 'setup',
  puedeIngresar: 'puede-ingresar' // puede-ingresar/id_sala/cedula
}

/**
 * List all items
 * @return {Promise}
 */
function list () {
  return axios.get(this.baseRoute)
}

/**
 * Create new item
 * @param {Object} itemInfo the new Item
 * @return {Promise}
 */
function create (itemInfo) {
  return axios.post(this.baseRoute, itemInfo)
}

/**
 * Retrieve a single item
 * @param {numbre} id
 * @return {Promise}
 */
function get (id = '') {
  if (id !== '') id = '/' + id
  return axios.get(this.baseRoute + id)
}

/**
 * Update an item
 * @param {numbre} id the id of the item
 * @param {Object} itemInfo the new Item information
 */
function update (id, itemInfo) {
  if (id !== '') id = '/' + id
  return axios.put(this.baseRoute + id, itemInfo)
}

/**
 * Remove an item
 * @param {number} id
 * @return {Promise}
 */
function remove (id) {
  if (id !== '') id = '/' + id
  return axios.delete(this.baseRoute + id)
}

/**
 * Make request
 * @param {String} url
 * @param {String} method HTTP METHOD
 * @param {object} data
 * @param {obect} params URL params
 * @return {Promise}
 */
function request (url, method = 'get', data = {}, params = {}) {
  // console.log()
  return axios.request({ url, method, data, params })
}

/**
 * Conection to section of the server.
 */
export class Api {
  constructor (baseRoute) {
    this.baseRoute = baseRoute
  }

  onRoute (baseRoute) {
    this.baseRoute = baseRoute
    return this
  }

  static ROUTES () {
    return BASE_ROUTES
  }
}

Api.prototype.list = list
Api.prototype.create = create
Api.prototype.get = get
Api.prototype.update = update
Api.prototype.remove = remove
Api.prototype.request = request
