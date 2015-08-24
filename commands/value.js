var CommandUtil = require('../src/command_util').CommandUtil;
var l10n_file = __dirname + '/../l10n/commands/look.yml';
var l10n = new require('localize')(require('js-yaml').load(require('fs').readFileSync(l10n_file).toString('utf8')), undefined, 'zz');

exports.command = function (rooms, items, players, npcs, Commands)
{
    return function (args, player)
    {
        var room = rooms.getAt(player.getLocation());
        if (args) {
            // Look at items in the room first
            var thing = CommandUtil.findItemInRoom(items, args, room, player, true);

            if (!thing) {
                // Then the inventory
                thing = CommandUtil.findItemInInventory(args, player, true);
            }

            if (!thing) {
                // then for an NPC
                thing = CommandUtil.findNpcInRoom(npcs, args, room, player, true);
            }

            // TODO: look at players

            if (!thing) {
                player.sayL10n(l10n, 'ITEM_NOT_FOUND');
                return;
            }

            player.say(thing.value(player.getLocale()));
            return;
        }

    };
};
