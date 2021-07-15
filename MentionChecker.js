class MentionChecker{
    constructor(nameChecker){
        this.nameChecker=nameChecker;
        this.mentionSigil="@";
        this.regex="/@[A-Za-z0-9]+/g"
    }

    formatMentions(message){
        return message.replace(/@[A-Za-z0-9]+/g,function(match){
            if(this.nameChecker.getIDFromName(match)!==null){
                return "<strong>"+match+"</strong>";
            }
            else{
                return match;
            }
        });
    }

}

module.exports = MentionChecker