import type { Meta, StoryObj } from "@storybook/react";
import Example from "./example";
import { TEST_DATA } from "../schema";

const meta = {
  title: "global/Slider",
  component: Example,
  argTypes: {},
} satisfies Meta<typeof Example>;

export default meta;

type Story = StoryObj<typeof Example>;

export const Primary: Story = {
  args: {
    data: TEST_DATA,
  },
  parameters: {
    docs: {
      source: {
        code: `
        import {
  Slider,
  SliderContent,
  SliderItem,
  SliderNext,
  SliderPrevious,
} from "@umi-digital/ui";

function Carousel({ data }) {
  return (
    <Slider className="w-full max-w-xl">
      <SliderContent>
        {data.slides.map((slide, index) => (
          <SliderItem key={index}>
            <div className="p-1">
              <div>
                <div className="flex items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{slide.title}</span>
                </div>
              </div>
            </div>
          </SliderItem>
        ))}
      </SliderContent>
      <SliderPrevious />
      <SliderNext />
    </Slider>
  )
}
`,
      },
    },
  },
};
