import { useEffect, useRef, useState } from "react";

function Video({ src, title, width }: { src: string, title: string, width: number }) {
  return (
      <iframe
        src={src}
        title={title}
        style={{
          width: "100%",
          height: `${0.5625 * width}px`, // 16:9 aspect ratio  
          marginBottom: "2em",
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
  );
}

export default function ReferenceFootage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(800);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        setWidth(width);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="document-page-container" ref={containerRef}>
      <h1>
        Reference Footage
      </h1>
      <h2>
        Full Echoes List
      </h2>
      <p>At its peak, the list of echoes contains 127 elements.</p>
      <Video src="https://www.youtube.com/embed/ccdaZO2z62k" title="Full Echoes List" width={width} />
      <h2>
        Sorting the Echoes List
      </h2>
      <p>You can sort the list in a few ways, which makes it slightly more manageable.</p>
      <Video src="https://www.youtube.com/embed/FjF8EEZfoLk" title="Sorting the Echoes List" width={width} />
      <h2>
        Accessing Echoes through the Main Menu
      </h2>
      <p>
        It's less fluid, but you can access a two-dimensional list of echoes within the main menu.
      </p>
      <Video src="https://www.youtube.com/embed/gfzyJucm2xo" title="Accessing Echoes through the Main Menu" width={width} />
    </div>
  );
}