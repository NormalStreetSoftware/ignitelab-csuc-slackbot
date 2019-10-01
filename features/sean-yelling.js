module.exports = function(controller) {

  controller.hears('yell', 'message', async(bot, message) => {
    await bot.say("THIS IS WHAT YELLING IS LIKE");
  });

}
