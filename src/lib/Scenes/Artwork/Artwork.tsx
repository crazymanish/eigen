import { Flex } from "@artsy/palette"
import { Artwork_artwork } from "__generated__/Artwork_artwork.graphql"
import { ArtworkQuery } from "__generated__/ArtworkQuery.graphql"
import Separator from "lib/Components/Separator"
import { defaultEnvironment } from "lib/relay/createEnvironment"
import renderWithLoadProgress from "lib/utils/renderWithLoadProgress"
import React from "react"
import { View } from "react-native"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { ArtworkActionsFragmentContainer as ArtworkActions } from "./Components/ArtworkActions"
import { ArtworkAvailabilityFragmentContainer as ArtworkAvailability } from "./Components/ArtworkAvailability"
import { ArtworkTombstoneFragmentContainer as ArtworkTombstone } from "./Components/ArtworkTombstone"

interface Props {
  artwork: Artwork_artwork
}

export class Artwork extends React.Component<Props> {
  render() {
    const { artwork } = this.props
    return (
      <View>
        <Flex width="100%" style={{ backgroundColor: "gray" }} height={340} />
        <Flex alignItems="center" mt={2}>
          <ArtworkActions artwork={artwork} />
          <ArtworkTombstone artwork={artwork} />
          <Separator />
          <ArtworkAvailability artwork={artwork} />
        </Flex>
      </View>
    )
  }
}

export const ArtworkContainer = createFragmentContainer(Artwork, {
  artwork: graphql`
    fragment Artwork_artwork on Artwork {
      ...ArtworkTombstone_artwork
      ...ArtworkActions_artwork
      ...ArtworkAvailability_artwork
    }
  `,
})

export const ArtworkRenderer: React.SFC<{ artworkID: string }> = ({ artworkID }) => {
  return (
    <QueryRenderer<ArtworkQuery>
      environment={defaultEnvironment}
      query={graphql`
        query ArtworkQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...Artwork_artwork
          }
        }
      `}
      variables={{ artworkID }}
      render={renderWithLoadProgress(ArtworkContainer)}
    />
  )
}
