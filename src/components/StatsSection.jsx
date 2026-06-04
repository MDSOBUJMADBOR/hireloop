"use client";

export default function StatsSection() {
  const stats = [
    { icon: "⌕", value: "50K", label: "Active Jobs" },
    { icon: "🏢", value: "12K", label: "Companies" },
    { icon: "◎", value: "2M", label: "Job Seekers" },
    { icon: "✦", value: "97%", label: "Satisfaction Rate" },
  ];

  return (
    <section className="relative overflow-hidden ">
      {/* Background Stars */}
      {/* Globe Image */}
     <div
        className="absolute  bg-no-repeat  "
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: "url('/globee.png')", 
          backgroundPosition: "center top",
          backgroundSize: "cover",  
        }}
      /> 

      {/* Overlay */}
      <div className="absolute " />

      {/* Content */}
      <div className="relative z-10 x-4">
        {/* Heading */}
        <div className="pt-120 text-center">
          <h2 className="text-white text-4xl font-light leading-tight">
            Assisting over{" "}
            <span className="font-medium">15,000 job seekers</span>
            <br />
            find their dream positions.
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="mt-[60px] grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="
                h-[220px]
                rounded-[24px]
                border border-white/10
                bg-black/75
                p-8
                backdrop-blur-xl
                shadow-[0_0_40px_rgba(255,255,255,0.03)]
              "
            >
              <div className="text-xl text-white">{item.icon}</div>

              <h3 className="mt-14 text-3xl  font-semibold text-white">
                {item.value}
              </h3>

              <p className="mt-4 text-lg text-gray-300">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}