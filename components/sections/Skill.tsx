import { technologies } from "@/constants";
import { CardCarousel } from "@/components/ui/card-carousel";

const Skill = () => {
  const images = technologies.map((tech) => ({
    src: tech.logo,
    alt: tech.name,
  }));

  return (
    <div className="pt-40 w-full">
      <CardCarousel
        images={images}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  );
};

export default Skill;
