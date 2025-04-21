// Generic section component for repeated blocks
export default function Section({ title, subtitle, body, children, className = "" }: {
  title?: string;
  subtitle?: string;
  body?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-16 px-4 max-w-5xl mx-auto text-center ${className}`}>
      {title && <h3 className="text-3xl font-bold mb-2 font-[var(--font-greycliff)]">{title}</h3>}
      {subtitle && <h4 className="text-2xl font-semibold mb-2 font-[var(--font-greycliff)]">{subtitle}</h4>}
      {/* Only wrap body in <p> if it's a string */}
      {typeof body === 'string' ? (
        <p className="text-lg mb-8">{body}</p>
      ) : (
        body
      )}
      {children}
    </section>
  );
}
