import { Flex, Sans } from "@artsy/palette"
import { FeatureFeaturedLink_featuredLink } from "__generated__/FeatureFeaturedLink_featuredLink.graphql"
import OpaqueImageView from "lib/Components/OpaqueImageView/OpaqueImageView"
import { Stack } from "lib/Components/Stack"
import SwitchBoard from "lib/NativeModules/SwitchBoard"
import { useScreenDimensions } from "lib/utils/useScreenDimensions"
import React, { useRef } from "react"
import { TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureMarkdown } from "./FeatureMarkdown"

export interface FeatureFeaturedLinkProps {
  featuredLink: FeatureFeaturedLink_featuredLink
}

const FeatureFeaturedLink: React.FC<FeatureFeaturedLinkProps> = ({ featuredLink }) => {
  const { width } = useScreenDimensions()
  const navRef = useRef(null)
  return (
    <Flex ref={navRef}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={
          featuredLink.href
            ? () => {
                SwitchBoard.presentNavigationViewController(navRef.current!, featuredLink.href!)
              }
            : undefined
        }
      >
        <OpaqueImageView imageURL={featuredLink.image?.url} width={width} height={420} />
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.4)"]}
          style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 180 }}
        />
        <Flex
          style={{
            position: "absolute",
            left: 20,
            right: 20,
            bottom: 20,
            color: "white",
          }}
        >
          <Sans size="6" color="white">
            {featuredLink.title}
          </Sans>
          {!!featuredLink.subtitle && (
            <FeatureMarkdown content={featuredLink.subtitle} sansProps={{ color: "white" }} />
          )}
        </Flex>
      </TouchableOpacity>
      {!!featuredLink.description && (
        <Flex mx="2" pt="2">
          <FeatureMarkdown content={featuredLink.description} sansProps={{ color: "black60" }} />
        </Flex>
      )}
    </Flex>
  )
}

export const FeatureFeaturedLinkFragmentContainer = createFragmentContainer(FeatureFeaturedLink, {
  featuredLink: graphql`
    fragment FeatureFeaturedLink_featuredLink on FeaturedLink {
      href
      title
      subtitle
      description
      image {
        url(version: "wide")
      }
    }
  `,
})
