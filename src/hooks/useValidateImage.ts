export const useValidateImage = () => {
  const isValidImageType = (fileType: string) => {
    const types = ["image/jpeg", "image/jpg", "image/gif", "image/png"];
    return types.includes(fileType.toLowerCase());
  };

  const isValidImageSize = (fileSize: number) => {
    const KB = 1024;
    const MB = KB * 1024;
    const MAX_MB = MB * 2;
    return fileSize <= MAX_MB;
  };

  return {
    isValidImageType,
    isValidImageSize,
  };
};
