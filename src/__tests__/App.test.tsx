import { render, screen } from "@testing-library/react"
import App from "../App"

describe("App", () => {
  it("Should render with drag image views", () => {
    render(<App />);

    screen.getByText(/Upload your image/);
  })
})