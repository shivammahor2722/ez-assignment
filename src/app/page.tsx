// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { type: "ok" | "err"; text: string }>(null);

  const emailValid = /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.(?:[a-zA-Z0-9_'^&/+-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.
    test(email.trim());
  const phoneValid = /^\+?[0-9\-()\s]{7,15}$/.test(phone.trim());
  const allFilled = name.trim() && email.trim() && phone.trim() && message.trim();
  const canSubmit = allFilled && emailValid && phoneValid && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    if (!canSubmit) {
      setStatus({ type: "err", text: "Please fill all fields correctly." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://vernanbackend.ezlab.in/api/contact-us/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), message: message.trim() })
      });

      if (res.ok) {
        // success state per requirements
        setStatus({ type: "ok", text: "Form Submitted" });
        // optional: reset form
        setName(""); setEmail(""); setPhone(""); setMessage("");
      } else {
        const text = await res.text();
        setStatus({ type: "err", text: `Submission failed (${res.status}). ${text || "Please try again."}` });
      }
    } catch (err: any) {
      setStatus({ type: "err", text: err?.message || "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <div className="h-8 w-8 rounded-xl bg-neutral-900" />
            <span>EZ Labs</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:opacity-70" href="#features">Features</a>
            <a className="hover:opacity-70" href="#about">About</a>
            <a className="hover:opacity-70" href="#contact">Contact</a>
          </nav>
          <a href="#contact" className="inline-flex items-center rounded-xl border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-50">Get in touch</a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight"
            >
              Building smart digital products for bold teams
            </motion.h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-prose">
              We craft scalable web and mobile solutions—fast, accessible, and beautiful on every screen size.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="#contact" className="inline-flex items-center justify-center rounded-xl bg-neutral-900 text-white px-5 py-3 text-sm font-medium hover:opacity-90 active:opacity-80">
                Start a project
              </a>
              <a href="#features" className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-5 py-3 text-sm font-medium hover:bg-neutral-50">
                See features
              </a>
            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                ["99.9%", "Uptime"],
                ["<100ms", "TTFB"],
                ["A11y", "WCAG 2.1"],
                ["ISO", "27001"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-neutral-200 p-4">
                  <div className="text-xl font-semibold">{k}</div>
                  <div className="text-xs text-neutral-500">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="relative aspect-[16/10] rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-50" />
              <div className="absolute inset-6 grid grid-cols-3 gap-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="rounded-xl bg-white border border-neutral-200 shadow-sm" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-neutral-50 border-y border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Performance-first", d: "Lighthouse-friendly builds with code-splitting and image optimization out of the box." },
              { t: "Responsive by design", d: "Mobile, tablet, mini desktop, and desktop—all carefully tuned breakpoints." },
              { t: "Accessible UI", d: "Keyboard and screen-reader friendly patterns with semantic HTML." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm">
                <div className="text-lg font-semibold">{f.t}</div>
                <p className="mt-2 text-sm text-neutral-600">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / BLURB */}
      <section id="about" className="">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Human-centered, engineering-led</h2>
              <p className="mt-3 text-neutral-600 max-w-prose">
                This section mirrors the Figma's information block. Replace with your copy. Subtle hover and motion effects improve perceived polish without distracting from the content.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {["React/Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map((t) => (
                <div key={t} className="rounded-2xl border border-neutral-200 p-5 bg-white shadow-sm text-sm">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-neutral-50 border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Let’s build something great</h2>
              <p className="mt-3 text-neutral-600 max-w-prose">
                Fill out the form and our team will get back within 1–2 business days.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-neutral-600">
                <li>• Response within 48 hours</li>
                <li>• Transparent timelines & pricing</li>
                <li>• NDA-friendly</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-800"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${email && !emailValid ? "border-red-500 focus:ring-red-400" : "border-neutral-300 focus:ring-neutral-800"}`}
                    placeholder="jane@company.com"
                    inputMode="email"
                  />
                  {email && !emailValid && (
                    <p className="mt-1 text-xs text-red-600">Enter a valid email address.</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${phone && !phoneValid ? "border-red-500 focus:ring-red-400" : "border-neutral-300 focus:ring-neutral-800"}`}
                    placeholder="+91 98765 43210"
                    inputMode="tel"
                  />
                  {phone && !phoneValid && (
                    <p className="mt-1 text-xs text-red-600">Enter a valid phone number.</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 h-28 resize-none outline-none focus:ring-2 focus:ring-neutral-800"
                    placeholder="Tell us about your project..."
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-white transition ${
                    canSubmit ? "bg-neutral-900 hover:opacity-90 active:opacity-80" : "bg-neutral-400 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Submitting…" : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={() => { setName(""); setEmail(""); setPhone(""); setMessage(""); setStatus(null); }}
                  className="text-sm underline underline-offset-4 hover:no-underline"
                >
                  Reset form
                </button>
              </div>

              {status && (
                <div className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                  status.type === "ok" ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-700"
                }`}>
                  {status.text}
                </div>
              )}
              <p className="mt-3 text-xs text-neutral-500">By submitting, you agree to our terms and privacy policy.</p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} EZ Labs. All rights reserved.</span>
          <div className="flex gap-4">
            <a className="hover:opacity-70" href="#">Privacy</a>
            <a className="hover:opacity-70" href="#">Terms</a>
            <a className="hover:opacity-70" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
