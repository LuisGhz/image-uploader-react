import {
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { DragImage } from "../../components/DragImage";

describe("DragImage", () => {
  it("Select valid image from input file", async () => {
    const uploadImage = vi.fn();
    render(<DragImage uploadImage={uploadImage} />);
    const fakeFile = new File(["hello"], "image.png", { type: "image/png" });
    const inputFile = screen.getByTestId<HTMLInputElement>("image-selector");
    await waitFor(() => {
      fireEvent.change(inputFile, { target: { files: [fakeFile] } });
    });

    expect(inputFile.files?.length).toBeGreaterThan(0);
    expect(uploadImage).toHaveBeenCalledTimes(1);
  });

  it("Select invalid image type from input file and show error message", async () => {
    const uploadImage = vi.fn();
    render(<DragImage uploadImage={uploadImage} />);
    const fakeFile = new File(["hello"], "text.txt", { type: "text/plain" });
    const inputFile = screen.getByTestId<HTMLInputElement>("image-selector");
    await waitFor(() => {
      fireEvent.change(inputFile, { target: { files: [fakeFile] } });
    });
    screen.getByText(/invalid image type./i);
    expect(inputFile.files?.length).toBeGreaterThan(0);
    expect(uploadImage).toHaveBeenCalledTimes(0);
  });

  it("Select invalid image size from input file and show error message", async () => {
    const uploadImage = vi.fn();
    render(<DragImage uploadImage={uploadImage} />);
    const fakeFile = new File([""], "image.png", {
      type: "image/png",
    });
    Object.defineProperty(fakeFile, "size", { value: 1024 * 1024 * 3 });
    const inputFile = screen.getByTestId<HTMLInputElement>("image-selector");
    await waitFor(() => {
      fireEvent.change(inputFile, { target: { files: [fakeFile] } });
    });
    screen.findByText(/image too large./i);
    expect(inputFile.files?.length).toBeGreaterThan(0);
    expect(uploadImage).toHaveBeenCalledTimes(0);
  });

  it("Drag valid image and drop it", async () => {
    const uploadImage = vi.fn();
    render(<DragImage uploadImage={uploadImage} />);
    const fakeFile = new File(["hello"], "image.png", { type: "image/png" });
    const dragArea = screen.getByTestId("drag-area");
    await waitFor(() => {
      fireEvent.dragOver(dragArea);
      fireEvent.drop(dragArea, { dataTransfer: { files: [fakeFile] } });
    });
    expect(uploadImage).toHaveBeenCalledTimes(1);
  });

  it("Drag invalid image type and drop it", async () => {
    const uploadImage = vi.fn();
    render(<DragImage uploadImage={uploadImage} />);
    const fakeFile = new File(["hello"], "text.txt", { type: "text/plain" });
    const dragArea = screen.getByTestId("drag-area");
    await waitFor(() => {
      fireEvent.dragOver(dragArea);
      fireEvent.drop(dragArea, { dataTransfer: { files: [fakeFile] } });
    });
    screen.findByText(/invalid image type./i);
    expect(uploadImage).toHaveBeenCalledTimes(0);
  });

  it("Drag invalid image size and drop it", async () => {
    const uploadImage = vi.fn();
    render(<DragImage uploadImage={uploadImage} />);
    const fakeFile = new File([""], "image.png", {
      type: "image/png",
    });
    Object.defineProperty(fakeFile, "size", { value: 1024 * 1024 * 3 });
    const dragArea = screen.getByTestId("drag-area");
    await waitFor(() => {
      fireEvent.dragOver(dragArea);
      fireEvent.drop(dragArea, { dataTransfer: { files: [fakeFile] } });
    });
    screen.findByText(/image too large./i);
    expect(uploadImage).toHaveBeenCalledTimes(0);
  });

});