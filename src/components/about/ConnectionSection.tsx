// components/about/ConnectionSection.tsx
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo_hitek from "@/assets/about_us/logo_hitek.png";

const ConnectionSection = () => {
  return (
    <section className="py-20 bg-light-gray">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-pure-black mb-6">
              Mối liên hệ giữa
              <div className="text-vibrant-red">
                <span> Hitek Flycam </span>
                <span className="text-pure-black">&</span>
                <span> Hitek Drone</span>
              </div>
            </h2>
            <div className="space-y-4 text-warm-gray mb-8">
              <p>
                Nếu Hitek Drone là biểu tượng của nghệ thuật và trình diễn, 
                thì Hitek Flycam là đại diện cho ứng dụng công nghệ Drone vào sản 
                xuất và vận hành thực tế. Cả hai thương hiệu cùng chia sẻ một tầm 
                nhìn chung:
              </p>
            </div>
            <div className="flex">
              <div className="w-4 h-[50px] bg-vibrant-red mr-3" />
              <div>
                <p className="font-bold text-pure-black mb-4">
                  Xây dựng hệ sinh thái Drone toàn diện – nơi công nghệ bay phục vụ 
                  con người trong mọi lĩnh vực của cuộc sống.
                </p>
              </div>
            </div>
            <Link to="/dich-vu">
              <div className="flex items-center text-vibrant-red font-semibold cursor-pointer hover:underline group">
                Tìm hiểu thêm
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
          <div className="relative flex justify-end">
            <img
              src={logo_hitek}
              alt="Future vision"
              className="rounded-2xl shadow-2xl w-[500px] h-[500px] border-4 border-vibrant-red"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectionSection;
