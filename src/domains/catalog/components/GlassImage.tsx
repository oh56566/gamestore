import React from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const GlassImage: React.FC<Props> = ({ src, alt, className }) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className={`glass-image ${className ?? ""} ${loaded ? "is-loaded" : ""}`}>
      <div className="glass-image-skeleton" />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default GlassImage;
