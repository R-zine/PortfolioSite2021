export const publicAsset = (
  assetPath: string,
  publicUrl: string = process.env.PUBLIC_URL || ""
): string => {
  const baseUrl = publicUrl.replace(/\/$/, "");
  const normalizedPath = assetPath.replace(/^\/+/, "");

  return `${baseUrl}/${normalizedPath}`;
};
