module.exports.goTo = (arr, index) => {
    if(arr === null || arr.length === 0 ){
        return arr
    }
    for (var i = 0; i < arr.length; i++) {
        let str = arr[i]
        if(str.indexOf("**") == 0 || str.indexOf("~~") == 0){
            arr[i] = str.slice(2, (str.length-2))
        }
    }
    for(var i = 0; i < index; i++){
        arr[i] = "~~" + arr[i] + "~~"
    }
    arr[index] = "**" + arr[index] + "**"
    return arr
}

module.exports.remove = (arr, top) => {
    return (arr.filter((elem) => (elem.localeCompare(top, undefined, { sensitivity: 'accent' }) !== 0)))
}

module.exports.add = (outArr, outTop) => {
    
    function isTheSame(read, searched) {
        return (read.localeCompare(searched, undefined, { sensitivity: 'accent' }) === 0)
    }

    function thereIsNot(arr, top) {
        return ((arr.findIndex((topic) => isTheSame(top, topic)) === -1 ) ? true : false)
    }

    return thereIsNot(outArr, outTop) ? outArr.concat(outTop) : outArr
}