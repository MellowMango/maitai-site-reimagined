import ContinuousImprovementAnimation from "./ContinuousImprovementAnimation";

export default function UnmatchedAccuracy() {
  return (
    <section className="py-20 px-4 max-w-5xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4 font-[var(--font-greycliff)]">Unmatched Accuracy</h2>
      <p className="text-lg mb-8">
        Our models consistently outperform general purpose LLMs, reaching peak accuracy by learning from every edge case and adapting in real time to your production data.
      </p>
      <ContinuousImprovementAnimation />
    </section>
  );
}
