// Quote Feature
const randomQuotes = require('random-quotes');

module.exports = function(controller) {

  controller.hears('tell me a quote', 'message', async(bot, message) => {
    const quote = randomQuotes.default();
    await bot.say(`> "${quote.body}" --${quote.author}`);
  });

}

