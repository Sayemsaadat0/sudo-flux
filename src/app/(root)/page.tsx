'use client';

import useSmoothScroll from "@/hooks/useSmoothScroll";

const Home = () => {
  useSmoothScroll();
  return (
    <div className="sudo-container space-y-10 py-24">
      <div className="min-h-screen">1st Section</div>
    </div>
  )
}
export default Home