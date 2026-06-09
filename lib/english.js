//Achek Bot 2 — achek.com.ng

function escapeMarkdownV2(text) {
    return text.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, '\\$1'); 
}

exports.noToken = "The bot token cannot be empty, please create a bot via https://t.me/BotFather";

exports.first_chat = (botname, pushname) => {
    return escapeMarkdownV2(`Hi Dear ${pushname}, I am Achek Bot 2, your powerful WhatsApp assistant.\n\nJoin our channel to unlock the full menu 🔓\n\nAFTER JOINING CLICK HERE /menu\n\nWebsite: achek.com.ng`);
};
