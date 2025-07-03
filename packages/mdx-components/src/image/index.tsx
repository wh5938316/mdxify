const getImageUrl = (src: string) => {
  if (src.startsWith("http")) {
    return src;
  }
  const cdnEndpoint = process.env.NEXT_PUBLIC_CDN_ENDPOINT!; // 使用 NEXT_PUBLIC_S3_ENDPOINT 环境变量
  return `${cdnEndpoint}/${src}`;
};

export function Image(props: { src: string; alt: string; title: string }) {
  const { src, alt } = props;
  return <img src={getImageUrl(src)} alt={alt} />;
}
