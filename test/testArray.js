const fooBar = require('../index')
const chai = require('chai')
const assert = chai.assert

/* Map not working with mocha
        const mapTypeToIsTypeFunction = new Map([
            [fooBar.TYPES.BOOLEAN, assert.isBoolean],
            [fooBar.TYPES.STRING, assert.isString],
            [fooBar.TYPES.NUMBER, assert.isNumber],
            [fooBar.TYPES.UNDEFINED, assert.isUndefined],
            [fooBar.TYPES.NULL, assert.isNull]
        ])*/

const typeAssertion = (typeString) => {
    if (typeString === fooBar.TYPES.BOOLEAN) return assert.isBoolean
    if (typeString === fooBar.TYPES.STRING) return assert.isString
    if (typeString === fooBar.TYPES.NUMBER) return assert.isNumber
    if (typeString === fooBar.TYPES.UNDEFINED) return assert.isUndefined
    if (typeString === fooBar.TYPES.NULL) return assert.isNull
    else throw new Error(`there was an error while trying to map ${typeString} to an assertion`)
}

describe('array', () => {
    const testEachElementInAnArray = (array, assertion) => {
        array.forEach(element => {
            assertion(element)
        })
    }

    it('should return an array of length 4 full of strings when called with no arguments', () => {
        const array = fooBar.array()

        //assertions
        assert.isArray(array, 'array() should return an array')
        assert.equal(array.length, 4)
        testEachElementInAnArray(array, (element) => {
            assert.isString(element, 'the returned array elements should all be strings')
        })
    })
    it('should return an empty array when called with 1st parameter set to 0 (without setting the second parameter)', () => {
        const array = fooBar.array(0)

        //assertions
        assert.isArray(array, 'array() should return an array')
        assert.equal(array.length, 0)
    })
    it('should return an array of length 10, where each element is a number', () => {
        const array = fooBar.array(10, "number")

        //assertions
        assert.isArray(array, 'array(10, \"number\") should return an array')
        assert.equal(array.length, 10, "array(10, \"number\") should return an array of length 10")
        testEachElementInAnArray(array, element => {
            assert.isNumber(element, 'array(10, \"number\") elements should be all numbers')
        })
    })
    it('should return an array with a specific type when called with 1st parameter set to 5 and second parameter set to a valid type parameter', () => {
        fooBar.primitiveTypesLowerCase.forEach(type => {
            const array = fooBar.array(5, type)

            //assertions
            assert.isArray(array, 'array() should return an array')
            assert.equal(array.length, 5)
            testEachElementInAnArray(array, element => {
                typeAssertion(type)(element, `array(5, ${type}) should return array of 5 elements of type ${type}`)
            })
        })
    })
    it('should return an array an empty array when called with 0 as 1st param, and a valid type second parameter', () => {
        fooBar.primitiveTypesLowerCase.forEach(type => {
            const array = fooBar.array(0, type)

            //assertions
            assert.isArray(array, `array(0, "${type}") should return an array`)
            assert.equal(array.length, 0)
        })
    })
})