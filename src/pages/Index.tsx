import { useEffect, useState } from "react";

const MARCH_2026 = {
  year: 2026,
  month: 2,
  name: "Март 2026",
  days: 31,
};

// 1 марта 2026 — воскресенье, в сетке Пн-Вс это индекс 6
const START_DAY_INDEX = 6;

const DAYS_OF_WEEK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function HeartSvg({
  size,
  color,
  stroke,
  strokeWidth,
}: {
  size: number;
  color: string;
  stroke?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke={stroke || "none"}
      strokeWidth={strokeWidth || 0}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
    </svg>
  );
}

function FloatingHearts() {
  const HEART_COLORS = ["#FFB3C6","#FFD6E0","#A8D8EA","#C8E6F5","#F9A8C0","#B5D8F7","#FFDDE8"];

  const [hearts] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 22,
      duration: 9 + Math.random() * 14,
      delay: Math.random() * 14,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      swayDuration: 3 + Math.random() * 4,
      swayDelay: Math.random() * 3,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            position: "absolute",
            left: `${heart.left}%`,
            bottom: "-60px",
            animation: `floatUp ${heart.duration}s ${heart.delay}s linear infinite`,
          }}
        >
          <div style={{ animation: `floatSway ${heart.swayDuration}s ${heart.swayDelay}s ease-in-out infinite` }}>
            <HeartSvg size={heart.size} color={heart.color} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Calendar() {
  const cells: (number | null)[] = [];
  for (let i = 0; i < START_DAY_INDEX; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= MARCH_2026.days; d++) {
    cells.push(d);
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="grid grid-cols-7 gap-1 mb-3">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-400 py-1"
            style={{ fontFamily: "'Golos Text', sans-serif" }}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} />;
          }
          const isSpecial = day === 26;
          return (
            <div
              key={day}
              className="relative flex items-center justify-center h-10 w-full rounded-full"
              style={{ fontFamily: "'Golos Text', sans-serif" }}
            >
              {isSpecial ? (
                <div className="relative flex items-center justify-center">
                  <HeartSvg size={42} color="#B0C9D8" />
                  <span
                    className="absolute font-semibold text-sm"
                    style={{ color: "#2c3e50" }}
                  >
                    26
                  </span>
                </div>
              ) : (
                <span className="text-sm text-gray-700 hover:text-pink-400 transition-colors cursor-default">
                  {day}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Index() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Golos+Text:wght@400;500;600&display=swap');

        * { box-sizing: border-box; }

        body {
          background: linear-gradient(135deg, #FFF0F5 0%, #FFFDE7 45%, #E3F4FC 80%, #FFF0F5 100%);
          min-height: 100vh;
        }

        @keyframes floatUp {
          0%   { transform: translateY(0px) rotate(0deg); opacity: 0; }
          8%   { opacity: 0.8; }
          90%  { opacity: 0.45; }
          100% { transform: translateY(-108vh) rotate(25deg); opacity: 0; }
        }
        @keyframes floatSway {
          0%   { transform: translateX(0px); }
          33%  { transform: translateX(18px); }
          66%  { transform: translateX(-14px); }
          100% { transform: translateX(0px); }
        }
        @keyframes fadeInUp {
          0%   { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseSoft {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.08); }
        }
        @keyframes shimmerLine {
          0%   { background-position: -300% center; }
          100% { background-position: 300% center; }
        }

        .section-enter {
          opacity: 0;
          animation: fadeInUp 0.85s ease-out forwards;
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.55s; }
        .delay-4 { animation-delay: 0.75s; }
        .delay-5 { animation-delay: 0.95s; }
        .delay-6 { animation-delay: 1.15s; }

        .pulse-heart {
          animation: pulseSoft 2.2s ease-in-out infinite;
          display: inline-block;
        }
        .pulse-heart-2 {
          animation: pulseSoft 2.2s ease-in-out infinite;
          animation-delay: 0.6s;
          display: inline-block;
        }

        .glass-card {
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .divider-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, #F9A8C0, #A8D8EA, transparent);
          animation: shimmerLine 4s linear infinite;
          background-size: 200% auto;
        }

        .font-caveat  { font-family: 'Caveat', cursive; }
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-golos   { font-family: 'Golos Text', sans-serif; }
      `}</style>

      <FloatingHearts />

      <div className="relative z-10 min-h-screen px-4 py-14 font-golos">

        {/* ─── ФОТО ─── */}
        <section className={`text-center mb-8 ${visible ? "section-enter delay-1" : "opacity-0"}`}>
          <div className="mx-auto" style={{ maxWidth: 320 }}>
            <img
              src="https://cdn.poehali.dev/projects/706e474b-93fd-47a0-9bcc-ec4b72a239cc/bucket/1cf78021-5d62-41f9-bbc5-3dfc7996e434.png"
              alt="Именинница"
              className="w-full rounded-3xl shadow-lg"
              style={{ border: "2px solid #FFD6E0", objectFit: "cover" }}
            />
          </div>
        </section>

        {/* ─── ПРИВЕТСТВИЕ ─── */}
        <section className={`text-center mb-16 ${visible ? "section-enter delay-1" : "opacity-0"}`}>
          <div className="inline-block px-4">
            <p
              className="font-cormorant text-3xl md:text-4xl text-gray-800 leading-relaxed"
              style={{ fontStyle: "italic", letterSpacing: "0.01em" }}
            >
              Приглашаю вас на мой день рождения!
            </p>
            <div className="divider-line mx-auto mt-4 max-w-xs" />
          </div>
        </section>

        {/* ─── КАЛЕНДАРЬ ─── */}
        <section className={`mb-14 ${visible ? "section-enter delay-2" : "opacity-0"}`}>
          <div
            className="glass-card max-w-sm mx-auto rounded-3xl p-6 shadow-md"
            style={{ border: "1.5px solid #FFD6E0" }}
          >
            <h2
              className="font-caveat text-2xl font-bold text-center mb-5 text-gray-700"
            >
              {MARCH_2026.name}
            </h2>
            <Calendar />
          </div>
        </section>

        {/* ─── АДРЕС ─── */}
        <section className={`mb-14 ${visible ? "section-enter delay-3" : "opacity-0"}`}>
          <div
            className="glass-card max-w-md mx-auto rounded-3xl p-8 shadow-md text-center"
            style={{ border: "1.5px solid #C8E6F5" }}
          >
            <div className="text-3xl mb-3">📍</div>
            <h2 className="font-caveat text-2xl font-bold text-gray-700 mb-4">
              Место встречи
            </h2>
            <p className="font-golos text-gray-700 leading-8 text-base">
              г. Тула, р-н Привокзальный<br />
              д. Дементеево<br />
              территория Поле-1, 176
            </p>
          </div>
        </section>

        {/* ─── КАРТА ─── */}
        <section className={`mb-14 ${visible ? "section-enter delay-4" : "opacity-0"}`}>
          <div
            className="glass-card max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-md"
            style={{ border: "1.5px solid #FFF3B0" }}
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A&source=constructor&ll=37.5996%2C54.1983&z=15&pt=37.5996%2C54.1983,pmrdm"
              width="100%"
              height="340"
              frameBorder="0"
              title="Карта места"
              allowFullScreen
              style={{ display: "block" }}
            />
          </div>
          <div className="text-center mt-3">
            <a
              href="https://yandex.ru/maps/-/CPRSiFmx"
              target="_blank"
              rel="noopener noreferrer"
              className="font-golos text-sm text-blue-400 hover:text-blue-500 underline underline-offset-2 transition-colors"
            >
              Открыть в Яндекс Картах →
            </a>
          </div>
        </section>

        {/* ─── ДРЕСС-КОД ─── */}
        <section className={`mb-20 ${visible ? "section-enter delay-5" : "opacity-0"}`}>
          <div
            className="glass-card max-w-md mx-auto rounded-3xl p-8 shadow-md text-center"
            style={{ border: "1.5px solid #FFD6E0" }}
          >
            <h2 className="font-caveat text-2xl font-bold text-gray-700 mb-6">
              Дресс-код
            </h2>
            <div className="flex items-center justify-center gap-12">
              <div className="flex flex-col items-center gap-2">
                <div className="pulse-heart">
                  <HeartSvg size={60} color="#D4B896" stroke="#1a1a1a" strokeWidth={1.2} />
                </div>
                <span className="font-golos text-sm text-gray-500 mt-1">бежевый</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="pulse-heart-2">
                  <HeartSvg size={60} color="#FFFFFF" stroke="#1a1a1a" strokeWidth={1.2} />
                </div>
                <span className="font-golos text-sm text-gray-500 mt-1">белый</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ПОДВАЛ ─── */}
        <footer className={`text-center pb-6 ${visible ? "section-enter delay-6" : "opacity-0"}`}>
          <div
            className="glass-card inline-flex flex-col items-center gap-3 px-12 py-5 rounded-3xl shadow-sm"
            style={{ border: "1.5px solid #C8E6F5" }}
          >
            <p
              className="font-cormorant text-xl text-gray-600"
              style={{ letterSpacing: "0.12em" }}
            >
              26.03.2026г.
            </p>
            <div className="pulse-heart">
              <HeartSvg size={30} color="#A8D8EA" />
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}