
import React from "react";
import { BackgroundGradientDemo } from "./dev-back";

export default function Developers() {
  return (
    <section id="developers" className="py-20 px-6 mb-[0.5rem] bg-black">
      <div className="max-w-[55rem] mx-auto text-center">
        <h2 className="text-5xl font-bold text-white mb-6">
          Meet the Developer
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
          I’m Krith Thakker, a developer who loves building user-friendly
          applications and solving real-world problems.
        </p>
      </div>

      <div className="flex items-center justify-center mt-12">
        <BackgroundGradientDemo
          imgSrc="/devs/krith.jpg"
          description="Krith Thakker"
          githubLink="https://github.com/shaan-777"
          linkedinLink="https://www.linkedin.com/in/krith-thakker/"
          instagramLink="https://www.instagram.com/krith_thakker/" // optional
        />
      </div>
    </section>
  );
}
