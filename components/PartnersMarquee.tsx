import Image from "next/image";
import fs from "fs";
import path from "path";

const partnerLogosDirectory = path.join(
  process.cwd(),
  "public/partner-companies",
);

const PartnersMarquee = () => {
  // Read filenames from the directory
  let filenames = [];
  try {
    filenames = fs.readdirSync(partnerLogosDirectory);
  } catch (error) {
    console.error("Error reading partner logos directory:", error);
    // Handle the error appropriately, maybe return null or an error message
    return null;
  }

  const logos = filenames
    .filter(
      (file) => !file.startsWith(".") && /\.(png|jpg|jpeg|svg|webp)$/.test(file),
    )
    .map((file) => ({
      src: `/partner-companies/${file}`,
      alt: file.replace(/\.[^/.]+$/, "").replace(/-/g, " "), // Basic alt text from filename
    }));

  // Duplicate logos for a seamless loop
  const extendedLogos = [...logos, ...logos];

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Integrations with the tools you already use
        </h2>
        <div
          className="mt-10 w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee motion-safe:animate-marqueeHoverPause">
            {extendedLogos.map((logo, index) => (
              <div
                key={index}
                className="mx-8 flex h-12 w-36 flex-shrink-0 items-center justify-center lg:mx-10 lg:w-40"
              >
                <Image
                  className="max-h-full max-w-full object-contain"
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={48}
                  unoptimized
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee; 