const { embedColor, aboutText } = require("../config.json");
const { uptime } = require("process");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { version } = require("../package.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("about")
        .setDescription("What is P3 Timer?"),
    execute(interaction, args) { // skipcq: JS-0128
        const i = interaction.client.roles.length;

        const embed = new EmbedBuilder()
            .setTitle(interaction.client.user.username)
            .setDescription(aboutText)
            .addFields([
                {
                    name: "> Current instance started at",
                    value: `<t:${Math.floor(interaction.client.startTime / 1000)}:F>`,
                    inline: true
                },
                {
                    name: "Instance Uptime",
                    value: getUptimeString(),
                    inline: true
                },
                {
                    name: "> Roles Overwatching",
                    value: `${i} role${i > 1 ? "s" : ""}`,
                    inline: false
                },
                {
                    name: "> Version",
                    value: `v${version}`,
                    inline: false
                }
            ])
            .setColor(embedColor)
            .setTimestamp()

        interaction.reply({ embeds: [embed] });
    }
}

function getUptimeString() {
    const lSecs = uptime();
    const lMins = Math.floor(lSecs / 60);
    const rSecs = lSecs - (lMins * 60) ?? 0;
    const lHrs = Math.floor(lMins / 60);
    const rMins = lMins - (lHrs * 60) ?? 0;
    const lDays = Math.floor(lHrs / 24);
    const rHrs = lHrs - (lDays * 24) ?? 0;

    const days = lDays > 0 ? `${lDays}day${lDays > 1 ? "s" : ""} ` : "";
    const hrs = rHrs > 0 ? `${rHrs}hr${rHrs > 1 ? "s" : ""} ` : "";
    const mins = rMins > 0 ? `${rMins}min${rMins > 1 ? "s" : ""} ` : "";

    return `${days}${hrs}${mins}${Math.floor(rSecs)}sec${rSecs > 1 ? "s" : ""}`;
}