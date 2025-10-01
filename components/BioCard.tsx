"use client";

import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import useSWR from "swr";
import {
  FaGithub,
  FaTwitter,
  FaDiscord,
  FaGlobe,
  FaSpotify,
  FaYoutube
} from "react-icons/fa";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BioCard() {
  const [mounted, setMounted] = useState(false);

  const discordId = "1198458819366359044";

  const { data } = useSWR(
    mounted ? `https://api.lanyard.rest/v1/users/${discordId}` : null,
    fetcher,
    { refreshInterval: 50 }
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const status = data?.data?.discord_status || "offline";
  const spotify = data?.data?.spotify;

  const statusColors: Record<string, string> = {
    online: "bg-green-500/20 text-green-400",
    idle: "bg-yellow-500/20 text-yellow-400",
    dnd: "bg-red-500/20 text-red-400",
    offline: "bg-gray-500/20 text-gray-400",
  };

  return (
    <Tilt
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      scale={1.05}
      transitionSpeed={1000}
      className="w-[600px] p-6 rounded-2xl bg-neutral-900 shadow-lg border border-white/10 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src="https://cdn.discordapp.com/avatars/1198458819366359044/a5246d6402c36aeb8342dbfc8ec0c7d4?size=1024"
              alt="profile"
              className="w-20 h-20 rounded-full border-2 border-white/20"
            />

            <span
              className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-neutral-900 ${status === "online"
                ? "bg-green-400"
                : status === "idle"
                  ? "bg-yellow-400"
                  : status === "dnd"
                    ? "bg-red-400"
                    : "bg-gray-400"
                }`}
            ></span>
          </div>

          <div>
            <h1 className="text-2xl font-bold drop-shadow-[0_0_10px_#fff]">
              velourgraves
            </h1>
            <p className="text-sm text-gray-400">any prns</p>
          </div>
        </div>

        <p className="mt-4 text-gray-300 leading-relaxed">
          self-taught dev : beginner : ui designer
        </p>

        <div className="mt-6 flex flex-col space-y-3">
          <a
            href="https://youtube.com/@juggurtrap"
            target="_blank"
            className="flex items-center space-x-3 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            <FaYoutube className="text-xl" />
            <span>YouTube</span>
          </a>

          <a
            href="https://discord.gg/2UbqAAjYZ6"
            target="_blank"
            className="flex items-center space-x-3 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            <FaDiscord className="text-xl text-indigo-400" />
            <span>Discord Server</span>
          </a>

          <a
            href="https://getfluxus.vercel.app/"
            target="_blank"
            className="flex items-center space-x-3 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            <FaGlobe className="text-xl text-green-400" />
            <span>Fluxus</span>
          </a>
        </div>

        {spotify && (
          <div className="mt-4 relative p-4 rounded-xl overflow-hidden bg-neutral-800">
            <img
              src={spotify.album_art_url}
              alt="album art bg"
              className="absolute inset-0 w-full h-full object-cover blur-lg opacity-70"
            />

            <div className="relative flex items-center space-x-3">
              <img
                src={spotify.album_art_url}
                alt="album art"
                className="w-14 h-14 rounded-md shadow-md"
              />

              <div className="truncate">
                <p className="text-sm font-semibold text-white truncate">
                  {spotify.song}
                </p>
                <p className="text-xs text-gray-200 truncate">
                  {spotify.artist}
                </p>
              </div>

              <FaSpotify className="ml-auto text-green-400 text-xl drop-shadow" />
            </div>
          </div>
        )}
      </div>
    </Tilt>
  );
}
