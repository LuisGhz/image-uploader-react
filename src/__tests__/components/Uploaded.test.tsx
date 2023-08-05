import { render, screen } from "@testing-library/react";
import { Uploaded } from "../../components/Uploaded";

describe("Uploaded", () => {
  it("renders Uploaded component", () => {
    render(<Uploaded fileUrl="https://via.placeholder.com/150" />);
    const linkElement = screen.getByText("https://via.placeholder.com/150");
    expect(linkElement).toBeInTheDocument();
  });

  it("should copy link to clipboard", () => {
    const impl = vi.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: impl,
      },
    });
    render(<Uploaded fileUrl="https://via.placeholder.com/150" />);
    const copyLinkBtn = screen.getByText("Copy Link");
    copyLinkBtn.click();
    expect(impl).toHaveBeenCalledWith("https://via.placeholder.com/150");
  });
});
