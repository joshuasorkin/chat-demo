class MentionChecker{
    constructor(NameChecker){
        this.NameChecker=NameChecker;
        this.mentionSigil="@";
        this.regex="/@[A-Za-z0-9]+/g"
    }

    formatMentions(message){
        return message.replace(/@[A-Za-z0-9]+/g,function(match){
            if(this.NameChecker.getIDFromName(match)!==null){
                return "<strong>"+match+"</strong>";
            }
            else{
                return match;
            }
    }

}

module.exports = MentionChecker