"use client";

import {
  type ImgHTMLAttributes,
  type ReactElement,
  type ReactNode,
  cloneElement,
  isValidElement,
} from "react";
import Zoom, { type UncontrolledProps } from "react-medium-image-zoom";

// import './image-zoom.css';

export type ImageZoomProps = {
  /**
   * Children containing img element
   */
  children?: ReactNode;
  /**
   * Image src (fallback if not found in children)
   */
  src?: string;
  /**
   * Image props when zoom in
   */
  zoomInProps?: ImgHTMLAttributes<HTMLImageElement>;

  /**
   * Props for `react-medium-image-zoom`
   */
  rmiz?: UncontrolledProps;
};

function getImageSrc(src: string | Blob): string {
  if (typeof src === "string") {
    return src;
  }
  // If src is a Blob, create an object URL
  return URL.createObjectURL(src);
}

function extractImageProps(children: ReactNode): {
  imgProps: ImgHTMLAttributes<HTMLImageElement>;
  imgElement: ReactElement<ImgHTMLAttributes<HTMLImageElement>> | null;
} {
  // Case 1: Direct img element
  if (
    isValidElement(children) &&
    (children.type === "img" || children.type === "Image")
  ) {
    return {
      imgProps: children.props as ImgHTMLAttributes<HTMLImageElement>,
      imgElement: children as ReactElement<ImgHTMLAttributes<HTMLImageElement>>,
    };
  }

  // Case 2: p tag containing img element
  if (isValidElement(children) && children.type === "p") {
    const pProps = children.props as { children?: ReactNode };
    if (isValidElement(pProps.children) && pProps.children.type === "img") {
      return {
        imgProps: pProps.children.props as ImgHTMLAttributes<HTMLImageElement>,
        imgElement: pProps.children as ReactElement<
          ImgHTMLAttributes<HTMLImageElement>
        >,
      };
    }
  }

  return {
    imgProps: {},
    imgElement: null,
  };
}

export function ImageZoom({ children, rmiz }: ImageZoomProps) {
  const { imgProps, imgElement } = extractImageProps(children);

  if (!imgElement) {
    return null;
  }

  const { src, alt } = imgProps;

  if (!src) {
    console.warn("ImageZoom: No image src found in children or props");
    return <>{children}</>;
  }

  // If we found an img element (either direct or nested in p)
  return (
    <div className="p-2 not-prose relative bg-secondary rounded-2xl overflow-hidden dark:bg-gray-800/25">
      <div className="absolute inset-0 bg-grid-neutral-200/20 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-white/5 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      <div className="relative rounded-xl overflow-hidden flex justify-center">
        <Zoom
          zoomMargin={20}
          wrapElement="span"
          {...rmiz}
          zoomImg={{
            src: getImageSrc(src),
            sizes: undefined,
            ...imgProps,
          }}
        >
          <img
            src={src}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
            {...imgProps}
          />
        </Zoom>
      </div>
      {alt && (
        <div className="relative rounded-2xl flex justify-center mt-3 pt-0 px-8 pb-2 text-sm text-gray-700 dark:text-gray-400">
          {alt}
        </div>
      )}
      <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-2xl dark:border-white/5" />
    </div>
  );
}
