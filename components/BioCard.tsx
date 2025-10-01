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

        <div className="mt-6">
          <div className="flex items-center space-x-3 bg-neutral-800/80 rounded-xl p-3 border border-white/10">
            <img
              src="https://cdn.discordapp.com/avatars/1198458819366359044/a5246d6402c36aeb8342dbfc8ec0c7d4?size=1024"
              alt="status avatar"
              className="w-12 h-12 rounded-full"
            />

            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="font-medium text-white">velourgraves</span>
              </div>

              {!spotify ? (
                <p className="text-sm text-gray-400">doing nothing</p>
              ) : (
                <div className="flex items-center space-x-2">
                  <img
                    src={spotify.album_art_url}
                    alt="album art"
                    className="w-5 h-5 rounded-sm"
                  />
                  <p className="text-sm text-gray-300 truncate max-w-[500px]">
                    Listening to {spotify.song} – {spotify.artist}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center space-x-6">
          <a
            href="https://youtube.com/@juggurtrap"
            target="_blank"
            className="p-3 rounded-full bg-transparent text-gray-400 
               hover:text-red-500 hover:scale-125 hover:shadow-[0_0_20px_rgba(255,0,0,0.7)] 
               transition transform duration-300"
          >
            <FaYoutube className="text-3xl" />
          </a>

          <a
            href="https://discord.gg/2UbqAAjYZ6"
            target="_blank"
            className="p-3 rounded-full bg-transparent text-gray-400 
               hover:text-indigo-400 hover:scale-125 hover:shadow-[0_0_20px_rgba(99,102,241,0.7)] 
               transition transform duration-300"
          >
            <FaDiscord className="text-3xl" />
          </a>

          <a
            href="https://getfluxus.vercel.app/"
            target="_blank"
            className="p-3 rounded-full bg-transparent text-gray-400 
               hover:text-green-400 hover:scale-125 hover:shadow-[0_0_20px_rgba(34,197,94,0.7)] 
               transition transform duration-300"
          >
            <FaGlobe className="text-3xl" />
          </a>
        </div>
      </div>
    </Tilt>
  );
}
