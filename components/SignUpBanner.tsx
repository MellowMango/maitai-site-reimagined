import React from 'react';
import Link from 'next/link'; // Import Link for routing

const SignUpBanner = () => {
  return (
    <section>
      {/* TODO: Implement SignUpBanner (reuse old Contact CTA styles?) */}
      Ready to build reliable AI? <Link href="/signup">Sign Up</Link>
    </section>
  );
};

export default SignUpBanner;
