import { render, screen, fireEvent } from "@testing-library/react";
import { DarkLightMode } from "../../components/DarkLightMode";
import { describe } from "vitest";

describe("DarkLightMode", () => {
  it("renders light mode icon", () => {
    render(<DarkLightMode />);
    expect(screen.getByText("light_mode")).toBeInTheDocument();
  });

  it("renders dark mode icon", () => {
    // localStorage.setItem("darkMode", "true");
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue("true"),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    vi.stubGlobal("localStorage", localStorageMock);
    render(<DarkLightMode />);
    expect(screen.getByText("dark_mode")).toBeInTheDocument();
  });

  it("switches to dark mode", async () => {
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue(null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    vi.stubGlobal("localStorage", localStorageMock);
    render(<DarkLightMode />);
    fireEvent.click(screen.getByText("light_mode"));
    expect(localStorageMock.setItem).toHaveBeenCalledWith("darkMode", "true");
  });

  it("switches to light mode", async () => {
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue("true"),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    vi.stubGlobal("localStorage", localStorageMock);
    render(<DarkLightMode />);
    fireEvent.click(screen.getByText("dark_mode"));
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("darkMode");
  });
});