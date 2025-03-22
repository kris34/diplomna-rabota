function trimValues(valsArr) {
    return valsArr.map(val => (typeof val === "string" ? val.trim() : val));
};

module.exports =  { 
    trimValues
}