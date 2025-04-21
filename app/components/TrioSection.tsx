import Image from "next/image";

export default function TrioSection() {
  return (
    <section className="py-16 px-4 max-w-5xl mx-auto text-center">
      <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
        <div className="flex-1 flex flex-col items-center">
          <Image src="/illustrations/Site v1 Assets/trio images/living-models.png" alt="Living Models" width={160} height={160} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2 font-[var(--font-greycliff)]">Living Models</h3>
          <p>We build and fully manage AI models tailored to your app. Every edge case and failure makes the model smarter—steadily improving toward flawless performance.</p>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <Image src="/illustrations/Site v1 Assets/trio images/blazing-fast.png" alt="Blazing Fast" width={160} height={160} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2 font-[var(--font-greycliff)]">Blazing Fast</h3>
          <p>Maitai has partnered with cutting-edge hardware partners for the fastest inference speeds and lowest latency available.</p>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <Image src="/illustrations/Site v1 Assets/trio images/radar-autocorrections.png" alt="LLM Autocorrections" width={160} height={160} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2 font-[var(--font-greycliff)]">LLM Autocorrections</h3>
          <p>Maitai detects faults in AI output and then takes corrective action before damage is done. Sleep well at night knowing your AI output follows your expectations.</p>
        </div>
      </div>
    </section>
  );
}
