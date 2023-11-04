import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Images } from "@/Models/Destination/DestinationModel";

export default function DestinationImageGalery({ images }: Images) {
  return (
    <Box sx={{ width: "100%", height: 350, overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={4} gap={8}>
        {images.map(
          (item: { url: string | undefined; alt: string | undefined }, index: number) => (
            <ImageListItem key={index}>
              <img
                src={`${item.url}?w=248&fit=crop&auto=format`}
                srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.alt}
                loading="lazy"
              />
            </ImageListItem>
          )
        )}
      </ImageList>
    </Box>
  );
}
