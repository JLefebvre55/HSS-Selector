const hss_json = require('./src/hss-v1.json')

//The yield stress and Young's Modulus of steel (`MPa`)
const yieldstress = 350;
const modulus = 200000;

/**
 * Finds the lightest square steel HSS for the given member specifications.
 * @param {Number} force The internal force of the member, in kilonewtons `kN`.
 * @param {Number} length The member length, in meters `m`.
 * @param {Number} yieldFOS The factor of safety for elastic yielding. Defaults to `2.0`.
 * @param {Number} bucklingFOS The factor of safety for Euler buckling. Defaults to `3.0`.
 * @param {Number} radiusLengthFactor The factor to divide the length by to get the minimum radius of gyration. Defaults to `200`.
 */
function getLightestHSS(force, length, yieldFOS = 2, bucklingFOS = 3, radiusLengthFactor = 200){
    let temp = Object.values(hss_json).filter(member=>{
        return member.area >= yieldFOS*force/yieldstress && 
        member.i >= bucklingFOS*force*length*length/Math.PI/Math.PI/modulus && 
        member.radius >= length/radiusLengthFactor
    }).sort((a,b)=>{
        return a.mass-b.mass
    });
    return temp[temp.length-1]
}