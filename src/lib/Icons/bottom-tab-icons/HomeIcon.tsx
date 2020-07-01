import React from "react"
import Svg, { Path } from "react-native-svg"

export const HomeIcon = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={23} height={24} viewBox="0 0 23 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.7939 0.924351C11.2159 0.62096 11.7842 0.62096 12.2062 0.924352L22.2765 8.15137C22.6964 8.36809 23 8.77601 23 9.27332V22.3658C23 23.0351 22.458 23.5776 21.7895 23.5776H14.058C13.7818 23.5776 13.558 23.3538 13.558 23.0777L13.5579 15.9624C13.5579 15.6862 13.334 15.4624 13.0579 15.4624H9.94211C9.66597 15.4624 9.44211 15.6862 9.44211 15.9624L9.44216 23.0776C9.44216 23.3538 9.2183 23.5776 8.94216 23.5776H1.21053C0.541971 23.5776 0 23.0351 0 22.3658V9.27332C0 8.77598 0.302632 8.39753 0.690378 8.12297L10.7939 0.924351ZM1.57368 9.49297V22.0022L7.86842 22.0022V15.0988C7.86842 14.4295 8.41039 13.887 9.07895 13.887H13.9211C14.5896 13.887 15.1316 14.4295 15.1316 15.0988V22.0022L21.4263 22.0022V9.49295L11.5 2.35626L1.57368 9.49297Z"
      fill="#666"
    />
  </Svg>
)
