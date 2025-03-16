import React from "react";
import { bg } from "../images/exporter";

const Message = () => {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
      <div className="flex items-center justify-center min-h-screen px-4">
        <p className="max-w-3xl text-pink-600 text-center text-lg leading-relaxed bg-white/60 p-6 rounded-lg shadow-md">
          I love you, Dhwrwmsuli Freaky Bhaigyashree Singh Swargiary Rawat. You
          are the sweetest girl I have ever seen in my entire life. I can't even
          imagine my life without you. I have created this website so that
          whenever you miss me, you can add our images here and write any
          message you want. This website is for my baby girl who loves my
          Melody. I will never leave you, baaabuu. You are the most beautiful
          girl—please never call yourself ugly or think that you are not good
          enough for me. You mean everything to me, and I love everything about
          you. Flirting with you on September 19, 2024, was the best decision of
          my life. You are so beautiful that I thought you would reject me. You
          are just perfect—I've never seen someone so perfect. I can handle your
          mood swings, baby, and I just want to spend my life with you. Just be
          with me, hold my hands. Hope you liked it... If you want me to add
          more features to this site, just tell me. ❤️
        </p>
      </div>
    </>
  );
};

export default Message;
