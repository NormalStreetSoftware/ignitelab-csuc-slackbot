module.exports = function(controller) {

  controller.hears('hi', 'message', async(bot, message) => {
    await bot.say("by");
  });

}
