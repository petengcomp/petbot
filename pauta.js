module.exports = {
    topics : [
    "Resumos",
    "Adm",
    "Introcomp",
    "Interpet",
    "Mobiliza",
    "Topcom",
    "Web",
    "Mobile",
    "Eletropet",
    "JACEE",
    "Pesquisa",
    "PET Talk"],
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
    },
    add: function addTopic(top){
        this.topics.push(top)
    },
    remove: function removeTopic(top) {
        this.topics = this.topics.filter((value)=> 
            (value.localeCompare(top) !== 0)
        )
    }
}