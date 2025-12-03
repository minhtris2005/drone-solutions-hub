// components/about/HeroSection.tsx
import logobg from "@/assets/logo/camera-drone.png";
import bg from "@/assets/about_us/hero.png";

const HeroSection = () => {
  return (
    <div className="pt-20">
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black opacity-40" />
        <img
          src={bg}
          alt="Drone in sky"
          className="w-full h-full object-cover object-[center_80%]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={logobg} alt="" className="h-50 w-50 mr-5" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
