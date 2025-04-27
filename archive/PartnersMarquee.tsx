import Image from "next/image";

// Hardcoded list of partner logos based on files in /public/partner-companies/
const partnerLogos = [
  "Image-1.png",
  "Image-2.png",
  "Image.png",
  "groq_seeklogo.png",
  "meta_logo.png",
  "Companies-1.png",
  "Companies-2.png",
  "Companies-3.png",
  "Companies-4.png",
  "Companies.png",
  "Group.png"
];

const PartnersMarquee = () => {
  // Removed fs.readdirSync logic

  // Duplicate logos for seamless loop
  const allLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto text-center">
        <h4 className="text-sm font-semibold uppercase text-gray-500 tracking-wider mb-8">
          Integrated With Your Favorite Platforms
        </h4>
        <div className="relative overflow-hidden w-full">
          <div className="flex animate-marquee-infinite">
            {allLogos.map((logoFile, index) => (
              <div key={index} className="flex-shrink-0 mx-6 flex items-center justify-center h-12">
                <Image
                  // Construct the path relative to the /public directory
                  src={`/partner-companies/${logoFile}`}
                  alt={`Partner Logo ${index + 1}`}
                  width={120} // Adjust width as needed, maintain aspect ratio
                  height={48} // Adjust height as needed
                  className="object-contain max-h-10"
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