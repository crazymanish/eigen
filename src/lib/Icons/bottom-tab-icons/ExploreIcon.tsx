import React from "react"
import Svg, { Path } from "react-native-svg"

export const ExploreIcon = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width="56" height="52" viewBox="0 0 56 52" fill="none" {...props}>
    <Path
      opacity="0.5"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M31.2967 34.2689C29.8099 35.3077 27.9948 35.918 26.0354 35.918C20.9962 35.918 16.9111 31.8808 16.9111 26.9007C16.9111 21.9205 20.9962 17.8833 26.0354 17.8833C31.0746 17.8833 35.1597 21.9205 35.1597 26.9007C35.1597 29.2971 34.2138 31.4752 32.6708 33.0902L37.7909 38.1503C38.1453 38.5006 38.1453 39.0684 37.7909 39.4187C37.4365 39.7689 36.8619 39.7689 36.5075 39.4187L31.2967 34.2689ZM33.3447 26.9007C33.3447 30.8902 30.0722 34.1243 26.0354 34.1243C21.9986 34.1243 18.7261 30.8902 18.7261 26.9007C18.7261 22.9112 21.9986 19.677 26.0354 19.677C30.0722 19.677 33.3447 22.9112 33.3447 26.9007Z"
      fill="black"
    />
  </Svg>
)
