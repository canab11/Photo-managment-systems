import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

function About() {
  const stats = [
    { label: "Sawirro la Maamulay", value: "10K+" },
    { label: "Isticmaale", value: "500+" },
    { label: "Albums", value: "1.2K+" },
    { label: "Waqti Shaqaynaya", value: "99.9%" },
  ];

  const values = [
    {
      title: "Sahlanaanta",
      desc: "Waxaan u dhisnay nidaamkan si uu u noqdo mid fudud loo isticmaalo, xitaa haddaadan aqoon farsamo lahayn.",
    },
    {
      title: "Amaanka",
      desc: "Xogtaada iyo sawirradaada waxaa lagu kaydiyaa si ammaan ah, adiga oo maamula gelitaanka.",
    },
    {
      title: "Degdegga",
      desc: "Dashboard-ka wuxuu ku siinayaa xog degdeg ah oo la cusboonaysiiyay si toos ah.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PublicNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block bg-blue-500/10 text-blue-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-blue-500/20">
            Nagu Saabsan
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Waxaan Ka Shaqaynaa Maamulka Sawirrada
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            PhotoApp waa nidaam loogu talagalay in lagu maamulo, kala saaro,
            oo lagu kaydiyo sawirrada si fudud oo waxtar leh — loogu talagalay
            shirkadaha, xiriirinta, iyo isticmaalaha shakhsi ahaaneed.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center"
            >
              <p className="text-3xl font-extrabold text-blue-400 mb-1">
                {s.value}
              </p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-center bg-slate-900 border border-slate-800 rounded-3xl p-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">Hadafkeena</h2>
            <p className="text-slate-400 leading-relaxed">
              Hadafkeenu waa inaan bixinno aalad fudud oo awood badan oo lagu
              maamulo sawirrada — si ay isticmaalayaashu u kaydsadaan, u
              habeeyaan, oo u helaan sawirradooda si degdeg ah, iyaga oo aan u
              baahnayn aqoon farsamo oo dheeraad ah.
            </p>
          </div>
          <div className="space-y-5">
            {values.map((v, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 mb-1">
                    {v.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ku biir kumanaan isticmaale oo isku halleeya PhotoApp
        </h2>
        <Link
          to="/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition"
        >
          Bilow Hadda
        </Link>
      </section>

      <footer className="text-center text-sm text-slate-600 pb-10 border-t border-slate-900 pt-8">
        © {new Date().getFullYear()} PhotoApp. Dhammaan xuquuqda way dhawan yihiin.
      </footer>
    </div>
  );
}

export default About;
