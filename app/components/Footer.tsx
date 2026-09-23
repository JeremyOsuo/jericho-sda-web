import Link from "next/link";
import AdventistLogo from "./AdventistLogo";

export default function Footer() {
  return (
    <footer className="bg-[#001026] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Col 1: Identity (2 cols on large) */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-300 flex items-center justify-center shadow-md">
              <AdventistLogo className="w-6 h-6 text-[#001737]" />
            </div>
            <div>
              <span className="text-white font-serif font-black text-sm tracking-wide block leading-tight">
                JERICHO SDA CHURCH
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block">
                Nairobi Central Station
              </span>
            </div>
          </Link>

          <p className="text-xs text-blue-200/80 font-serif leading-relaxed max-w-sm">
            A Seventh-day Adventist congregation anchored in the Word of God, proclaiming the everlasting gospel of the Three Angels to our community and the world.
          </p>

          <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-xs space-y-1">
            <p className="text-amber-300 font-bold font-mono text-[11px] uppercase tracking-wider">
              Lipa na M-PESA Paybill
            </p>
            <p className="font-mono text-white">
              Business No: <strong className="text-amber-300">752922</strong> • Account: <strong>TITHE</strong>
            </p>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase font-black text-amber-300 tracking-wider">
            Portals
          </h4>
          <ul className="text-xs space-y-2 text-slate-300 font-medium">
            <li><Link href="/" className="hover:text-amber-300 transition">Home</Link></li>
            <li><Link href="/ministries" className="hover:text-amber-300 transition">Church Ministries (17)</Link></li>
            <li><Link href="/departments/ambassadors" className="hover:text-amber-300 transition">Ambassadors Club</Link></li>
            <li><Link href="/departments/possibility-ministries" className="hover:text-amber-300 transition">Possibility Ministries (APM)</Link></li>
            <li><Link href="/estates" className="hover:text-amber-300 transition">Prayer Cells Directory</Link></li>
            <li><Link href="/events" className="hover:text-amber-300 transition">2026 Master Calendar</Link></li>
            <li><Link href="/leadership" className="hover:text-amber-300 transition">Church Officers</Link></li>
          </ul>
        </div>

        {/* Col 3: Worship Hours */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase font-black text-amber-300 tracking-wider">
            Sabbath Worship
          </h4>
          <ul className="text-xs space-y-2 text-slate-300 font-serif">
            <li>
              <span className="block font-bold text-white">08:00 AM – 09:30 AM</span>
              <span className="text-slate-400 text-[11px]">Sabbath School Lesson Study</span>
            </li>
            <li>
              <span className="block font-bold text-amber-300">11:00 AM – 01:00 PM</span>
              <span className="text-slate-400 text-[11px]">Divine Worship Service</span>
            </li>
            <li>
              <span className="block font-bold text-white">02:00 PM – 04:30 PM</span>
              <span className="text-slate-400 text-[11px]">Adventist Youth (AY) &amp; Choir</span>
            </li>
            <li>
              <span className="block font-bold text-white">Wednesdays 06:00 PM</span>
              <span className="text-slate-400 text-[11px]">Midweek Prayer &amp; Fasting</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Location & Care */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase font-black text-amber-300 tracking-wider">
            Sanctuary Address
          </h4>
          <p className="text-xs text-slate-300 font-serif leading-relaxed">
            Jericho Estate, Off Jogoo Road &amp; Rabai Road perimeter,<br />
            Eastlands, Nairobi, Kenya.
          </p>

          <div className="pt-2">
            <Link
              href="/care"
              className="inline-block bg-amber-400 hover:bg-amber-300 text-[#001737] font-black text-xs uppercase tracking-wider px-4 py-2 rounded-xl transition shadow"
            >
              Pastoral Care Desk →
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-serif">
        <p>© 2026 Jericho Seventh-day Adventist Church. All rights reserved.</p>
        <p>Seventh-day Adventist Church • Central Kenya Conference (CKC)</p>
      </div>
    </footer>
  );
}