const _ = require('lodash')
const joi = require('joi')

//Const
exports.TYPES = {
    BOOLEAN: "boolean",
    STRING: "string",
    NUMBER: "number",
    UNDEFINED: "undefined",
    NULL: "null"
}

/**
 * an array the holds strings representing JavaScript's primitive types, all in lowercase
 * The new ES6's Symbol type is excluded for now (mainly because I have no idea what is it)
 * Todo: Learn about Symbols
 * @type {[string]}
 */
exports.primitiveTypesLowerCase = [exports.TYPES.BOOLEAN, exports.TYPES.STRING, exports.TYPES.NUMBER, exports.TYPES.UNDEFINED, exports.TYPES.NULL]

const numberOfArrayElementsSchema = joi.number().required().positive().integer().allow(0)

//Utils
/**
 *
 * @param typeRepresentation
 * @returns {boolean}
 */
const mustBePrimitiveTypeString = (typeRepresentation) => {
    if (! _.includes(exports.primitiveTypesLowerCase, typeRepresentation)) {
        throw new Error("type isn't a JS primitive type")
    }
}

const produceVariableOfType = (type) => {
    type = type.toLowerCase().trim()
    mustBePrimitiveTypeString(type)
    if (type === exports.TYPES.NULL) {
        return null
    }
    if (type === exports.TYPES.UNDEFINED) {
        return undefined
    }
    if (type === exports.TYPES.NUMBER) { //TODO: make random
        return 7 //"Isn't seven the most powerfully magical number?" -Tom Riddle, a.k.a Lord Voldemort/The dark lord/he who must not be named
    }
    if (type === exports.TYPES.STRING) {
        return "foo" //TODO: make random
    }
    if (type === exports.TYPES.BOOLEAN) {
        return true //staying positive :)
    }
    throw new Error('THIS SHOULD NEVER HAPPEN!!!!') //TODO: stop playing around and name your variables properly
}

const isValidInteger = (number) => {
    const { error } = joi.validate(number, numberOfArrayElementsSchema)
    if (error) throw new Error(`the number of elements of the array ${number} is not valid`)
}

//final methods

exports.array = (numberOfElements = 4, type = "string") => {
    isValidInteger(numberOfElements)
    const result = []
    for (let i = 0; i < numberOfElements; i++) {
        result.push(produceVariableOfType(type))
    }
    return result
}


//EXECUTION //TODO: delete this block after exporting all you need

const testArray = exports.array()
console.log('generated array: ', testArray)
