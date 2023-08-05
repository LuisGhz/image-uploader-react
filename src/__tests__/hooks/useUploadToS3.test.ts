import { useUploadToS3 } from "../../hooks/useUploadToS3";

describe("useUploadToS3", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should upload file", async () => {
    global.fetch = vi.fn().mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ fileUrl: "http://localhost:3000" }),
      });
    });

    const setViewState = vi.fn();
    const setUploadResponse = vi.fn();
    const { uploadToS3 } = useUploadToS3({ setViewState, setUploadResponse });
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    await uploadToS3(file);
    expect(setViewState).toHaveBeenCalledTimes(2);
    expect(setViewState).toHaveBeenNthCalledWith(1, "uploading");
    expect(setViewState).toHaveBeenNthCalledWith(2, "uploaded");
    expect(setUploadResponse).toHaveBeenCalledTimes(1);
    expect(setUploadResponse).toHaveBeenCalledWith({
      fileUrl: "http://localhost:3000",
    });
  });

  it("Should handle error", async () => {
    global.fetch = vi.fn().mockImplementationOnce(() => {
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Image not valid." }),
      });
    });

    const setViewState = vi.fn();
    const setUploadResponse = vi.fn();
    const { uploadToS3 } = useUploadToS3({ setViewState, setUploadResponse });
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    await uploadToS3(file);
    expect(setViewState).toHaveBeenCalledTimes(2);
    expect(setViewState).toHaveBeenNthCalledWith(1, "uploading");
    expect(setViewState).toHaveBeenNthCalledWith(2, "error");
    expect(setUploadResponse).toHaveBeenCalledTimes(1);
    expect(setUploadResponse).toHaveBeenCalledWith({
      message: "Image not valid.",
    });
  });

  it("Handle connection error", async () => {
    global.fetch = vi.fn().mockImplementationOnce(() => {
      return Promise.reject(new Error("Connection error"));
    });

    const setViewState = vi.fn();
    const setUploadResponse = vi.fn();
    const { uploadToS3 } = useUploadToS3({ setViewState, setUploadResponse });
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    await uploadToS3(file);
    expect(setViewState).toHaveBeenCalledTimes(2);
    expect(setViewState).toHaveBeenNthCalledWith(1, "uploading");
    expect(setViewState).toHaveBeenNthCalledWith(2, "error");
    expect(setUploadResponse).toHaveBeenCalledTimes(1);
    expect(setUploadResponse).toHaveBeenCalledWith({
      message: "Something went wrong. Please try again later.",
    });
  });
});
