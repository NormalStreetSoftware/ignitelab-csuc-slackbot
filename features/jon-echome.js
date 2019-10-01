module.exports = function(controller) {

  controller.hears('best nfl team', 'message', async(bot, message) => {
    await bot.say("49erss are the " + message.text);
  });

}
