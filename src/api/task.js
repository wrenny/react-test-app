/* global Stamplay */

export function getAll () {
  return Stamplay.Object('task').get({})
}

export function add (task) {
  return Stamplay.Object('task').save(task)
}

export function update (task) {
  return Stamplay.Object('task').patch(task._id, task)
}

export function remove (_id) {
  return Stamplay.Object('task').remove(_id)
}
