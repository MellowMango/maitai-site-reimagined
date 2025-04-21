import PerformanceAnimation from "./PerformanceAnimation";

export default function IndustryPerformance() {
  return (
    <section className="py-20 px-4 max-w-5xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4 font-[var(--font-greycliff)]">Lowest Latency, Highest Throughput</h2>
      <p className="text-lg mb-8">
        Maitai has partnered with cutting-edge hardware partners for the fastest inference speeds and lowest latency available.
      </p>
      <PerformanceAnimation />
    </section>
  );
}
