import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container-x grid min-h-[100svh] place-items-center text-center">
      <div>
        <p className="font-mono text-sm text-subtle">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">This page doesn&apos;t exist.</h1>
        <Link href="/" className="btn btn-primary mt-8">
          Back home
        </Link>
      </div>
    </main>
  );
}
