const emojis = {
    "爪": "🐘", "喵": "🐱", "邦": "💂", "啾": "🐔", "油": "🐲", "吱": "🐵",
    "三": "🕒", "四": "🕓", "五": "🕔", "六": "🕡", "陸": "🕕", "停": "🚫",
    "斗": "♥️", "母": "❤️", "東": "🩷", "南": "🧡", "洲": "💛",
    "湖": "💚", "新": "💙", "亞": "🩵", "嘉": "💜", "桃": "🤎",
    "鹽": "🩶", "花": "🤍", "蛋": "🏟️"
};
function convertGameToEmoji(gameText) {
    if (!gameText) return "";
    
    let convertedText = gameText;
    
    Object.keys(emojis).forEach(key => {
        const regex = new RegExp(key, 'g');
        convertedText = convertedText.replace(regex, emojis[key]);
    });
    
    return convertedText;
}