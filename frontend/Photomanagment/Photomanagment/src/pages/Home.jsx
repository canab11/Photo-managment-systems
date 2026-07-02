import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import hero from "../assets/hero.png";

function Home() {
  const features = [
    {
      icon: "🖼️",
      title: "Isku Habee Sawirradaada",
      desc: "Kaydi, kala saar, oo maamul sawirradaada dhammaan hal meel oo fudud.",
    },
    {
      icon: "📁",
      title: "Albums & Categories",
      desc: "Abuur albums iyo categories si aad sawirradaada si degdeg ah u heshid.",
    },
    {
      icon: "👥",
      title: "Maamul Users-ka",
      desc: "Kordhi, wax ka beddel, ama tirtir isticmaalayaasha nidaamkaaga.",
    },
    {
      icon: "⚡",
      title: "Degdeg iyo Amaan",
      desc: "Dashboard degdeg ah oo bixiya xogta muhiimka ah si toos ah.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <PublicNavbar />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-36 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            ✨ Photo Management System
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
            Maamul Sawirradaada si <span className="text-blue-600">Fudud</span> oo <span className="text-blue-600">Qurux badan</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Nidaam dhammaystiran oo kuu ogolaanaya inaad kaydiso, kala saarto,
            oo maamusho sawirrada, albums-ka, iyo isticmaalayaasha — dhammaan
            hal dashboard oo fudud.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-200 transition"
            >
              Bilow Hadda →
            </Link>
            <Link
              to="/about"
              className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-7 py-3.5 rounded-xl border border-slate-200 transition"
            >
              Ka Baro Nagu Saabsan
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-6 bg-blue-200/40 blur-3xl rounded-full"></div>
            <img
              src={hero}
              alt="Photo App illustration"
              className="relative w-72 sm:w-96 drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Waxa Nidaamkan uu ku Siiyo
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Aaladaha aad u baahan tahay si aad si sahlan ugu maamusho
            sawirradaada iyo xogtaada.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Diyaar ma u tahay inaad bilowdo?
          </h2>
          <p className="text-blue-100 mb-8">
            Gal akoonkaaga oo bilaw maamulka sawirradaada maanta.
          </p>
          <Link
            to="/login"
            className="inline-block bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition"
          >
            Gal Akoonkaaga
          </Link>
        </div>
      </section>

      <footer className="text-center text-sm text-slate-400 pb-10">
        © {new Date().getFullYear()} PhotoApp. Dhammaan xuquuqda way dhawan yihiin.
      </footer>
    </div>
  );
}

export default Home;
