// components/about/TeamSection.tsx
import long from "@/assets/team/Long.png";
import khoi from "@/assets/team/Khoi.png";
import sean from "@/assets/team/Sean.png";

const teamMembers = [
  {
    name: "Lâm Thứ Tiên",
    position: "Chủ tịch",
    image: long,
    info: [
      "Hơn 10 năm kinh nghiệm lãnh đạo và điều hành doanh nghiệp.",
      "Nền tảng vững chắc trong lĩnh vực kinh doanh và phát triển công nghệ.",
    ]
  },
  {
    name: "Trần Anh Khôi",
    position: "Tổng giám đốc", 
    image: khoi,
    info: [
      "Hơn 10 năm kinh nghiệm trong lĩnh vực công nghệ.",
      "Nhà sáng lập của nhiều doanh nghiệp tiên phong, những giải pháp 'lần đầu tiên có mặt tại Việt Nam'.",
    ]
  },
  {
    name: "Oh Sean Beom",
    position: "Giám đốc Kinh doanh",
    image: sean,
    info: [
      "Hơn 10 năm kinh nghiệm phát triển công nghệ.",
      "Năng lực lãnh đạo mạnh mẽ.",
      "Quản lý các dự án xuyên biên giới: Nhật Bản, Hàn Quốc, Việt Nam và châu Âu.",
    ]
  }
];

const TeamSection = () => {
  return (
    <section className="py-20 bg-light-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-foreground mb-16">
          Đội ngũ lãnh đạo
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-60 h-60 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-center text-foreground mb-2">
                {member.name}
              </h3>
              <p className="text-vibrant-red text-center font-semibold mb-6">
                {member.position}
              </p>
              <div className="space-y-3">
                {member.info.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <div className="w-2 h-2 bg-vibrant-red rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
