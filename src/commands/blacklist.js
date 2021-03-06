import { MessageEmbed } from 'discord.js'

import CompilerCommand from './utils/CompilerCommand'
import CompilerCommandMessage from './utils/CompilerCommandMessage'
import CompilerClient from '../CompilerClient'

export default class BlacklistCommand extends CompilerCommand {
    /**
     *  Creates the blacklist command
     * 
     * @param {CompilerClient} client
     */    
    constructor(client) {
        super(client, {
            name: 'blacklist',
            description: 'Blacklists a guild from sending requiests',
            developerOnly: true,
        });
    }

    /**
     * Function which is executed when the command is requested by a user
     *
     * @param {CompilerCommandMessage} msg
     */
    async run(msg) {
        const args = msg.getArgs();

        if (args.length != 1)
            return await msg.replyFail('You must supply a guild to blacklist!');

        const guild = args[0];

        if (this.client.messagerouter.blacklist.isBlacklisted(guild))
            return await msg.replyFail('Specified guild is already blacklisted');

        await this.client.messagerouter.blacklist.blacklist(guild);

        const embed = new MessageEmbed()
            .setTitle('Guild Blacklisted')
            .setDescription(`${guild} has been blacklisted`)
            .setThumbnail('https://imgur.com/KXZqNWq.png')
            .setColor(0xFF0000)
            .setFooter(`Requested by: ${msg.message.author.tag}`)
        await msg.dispatch('', embed);

    }
}