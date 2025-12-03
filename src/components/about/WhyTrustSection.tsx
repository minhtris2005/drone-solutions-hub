// components/about/WhyTrustSection.tsx
const WhyTrustSection = () => {
  return (
    <section className="py-20 bg-pure-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=400&q=80"
              alt="Drone inspection"
              className="rounded-2xl shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1532989029401-439615f3d4b4?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Drone delivery"
              className="rounded-2xl shadow-lg mt-8 h-[400px]"
            />
            <img
              src="https://images.unsplash.com/photo-1495764506633-93d4dfed7c6b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Drone photography"
              className="rounded-2xl shadow-lg ml-40"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-pure-black mb-6">
              Tại sao
              <span className="text-vibrant-red"> Hitek Flycam </span>
              là đơn vị đáng tin cậy?
            </h2>
            <div className="space-y-4 text-xl text-pure-black">
              <p>Sự đảm bảo của Hitek Flycam</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTrustSection;
