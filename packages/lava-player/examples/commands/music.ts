import type { CommandInteraction } from "discord.js";
import { GuildMember } from "discord.js";
import type { ArgsOf, Client } from "discordx";
import { Discord, Once, Slash, SlashOption } from "discordx";

import * as Lava from "../../src/index.js";

@Discord()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MusicPlayer {
  node: Lava.Node | undefined;

  @Once("ready")
  onReady([]: ArgsOf<"ready">, client: Client): void {
    const nodeX = new Lava.Node({
      host: {
        address: process.env.LAVA_HOST ?? "localhost",
        connectionOptions: { resumeKey: "discordx", resumeTimeout: 15 },
        port: process.env.LAVA_PORT ? Number(process.env.LAVA_PORT) : 2333,
      },

      // your Lavalink password
      password: process.env.LAVA_PASSWORD ?? "",

      send(guildId, packet) {
        const guild = client.guilds.cache.get(guildId);
        if (guild) {
          guild.shard.send(packet);
        }
      },
      shardCount: 0, // the total number of shards that your bot is running (optional, useful if you're load balancing)
      userId: client.user?.id ?? "", // the user id of your bot
    });

    nodeX.on("event", (e) => {
      switch (e.type) {
        case "TrackStartEvent":
          console.log(e);
          break;
        case "TrackEndEvent":
          console.log(e);
          break;
        case "WebSocketClosedEvent":
          console.log(e);
          break;
        default:
          console.log(e);
          break;
      }
    });

    nodeX.on("error", (e) => {
      console.log(e);
    });

    client.ws.on("VOICE_STATE_UPDATE", (data: Lava.VoiceStateUpdate) => {
      nodeX.voiceStateUpdate(data);
    });

    client.ws.on("VOICE_SERVER_UPDATE", (data: Lava.VoiceServerUpdate) => {
      nodeX.voiceServerUpdate(data);
    });

    this.node = nodeX;
  }

  @Slash("play")
  async play(
    @SlashOption("song") song: string,
    interaction: CommandInteraction
  ): Promise<void> {
    await interaction.deferReply();

    if (!(interaction.member instanceof GuildMember) || !interaction.guildId) {
      interaction.followUp("could not process this command, try again");
      return;
    }

    if (!this.node) {
      interaction.followUp("lavalink player is not ready");
      return;
    }

    if (!interaction.member.voice.channelId) {
      interaction.followUp("lavalink player is not ready");
      return;
    }

    await interaction.deferReply();

    const player = this.node.players.get(interaction.guildId);

    if (!player.voiceServer) {
      await player.join(interaction.member.voice.channelId, { deaf: true });
    }

    const res = await this.node.load(`ytsearch:${song}`);
    const track = res.tracks[0];

    if (track) {
      await player.play(track);
      await interaction.followUp(`playing ${track.info.title}`);
    } else {
      await interaction.followUp("Song not found with given input");
    }

    return;
  }
}