module.exports = {
    topics : [
    "Resumos",
    "Adm",
    "Introcomp",
    "Interpet",
    "Mobiliza",
    "Web",
    "Mobile",
    "Eletropet",
    "JACEE",
    "Pesquisa",
    "PET Talk",
    "Divulgação Científica"],
    goTo : function goTo(index){
        for(var i = 0; i < this.topics.length; i++){
            let str = this.topics[i]
            if(str.indexOf("**") == 0 || str.indexOf("~~") == 0){
                this.topics[i] = str.slice(2, (str.length-2))
            }
        }
        for(var i = 0; i < index; i++){
            this.topics[i] = "~~" + this.topics[i] + "~~"
        }
        this.topics[index] = "**" + this.topics[index] + "**"
    } 
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
