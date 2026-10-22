import { AskAI } from "@/components/ask-ai";
import { Beyond } from "@/components/beyond";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Expertise } from "@/components/expertise";
import { FitChecker } from "@/components/fit-checker";
import { Footer } from "@/components/footer";
import { GlowPointer } from "@/components/glow-pointer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";
import { Writing } from "@/components/writing";
import { getPosts } from "@/lib/medium";

export const revalidate = 3600;

export default async function Home() {
  const posts = await getPosts();
  return (
    <>
      <Nav />
      <GlowPointer />
      <main id="main">
        <Hero />
        <Projects />
        <Experience />
        <AskAI />
        <Expertise />
        <FitChecker />
        <Education />
        <Beyond />
        <Writing posts={posts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
