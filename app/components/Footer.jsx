import React from 'react'
import { BsTwitter } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="bg-[#03071E] text-white px-10 py-2  sticky top-full">
    <div className="flex flex-col sm:flex-row justify-between items-center">
      <div className="text-md pb-4 font-fredoka text-center mt-5">
        <span>Built by </span>
        <a href="#" target="_blank">
          Builders
        </a>
        <span>&nbsp; | All rights reserved</span>
      </div>
      <div className="flex items-center justify-between w-52">
        <div className="border-2 border-[#FCF8E8] rounded-full p-2">
          <a
            href="https://www.linkedin.com/in/abbas-khan-033802222"
            target="_blank"
            rel="noreferrer"
          >
            <BsLinkedin className="text-lg hover:animate-pulse active:animate-ping" />
          </a>
        </div>
        <div className="border-2 border-[#FCF8E8] rounded-full p-2">
          <a
            href="https://github.com/Abbas-Khann/SC-DEX-XDC"
            target="_blank"
            rel="noreferrer"
          >
            <BsGithub className="text-lg hover:animate-pulse active:animate-ping" />
          </a>
        </div>
        <div className="border-2 border-[#FCF8E8] rounded-full p-2">
          <a href="https://twitter.com/KhanAbbas201" target="_blank" rel="noreferrer">
            <BsTwitter className="text-lg hover:animate-pulse active:animate-ping" />
          </a>
        </div>
      </div>
    </div>
  </footer>
  )
}
