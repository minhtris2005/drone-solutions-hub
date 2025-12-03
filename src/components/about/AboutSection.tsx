// components/about/AboutSection.tsx
import hero2 from "@/assets/about_us/team.png";

const AboutSection = () => {
  return (
    <section className="py-20 bg-light-gray">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-pure-black mb-6">
              Về 
              <span className="text-vibrant-red"> Hitek Flycam</span>
            </h2>
            <div className="space-y-4 text-pure-black">
              <p>
                <span className="text-pure-black font-bold">Hitek Flycam </span>
                là thương hiệu chuyên về giải pháp Drone ứng dụng đa ngành, 
                được phát triển từ nền tảng công nghệ, nhân lực và kinh nghiệm của Hitek 
                Drone – đơn vị tiên phong trong lĩnh vực Drone Light Show và công nghệ 
                trình diễn trên không tại Việt Nam.
              </p>
              <p>
                Thuộc Hitek Group JSC, Hitek Flycam mở rộng sứ mệnh của Hitek Drone sang 
                các lĩnh vực kỹ thuật, khảo sát, logistics và dịch vụ công nghiệp, với mục 
                tiêu đưa công nghệ bay vào phục vụ các lĩnh vực  khác như đời sống, sản
                 xuất và quản lý thông minh.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src={hero2}
              alt="Drone technology"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
