import { useValidateImage } from "../../hooks/useValidateImage";

describe("useValidateImage", () => {
  const { isValidImageSize, isValidImageType } = useValidateImage();
  const KB = 1024;
  const MB = KB * 1024;
  it("Return valid images validation", () => {
    const currentMB = MB * 2;
    expect(isValidImageSize(currentMB)).toBeTruthy();
    expect(isValidImageType("image/jpeg")).toBeTruthy();
  });
  
  it("Return not valid images", () => {
    const currentMB = MB * 2.01;
    expect(isValidImageSize(currentMB)).toBeFalsy();
    expect(isValidImageType("text/plain")).toBeFalsy();
    expect(isValidImageType("image/bmp")).toBeFalsy();
    expect(isValidImageType("image/svg+xml")).toBeFalsy();
  })
});
