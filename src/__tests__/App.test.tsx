import { render, screen } from "@testing-library/react"
import App from "../App"

describe("App", () => {
  it("Should render", () => {
    render(<App />);

    screen.getByText(/vite \+ react/i);
  })
})