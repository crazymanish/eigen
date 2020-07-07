import { tappedTabBar } from "@artsy/cohesion"
import { color, Sans } from "@artsy/palette"
import { changes, useSelectedTab } from "lib/NativeModules/SelectedTab/SelectedTab"
import SwitchBoard from "lib/NativeModules/SwitchBoard"
import React, { useEffect, useRef, useState } from "react"
import { Animated, Easing, TouchableWithoutFeedback, View } from "react-native"
import { useTracking } from "react-tracking"
import styled from "styled-components/native"
import { bottomTabsConfig } from "./bottomTabsConfig"
import { BottomTabsIcon, ICON_HEIGHT, ICON_WIDTH } from "./BottomTabsIcon"
import { BottomTabType } from "./BottomTabType"

export const BottomTabsButton: React.FC<{
  tab: BottomTabType
  badgeCount?: number
}> = ({ tab, badgeCount = 0 }) => {
  const isActive = useSelectedTab() === tab
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const [isBeingPressed, setIsBeingPressed] = useState(false)
  const activeProgress = useRef(new Animated.Value(isActive ? 1 : 0)).current
  const navRef = useRef(null)

  const showActiveState = isActive || isBeingPressed

  useEffect(() => {
    Animated.timing(activeProgress, {
      toValue: showActiveState ? 1 : 0,
      useNativeDriver: true,
      easing: Easing.ease,
      duration: 100,
    }).start()
  }, [showActiveState])

  const tracking = useTracking()

  return (
    <TouchableWithoutFeedback
      ref={navRef}
      onPressIn={() => {
        clearTimeout(timeout.current!)
        setIsBeingPressed(true)
      }}
      onPressOut={() => {
        timeout.current = setTimeout(() => {
          setIsBeingPressed(false)
        }, 150)
      }}
      onPress={() => {
        changes.emit("selectedTabChanged", { tabName: tab })
        SwitchBoard.presentNavigationViewController(navRef.current!, bottomTabsConfig[tab].route)
        tracking.trackEvent(tappedTabBar({ tab: bottomTabsConfig[tab].analyticsDescription, badge: badgeCount > 0 }))
      }}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <IconWrapper>
          <BottomTabsIcon tab={tab} state="inactive" />
        </IconWrapper>
        <IconWrapper>
          <Animated.View
            style={{
              opacity: activeProgress,
              backgroundColor: "white",
              width: ICON_WIDTH,
              height: ICON_HEIGHT,
            }}
          >
            <BottomTabsIcon tab={tab} state="active" />
          </Animated.View>
        </IconWrapper>

        {!!badgeCount && (
          <IconWrapper>
            <View style={{ width: ICON_WIDTH, height: ICON_HEIGHT }}>
              <View
                style={{
                  backgroundColor: color("red100"),
                  position: "absolute",
                  top: 8,
                  right: 8,
                  borderWidth: 2,
                  borderColor: "white",
                  borderRadius: 11,
                  height: 22,
                  minWidth: 22,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sans size="1" weight="medium" color="white">
                  {badgeCount > 99 ? "99+" : badgeCount}
                </Sans>
              </View>
            </View>
          </IconWrapper>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

const IconWrapper = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`
