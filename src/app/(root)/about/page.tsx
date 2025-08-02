import TextMarque from "@/components/animations/TextMarque";
import Link from "next/link";
import clsx from "clsx";

const marqueesData = [
  {
    text: "FULLY CUSTOMIZABLE",
    direction: "right",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1887&auto=format&fit=crop",
    link: "/",
    duration: 20,
  },
  {
    text: "INNOVATIVE ANIMATIONS",
    direction: "left",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1887&auto=format&fit=crop",
    link: "/",
    duration: 20,
  },
  {
    text: "BUILT FOR DEVELOPERS",
    direction: "right",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1887&auto=format&fit=crop",
    link: "/",
    duration: 20,
  },
];

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-16">
      {marqueesData.map((item, index) => {
        const isLast = index === marqueesData.length - 1;
        return (
          <Link
            key={index}
            href={item.link}
            className={clsx(
              "border-t border-black",
              isLast && "border-b"
            )}
          >
            <TextMarque
              direction={item.direction as "left" | "right"}
              hoverImageUrl={item.hoverImageUrl}
              duration={item.duration}
              className=""
              textClassName="text-sudo-header-88 font-heading font-semibold"
            >
              {item.text}
            </TextMarque>
          </Link>
        );
      })}
    </div>
  );
};

export default page;
