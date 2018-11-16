/** are all values of arr truthy? */
function all(arr: Array<any>): boolean {
    if (!Array.isArray(arr)) throw 'all() only works on arrays'
    return arr.reduce((a, b) => a && b, true)
}

/**
 * magic function to assert we have the right type
 * @param {string} type - type we want
 * @param {any} val - value to check
 * @param {boolean} partial
 * @param {function} [cb] - predicate for children if val has a .map() method,
 *                 otherwise just a function to call if the type check succeeds
 */
function expect(type: string, val: any, partial: boolean = false, cb?: Function): boolean {
    const check = (type === 'array') ? Array.isArray(val) : typeof val === type

    if (check) { // if we have the type we want
        if (cb) {
            if (type === 'array') return all(val.map(cb)) // check all children of array
            else return cb() // check children of object
        }
        else return true
    } else if (partial) { // if we allow undefined
        return typeof val === 'undefined'
    } else { // if we don't allow undefined
        return false
    }
}

export function isTask(task: any, partial: boolean = false): boolean {
    return typeof task === 'object'
        && expect('string', task.title, partial)
        && expect('string', task.description, partial)
        && expect('number', task.hoursEstimated, partial)
        && expect('boolean', task.completed, partial)
        && expect('undefined', task.comments)
}

export function isComment(comment: any): boolean {
    return typeof comment === 'object'
        && expect('string', comment.name)
        && expect('string', comment.comment)
}