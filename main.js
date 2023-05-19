const configs = require("./configs.json");

function setConfig(config, where) {
    if(!config) return null;
    
    if(Array.isArray(config)) {
        process.env[where] = config.join(',');
    } else if(typeof config === "object") {
        const oks = Object.keys(config);
        
        for(let i=0; i<oks.length; i++) setConfig(config[oks[i]], where+(where.length?'_':'')+oks[i].toUpperCase());
    } else process.env[where] = config;
    
    return;
}

setConfig(configs, "");

console.log("Bot Starting...");

require("./app");