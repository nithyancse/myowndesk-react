//removeFunction(obj,"id","460")
//removeFunction(obj.results,"id","460") and results like [{id:'460',..}]
export function removeFunction(myObjects, prop, valu) {
    alert("www")
    return myObjects.filter(function (val) {
        return val[prop] !== valu;
    });
}