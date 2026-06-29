"use client";

import { motion } from "framer-motion";

/* ─── Reusable micro-shapes ──────────────────────────────── */
function PawPrint({ x, y, size = 1, fill }: { x: number; y: number; size?: number; fill: string }) {
  return (
    <g transform={`translate(${x},${y}) scale(${size})`}>
      <ellipse cx="0" cy="5" rx="7" ry="6" fill={fill} />
      <circle cx="-5.5" cy="-2" r="3.5" fill={fill} />
      <circle cx="5.5" cy="-2" r="3.5" fill={fill} />
      <circle cx="-8.5" cy="2.5" r="2.8" fill={fill} />
      <circle cx="8.5" cy="2.5" r="2.8" fill={fill} />
    </g>
  );
}

function Sparkle({ x, y, size = 1, fill }: { x: number; y: number; size?: number; fill: string }) {
  return (
    <g transform={`translate(${x},${y}) scale(${size})`}>
      <path d="M0-9 L2-2 L9 0 L2 2 L0 9 L-2 2 L-9 0 L-2-2Z" fill={fill} />
    </g>
  );
}

function FloatingCard({
  x, y, w, h, rotate, children,
}: {
  x: number; y: number; w: number; h: number; rotate: number; children: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate},${w / 2},${h / 2})`}>
      <rect width={w} height={h} rx="16" fill="white"
        style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.08))" }} />
      {children}
    </g>
  );
}

/* ─── Main Illustration ──────────────────────────────────── */
export function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[580px] aspect-[580/460] select-none">
      <motion.svg
        viewBox="0 0 580 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* ── Background blobs ── */}
        {/* Main teal blob */}
        <motion.ellipse
          cx="290" cy="240" rx="235" ry="200"
          fill="#ceecea"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        {/* Lavender accent top-right */}
        <motion.circle cx="500" cy="115" r="90" fill="#e6dff5"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 0.9, delay: 0.1 }} />
        {/* Peach accent bottom-left */}
        <motion.circle cx="80" cy="380" r="70" fill="#faeee6"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 0.9, delay: 0.15 }} />
        {/* Sage accent bottom */}
        <motion.circle cx="380" cy="410" r="55" fill="#d0eccc"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 0.9, delay: 0.2 }} />

        {/* ── Phone mockup ── */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.25 }}
        >
          {/* Phone shadow */}
          <ellipse cx="290" cy="392" rx="68" ry="10" fill="rgba(0,0,0,0.06)" />
          {/* Phone body */}
          <rect x="218" y="98" width="144" height="282" rx="28" fill="#F7F5F2" />
          <rect x="221" y="101" width="138" height="276" rx="25" fill="white" stroke="#EAE8E4" strokeWidth="1.5" />
          {/* Camera notch */}
          <rect x="270" y="106" width="40" height="8" rx="4" fill="#EAE8E4" />
          <circle cx="295" cy="110" r="2.5" fill="#D5D3CF" />
          {/* Screen area */}
          <rect x="226" y="120" width="128" height="246" rx="4" fill="#FAFAF9" />

          {/* ── App UI inside screen ── */}
          {/* Status bar */}
          <rect x="226" y="120" width="128" height="22" fill="#F0F9F8" />
          <circle cx="236" cy="131" r="4" fill="#ceecea" />
          <rect x="244" y="128" width="30" height="6" rx="3" fill="#ceecea" />
          <rect x="330" y="128" width="18" height="6" rx="3" fill="#ceecea" />

          {/* Pet avatar area */}
          <circle cx="290" cy="178" r="28" fill="#e6dff5" />
          {/* Dog emoji style - simplified */}
          <circle cx="290" cy="174" r="14" fill="#F0C96E" />
          <ellipse cx="279" cy="168" rx="5" ry="8" fill="#D4A84B" />
          <ellipse cx="301" cy="168" rx="5" ry="8" fill="#D4A84B" />
          <circle cx="285" cy="173" r="3.5" fill="#1A1A1A" />
          <circle cx="295" cy="173" r="3.5" fill="#1A1A1A" />
          <circle cx="286.5" cy="171.5" r="1.2" fill="white" />
          <circle cx="296.5" cy="171.5" r="1.2" fill="white" />
          <ellipse cx="290" cy="181" rx="4.5" ry="3" fill="#1A1A1A" />
          {/* Name label */}
          <rect x="268" y="210" width="44" height="7" rx="3.5" fill="#ceecea" />

          {/* Health bar rows */}
          <rect x="236" y="226" width="15" height="15" rx="4" fill="#d0eccc" />
          <rect x="256" y="228" width="62" height="5" rx="2.5" fill="#e8f6e6" />
          <rect x="256" y="228" width="48" height="5" rx="2.5" fill="#7BBF7A" />
          <rect x="256" y="236" width="40" height="4" rx="2" fill="#D5D3CF" />

          <rect x="236" y="248" width="15" height="15" rx="4" fill="#ceecea" />
          <rect x="256" y="250" width="62" height="5" rx="2.5" fill="#e3f5f5" />
          <rect x="256" y="250" width="54" height="5" rx="2.5" fill="#7BC8C4" />
          <rect x="256" y="258" width="36" height="4" rx="2" fill="#D5D3CF" />

          {/* Score ring */}
          <circle cx="318" cy="237" r="18" fill="none" stroke="#e8f6e6" strokeWidth="4" />
          <circle cx="318" cy="237" r="18" fill="none" stroke="#7BBF7A" strokeWidth="4"
            strokeDasharray="101" strokeDashoffset="9" strokeLinecap="round"
            transform="rotate(-90 318 237)" />
          <text x="318" y="241" textAnchor="middle" fontSize="10" fill="#7BBF7A" fontWeight="700">98</text>

          {/* Mini cards */}
          <rect x="235" y="272" width="56" height="40" rx="10" fill="#FAF0E8" />
          <circle cx="249" cy="284" r="6" fill="#F5C9A4" />
          <rect x="241" y="293" width="42" height="4" rx="2" fill="#F5C9A4" />
          <rect x="245" y="300" width="34" height="3" rx="1.5" fill="#faeee6" />

          <rect x="297" y="272" width="52" height="40" rx="10" fill="#F0F0FA" />
          <circle cx="310" cy="284" r="6" fill="#A593D9" />
          <rect x="302" y="293" width="38" height="4" rx="2" fill="#A593D9" />
          <rect x="306" y="300" width="30" height="3" rx="1.5" fill="#e6dff5" />

          {/* Bottom nav line */}
          <rect x="270" y="320" width="60" height="4" rx="2" fill="#EAE8E4" />
          <rect x="286" y="320" width="28" height="4" rx="2" fill="#ceecea" />

          {/* Home indicator */}
          <rect x="268" y="348" width="44" height="4" rx="2" fill="#D5D3CF" />
        </motion.g>

        {/* ── Dog illustration (left) ── */}
        <motion.g
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {/* Body */}
          <ellipse cx="115" cy="320" rx="68" ry="62" fill="#F0C96E" />
          {/* Neck */}
          <ellipse cx="115" cy="265" rx="38" ry="22" fill="#F0C96E" />
          {/* Head */}
          <circle cx="115" cy="220" r="68" fill="#F0C96E" />
          {/* Left ear */}
          <path d="M 58 188 Q 35 210 38 262 Q 46 292 78 282 Q 95 258 84 212 Z" fill="#D4A84B" />
          {/* Right ear */}
          <path d="M 172 188 Q 195 210 192 262 Q 184 292 152 282 Q 135 258 146 212 Z" fill="#D4A84B" />
          {/* Snout */}
          <ellipse cx="115" cy="238" rx="32" ry="24" fill="#F5D88A" />
          {/* Left eye */}
          <circle cx="92" cy="210" r="13" fill="#1A1A1A" />
          <circle cx="96" cy="205" r="4.5" fill="white" />
          <circle cx="97" cy="204" r="1.5" fill="white" />
          {/* Right eye */}
          <circle cx="138" cy="210" r="13" fill="#1A1A1A" />
          <circle cx="142" cy="205" r="4.5" fill="white" />
          <circle cx="143" cy="204" r="1.5" fill="white" />
          {/* Eyebrow dots - expressive */}
          <ellipse cx="92" cy="195" rx="6" ry="3" fill="#D4A84B" />
          <ellipse cx="138" cy="195" rx="6" ry="3" fill="#D4A84B" />
          {/* Nose */}
          <ellipse cx="115" cy="235" rx="13" ry="9" fill="#1A1A1A" />
          <ellipse cx="110" cy="233" rx="3.5" ry="2.5" fill="#333" />
          <ellipse cx="120" cy="233" rx="3.5" ry="2.5" fill="#333" />
          {/* Mouth */}
          <path d="M 100 248 Q 115 260 130 248" stroke="#1A1A1A" strokeWidth="2.5"
            fill="none" strokeLinecap="round" />
          {/* Happy tongue */}
          <ellipse cx="115" cy="258" rx="10" ry="8" fill="#FF8FA3" />
          <line x1="115" y1="250" x2="115" y2="266" stroke="#E8809A" strokeWidth="1.5" />
          {/* Paw visible at bottom */}
          <ellipse cx="80" cy="375" rx="25" ry="15" fill="#F0C96E" />
          <ellipse cx="150" cy="375" rx="25" ry="15" fill="#F0C96E" />
          {/* Paw toe bumps */}
          {[68, 78, 88, 98].map((px, i) => (
            <circle key={i} cx={px} cy="363" r="5" fill="#E8B85C" />
          ))}
          {[138, 148, 158, 168].map((px, i) => (
            <circle key={i} cx={px} cy="363" r="5" fill="#E8B85C" />
          ))}
          {/* Collar */}
          <rect x="82" y="268" width="66" height="12" rx="6" fill="#7BC8C4" />
          <circle cx="115" cy="274" r="5" fill="#5AAFAB" />
          <circle cx="115" cy="274" r="2.5" fill="#FAF8F2" />
        </motion.g>

        {/* ── Cat illustration (right) ── */}
        <motion.g
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Body */}
          <ellipse cx="463" cy="325" rx="58" ry="62" fill="#C4B5E0" />
          {/* Head */}
          <circle cx="463" cy="240" r="60" fill="#C4B5E0" />
          {/* Ears */}
          <polygon points="420,192 438,236 408,232" fill="#C4B5E0" />
          <polygon points="506,192 488,236 518,232" fill="#C4B5E0" />
          {/* Inner ears */}
          <polygon points="424,198 438,228 414,225" fill="#E8D9F8" />
          <polygon points="502,198 488,228 512,225" fill="#E8D9F8" />
          {/* Forehead stripe (tabby style) */}
          <path d="M 458 195 Q 463 185 468 195" stroke="#A593D9" strokeWidth="2" fill="none" />
          <path d="M 454 201 Q 463 192 472 201" stroke="#A593D9" strokeWidth="1.5" fill="none" />
          {/* Eyes - almond shaped */}
          <ellipse cx="444" cy="235" rx="13" ry="15" fill="#1A1A1A" />
          <ellipse cx="482" cy="235" rx="13" ry="15" fill="#1A1A1A" />
          {/* Eye highlights */}
          <circle cx="448" cy="229" r="5" fill="white" />
          <circle cx="486" cy="229" r="5" fill="white" />
          <circle cx="449" cy="228" r="2" fill="white" />
          <circle cx="487" cy="228" r="2" fill="white" />
          {/* Eye color (visible ring) */}
          <ellipse cx="444" cy="235" rx="8" ry="10" fill="#7BC8C4" />
          <ellipse cx="444" cy="235" rx="4" ry="8" fill="#1A1A1A" />
          <ellipse cx="482" cy="235" rx="8" ry="10" fill="#7BC8C4" />
          <ellipse cx="482" cy="235" rx="4" ry="8" fill="#1A1A1A" />
          <circle cx="448" cy="229" r="3" fill="white" />
          <circle cx="486" cy="229" r="3" fill="white" />
          {/* Nose */}
          <polygon points="463,258 458,265 468,265" fill="#FF9CAE" />
          {/* Mouth */}
          <path d="M 458 265 Q 463 270 468 265" stroke="#1A1A1A" strokeWidth="1.5"
            fill="none" strokeLinecap="round" />
          <line x1="463" y1="265" x2="463" y2="272" stroke="#1A1A1A" strokeWidth="1.5" />
          {/* Whiskers left */}
          <line x1="415" y1="261" x2="455" y2="264" stroke="#A8A0C0" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="413" y1="270" x2="454" y2="268" stroke="#A8A0C0" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="415" y1="279" x2="453" y2="274" stroke="#A8A0C0" strokeWidth="1.2" strokeLinecap="round" />
          {/* Whiskers right */}
          <line x1="511" y1="261" x2="471" y2="264" stroke="#A8A0C0" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="513" y1="270" x2="472" y2="268" stroke="#A8A0C0" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="511" y1="279" x2="473" y2="274" stroke="#A8A0C0" strokeWidth="1.2" strokeLinecap="round" />
          {/* Tail */}
          <path d="M 518 340 Q 548 295 545 258 Q 542 230 524 236 Q 506 244 512 268 Q 518 298 498 312"
            stroke="#B4A3D4" strokeWidth="18" fill="none" strokeLinecap="round" />
          <path d="M 518 340 Q 548 295 545 258 Q 542 230 524 236 Q 506 244 512 268 Q 518 298 498 312"
            stroke="#C4B5E0" strokeWidth="12" fill="none" strokeLinecap="round" />
          {/* Collar */}
          <rect x="430" y="283" width="66" height="11" rx="5.5" fill="#F0C96E" />
          <circle cx="463" cy="289" r="5" fill="#D4A84B" />
          <path d="M 460 289 L 463 292 L 466 289" fill="none" stroke="#F0C96E" strokeWidth="1" />
          {/* Paws */}
          <ellipse cx="430" cy="380" rx="24" ry="14" fill="#C4B5E0" />
          <ellipse cx="496" cy="380" rx="24" ry="14" fill="#C4B5E0" />
          {[420, 429, 438, 447].map((px, i) => (
            <circle key={i} cx={px} cy="369" r="4" fill="#B4A3D4" />
          ))}
          {[487, 496, 505, 514].map((px, i) => (
            <circle key={i} cx={px} cy="369" r="4" fill="#B4A3D4" />
          ))}
        </motion.g>

        {/* ── Floating card: Health Score ── */}
        <motion.g
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.55 }}
        >
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            <FloatingCard x={358} y={105} w={148} h={68} rotate={5}>
              {/* Heart icon */}
              <circle cx="24" cy="34" r="14" fill="#d0eccc" />
              <text x="24" y="39" textAnchor="middle" fontSize="14">❤️</text>
              {/* Labels */}
              <text x="46" y="27" fontSize="9" fill="#999" fontWeight="500">Health Score</text>
              <text x="46" y="41" fontSize="16" fill="#7BBF7A" fontWeight="700">98%</text>
              <text x="46" y="53" fontSize="8" fill="#AAD5AA">Excellent condition</text>
              {/* Trend dot */}
              <circle cx="130" cy="20" r="5" fill="#d0eccc" />
              <path d="M 127 22 L 130 17 L 133 22" fill="none" stroke="#7BBF7A" strokeWidth="1.5" strokeLinecap="round" />
            </FloatingCard>
          </motion.g>
        </motion.g>

        {/* ── Floating card: Reminder ── */}
        <motion.g
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.6 }}
        >
          <motion.g
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          >
            <FloatingCard x={82} y={318} w={148} h={64} rotate={-5}>
              <circle cx="24" cy="32" r="14" fill="#e6dff5" />
              <text x="24" y="37" textAnchor="middle" fontSize="14">📅</text>
              <text x="46" y="22" fontSize="9" fill="#999" fontWeight="500">Next Appointment</text>
              <text x="46" y="36" fontSize="12" fill="#7B68CE" fontWeight="700">Vet Visit</text>
              <text x="46" y="49" fontSize="8" fill="#A593D9">Tomorrow · 9:00 AM</text>
            </FloatingCard>
          </motion.g>
        </motion.g>

        {/* ── Floating card: AI tip ── */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.7 }}
        >
          <motion.g
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          >
            <FloatingCard x={354} y={330} w={130} h={56} rotate={-4}>
              <circle cx="22" cy="28" r="12" fill="#faeee6" />
              <text x="22" y="33" textAnchor="middle" fontSize="13">✨</text>
              <text x="42" y="20" fontSize="9" fill="#999" fontWeight="500">AI Insight</text>
              <text x="42" y="33" fontSize="10" fill="#E8A070" fontWeight="600">Luna is happy!</text>
              <text x="42" y="44" fontSize="8" fill="#F5C9A4">Activity goal met today</text>
            </FloatingCard>
          </motion.g>
        </motion.g>

        {/* ── Paw prints (scattered) ── */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <PawPrint x={62} y={162} size={0.9} fill="#ceecea" />
          <PawPrint x={522} y={172} size={0.75} fill="#e6dff5" />
          <PawPrint x={200} y={422} size={0.8} fill="#d0eccc" />
          <PawPrint x={480} y={420} size={0.7} fill="#F5C9A4" />
          <PawPrint x={38} y={300} size={0.65} fill="#d0eccc" />
          <PawPrint x={540} y={345} size={0.7} fill="#ceecea" />
        </motion.g>

        {/* ── Sparkles ── */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.g animate={{ rotate: [0, 15, 0] }} transition={{ duration: 3, repeat: Infinity }}>
            <Sparkle x={188} y={118} size={1.1} fill="#7BC8C4" />
          </motion.g>
          <motion.g animate={{ rotate: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <Sparkle x={390} y={418} size={0.9} fill="#A593D9" />
          </motion.g>
          <motion.g animate={{ rotate: [0, 20, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>
            <Sparkle x={546} y={228} size={1.0} fill="#F5C9A4" />
          </motion.g>
          <motion.g animate={{ rotate: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            <Sparkle x={44} y={228} size={0.8} fill="#7BBF7A" />
          </motion.g>
          {/* Dots */}
          <circle cx="174" cy="395" r="5" fill="#7BC8C4" opacity="0.6" />
          <circle cx="182" cy="408" r="3.5" fill="#F5C9A4" opacity="0.7" />
          <circle cx="530" cy="128" r="4" fill="#7BBF7A" opacity="0.6" />
          <circle cx="516" cy="142" r="6" fill="#A593D9" opacity="0.5" />
          <circle cx="55" cy="125" r="5" fill="#F5C9A4" opacity="0.6" />
          <circle cx="68" cy="140" r="3" fill="#7BC8C4" opacity="0.7" />
        </motion.g>
      </motion.svg>
    </div>
  );
}
