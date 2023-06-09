const Discord = require("discord.js");
const fetch = require("node-fetch");

const {
  DISCORD_BOT_TOKEN,
  MIIBO_API_TOKEN,
  MIIBO_AGENT_ID,
} = require("./config.json");

const client = new Discord.Client({
  intents: ["MessageContent", "Guilds", "GuildMessages"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === "hi") {
    message.channel.send("hi!");
  } else if (message.mentions.has(client.user)) {
    try {
      // メンションを削除してトリムする
      const content = message.content.replace(/<@\d+>/g, "").trim();

      const responseMessage = await fetchMebo(content, message.channel.id);
      message.channel.send(responseMessage);
    } catch (err) {
      console.error(err);
      // TODO: 固定のテキストは別ファイルに切り出す
      message.channel.send(
        "す...すみません！壊しちゃいました...ちょっと待ってて下さい..."
      );
    }
  }
});

async function fetchMebo(message, channelId) {
  const meboResult = await fetch("https://api-mebo.dev/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: MIIBO_API_TOKEN,
      agent_id: MIIBO_AGENT_ID,
      utterance: message,
      uid: channelId,
    }),
  });

  const json = await meboResult.json();

  return json.bestResponse.utterance;
}

client.login(DISCORD_BOT_TOKEN);
