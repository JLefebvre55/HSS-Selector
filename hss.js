const hss_json = require('./src/hss-v1.json')

//The yield stress and Young's Modulus of steel (`MPa`)
const yieldstress = 350;
const modulus = 200000;

/**
 * Finds the lightest square steel HSS for the given member and safety specifications.
 * @param {Number} force The internal force of the member, in kilonewtons `kN`.
 * @param {Number} length The member length, in meters `m`.
 * @param {Number} yieldFOS The factor of safety for elastic yielding. Defaults to `2.0`.
 * @param {Number} bucklingFOS The factor of safety for Euler buckling. Defaults to `3.0`.
 * @param {Number} radiusLengthFactor The factor to divide the length by to get the minimum radius of gyration. Defaults to `200`.
 * @returns {{"designation": String, "mass": Number, "area": Number, "i": Number, "radius": Number}} The lightest safe HSS designation, with data.
 */
function getLightestHSS(force, length, yieldFOS = 2, bucklingFOS = 3, radiusLengthFactor = 200){
    return getAllPossibleHSS(force, length, yieldFOS, bucklingFOS, radiusLengthFactor).sort((a,b)=>{
        return a[1].mass-b[1].mass
    })[0];
}

/**
 * Finds all possible square steel HSS for the given member and safety specifications.
 * @param {Number} force The internal force of the member, in kilonewtons `kN`.
 * @param {Number} length The member length, in meters `m`.
 * @param {Number} yieldFOS The factor of safety for elastic yielding. Defaults to `2.0`.
 * @param {Number} bucklingFOS The factor of safety for Euler buckling. Defaults to `3.0`.
 * @param {Number} radiusLengthFactor The factor to divide the length by to get the minimum radius of gyration. Defaults to `200`.
 * @returns {{"designation": String, "mass": Number, "area": Number, "i": Number, "radius": Number}[]} All possible safe HSS designations, with data.
 */
function getAllPossibleHSS(force, length, yieldFOS = 2, bucklingFOS = 3, radiusLengthFactor = 200){
    return Object.entries(hss_json).filter(member=>{
        return member[1].area >= yieldFOS*force/yieldstress && 
        member[1].i >= bucklingFOS*force*length*length/Math.PI/Math.PI/modulus && 
        member[1].radius >= length/radiusLengthFactor
    }).map(hss=>{
        //Append key to data
        hss[1].designation = hss[0];
        return hss[1];
    });
}

console.log(getAllPossibleHSS(45.9, 3));