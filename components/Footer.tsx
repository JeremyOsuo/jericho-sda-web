import Link from "next/link";
import AdventistLogo from "./AdventistLogo";

export default function Footer() {
  return (
    <footer className="bg-[#001f44] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Col 1: Identity (2 cols on large screens) */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-400 flex items-center justify-center shrink-0">
              <AdventistLogo className="w-5 h-5 text-[#001f44]" />
            </div>
            <div>
              <span className="text-white font-serif font-semibold text-sm tracking-wide block leading-tight">
                Jericho SDA Church
              </span>
              <span className="text-xs text-amber-300/90 block">
                Nairobi Eastlands
              </span>
            </div>
          </Link>

          <p className="text-xs text-stone-300 font-serif leading-relaxed max-w-sm">
            A Seventh-day Adventist congregation anchored in the Scriptures, proclaiming the everlasting gospel of the Three Angels to Nairobi Eastlands and beyond.
          </p>

          <div className="bg-white/5 border border-white/10 p-3.5 rounded-lg text-xs space-y-1 max-w-sm">
            <span className="text-amber-300 font-semibold text-[11px] uppercase tracking-wider block">
              Lipa na M-PESA Paybill
            </span>
            <p className="font-mono text-stone-200">
              Business No: <strong className="text-white">752922</strong> &bull; Account: <strong className="text-white">Tithe / Offering</strong>
            </p>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-semibold text-amber-300 tracking-wider font-sans">
            Portals
          </h3>
          <ul className="text-xs space-y-2 text-stone-300 font-medium">
            <li><Link href="/" className="hover:text-amber-300 transition">Home</Link></li>
            <li><Link href="/bulletin" className="hover:text-amber-300 transition">Divine Bulletin</Link></li>
            <li><Link href="/ministries" className="hover:text-amber-300 transition">Church Ministries (17)</Link></li>
            <li><Link href="/estates" className="hover:text-amber-300 transition">Prayer Cells Directory</Link></li>
            <li><Link href="/events" className="hover:text-amber-300 transition">2026 Master Calendar</Link></li>
            <li><Link href="/leadership" className="hover:text-amber-300 transition">Church Officers</Link></li>
          </ul>
        </div>

        {/* Col 3: Worship Hours */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-semibold text-amber-300 tracking-wider font-sans">
            Sabbath Worship
          </h3>
          <ul className="text-xs space-y-2.5 text-stone-300">
            <div>
              <span className="block font-medium text-stone-100">08:00 AM – 09:30 AM</span>
              <span className="text-stone-400 text-[11px]">Sabbath School Lesson Study</span>
            </div>
            <div>
              <span className="block font-semibold text-amber-300">11:00 AM – 01:00 PM</span>
              <span className="text-stone-400 text-[11px]">Divine Worship Service</span>
            </div>
            <div>
              <span className="block font-medium text-stone-100">02:00 PM – 04:30 PM</span>
              <span className="text-stone-400 text-[11px]">Adventist Youth (AY) &amp; Choir</span>
            </div>
            <div>
              <span className="block font-medium text-stone-100">Wednesdays 06:00 PM</span>
              <span className="text-stone-400 text-[11px]">Midweek Prayer Meeting</span>
            </div>
          </ul>
        </div>

        {/* Col 4: Sanctuary & Contact */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-semibold text-amber-300 tracking-wider font-sans">
            Sanctuary &amp; Inquiries
          </h3>
          <p className="text-xs text-stone-300 font-serif leading-relaxed">
            Jericho Estate, Off Jogoo Road &amp; Rabai Road Perimeter,<br />
            Nairobi, Kenya.
          </p>

          <div className="space-y-1 pt-1 text-xs font-serif">
            <span className="text-[11px] font-sans uppercase tracking-wider text-stone-400 block">
              Secretariat Desk:
            </span>
            <a
              href="mailto:jericho.sda@gmail.com"
              className="text-amber-300 hover:underline block font-sans text-xs"
            >
              jericho.sda@gmail.com
            </a>
            <a
              href="https://www.youtube.com/@jerichosdanairobi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-300 hover:text-white block font-sans text-xs"
            >
              YouTube: @jerichosdanairobi &rarr;
            </a>
          </div>

          <div className="pt-2">
            <Link
              href="/care"
              className="inline-block bg-amber-400 hover:bg-amber-300 text-[#001f44] font-semibold text-xs px-3.5 py-2 rounded-lg transition"
            >
              Pastoral Care Desk &rarr;
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Legal / Conference Bar */}
      <div className="max-w-6xl mx-auto px-6 pt-10 mt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-serif">
        <p>&copy; 2026 Jericho Seventh-day Adventist Church. All rights reserved.</p>
        <p>Central Kenya Conference (CKC) &bull; East-Central Africa Division</p>
      </div>
    </footer>
  );
}