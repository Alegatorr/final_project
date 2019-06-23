var random = require("./random.js");

function random_shuffle (items){
    for (let i=items.length-1;i>=0;--i){
        let temp=items[i],other=random(i+1);
        items[i]=items[other];
        items[other]=temp;
    }
}


module.exports = random_shuffle;