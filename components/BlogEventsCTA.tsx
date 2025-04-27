import React from 'react';
import Link from 'next/link'; // Import Link for routing

const BlogEventsCTA = () => {
  return (
    <section>
      {/* TODO: Implement BlogEventsCTA layout */}
      <Link href="/blog?cat=all">View Blog</Link>
      <Link href="/blog?cat=events">Upcoming Events</Link>
    </section>
  );
};

export default BlogEventsCTA;
