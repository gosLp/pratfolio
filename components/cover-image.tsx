import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <div className="relative w-full h-80 overflow-hidden">
      <Image
        src={src}
        unoptimized
        alt={`Cover Image for ${title}`}
        // layout="fill" // Makes the image fill the container
        fill
        style={{ objectFit: "cover" }}
        className={cn("object-cover shadow-sm w-full", {
          "hover:shadow-lg transition-shadow duration-200": slug,
        })}
        quality={80} // You can adjust quality if needed
      />
    </div>
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
