module.exports = function(controller) {

	  controller.hears('hello', 'message', async(bot, message) => {
		      await bot.say("goodbye");
		    });

}
