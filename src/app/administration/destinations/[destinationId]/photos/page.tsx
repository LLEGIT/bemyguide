"use client";
import {
  DestinationEdit,
  initialDestinationFormData,
} from "@/Models/Destination/DestinationModel";
import { DestinationViewModel } from "@/ViewModel/Destination/DestinationViewModel";
import { DeleteButton, SubmitButton } from "@/components/Buttons/Buttons";
import { CommonToastSuccessWithTitle } from "@/utils/toast";
import {
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

export default function AdministrationDestinationPhotos({
  params,
}: {
  params: { destinationId: string };
}) {
  const i18n = useIntl();
  const [destinationDetails, setDestinationDetails] = useState<DestinationEdit>(
    initialDestinationFormData
  );
  const [newImage, setNewImage] = useState<{ url: string; alt: string }>({
    url: "",
    alt: "",
  });

  const handleSubmit = async () => {
    const data = {
      ...destinationDetails,
      images: [...destinationDetails.images, newImage],
    };
    const saved = await DestinationViewModel.onSave(data);
    CommonToastSuccessWithTitle("toast_success_common");
    setDestinationDetails(saved);
    setNewImage({ url: "", alt: "" });
  };

  const handleDeleteImage = async (index: number) => {
    const imagesFilter = destinationDetails.images.filter(
      (_, i) => i !== index
    );
    const data = {
      ...destinationDetails,
      images: imagesFilter,
    };
    const saved = await DestinationViewModel.onSave(data);
    CommonToastSuccessWithTitle("toast_success_remove_picture");
    setDestinationDetails(saved);
    setNewImage({ url: "", alt: "" });
  };

  useEffect(() => {
    DestinationViewModel.onRead(params.destinationId, setDestinationDetails);
  }, []);

  return (
    <Grid container padding={{ xs: "22px", lg: "20px 29%" }}>
      <ImageList sx={{ width: 600, height: 450 }}>
        {destinationDetails.images.map((image, index) => (
          <ImageListItem key={index}>
            <img
              src={`${image.url}?w=248&fit=crop&auto=format`}
              srcSet={`${image.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={image.alt}
              loading="lazy"
            />
            <ImageListItemBar
              actionIcon={
                <DeleteButton
                  onClick={() => handleDeleteImage(index)}
                  label={i18n.formatMessage({
                    id: "common_delete",
                  })}
                />
              }
              style={{ padding: 5 }}
              position="top"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Grid item xs={12} marginTop="30px">
        <Typography variant="h6">
          {i18n.formatMessage({
            id: "administration_destinations_image_title",
          })}
        </Typography>
        <FormControl fullWidth>
          <Grid item xs={12} marginTop="20px">
            <TextField
              label={i18n.formatMessage({
                id: "administration_destinations_image_url_label",
              })}
              value={newImage.url}
              onChange={(e) =>
                setNewImage({
                  ...newImage,
                  url: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} marginTop="20px">
            <TextField
              label={i18n.formatMessage({
                id: "administration_destinations_image_alt_label",
              })}
              value={newImage.alt}
              onChange={(e) =>
                setNewImage({
                  ...newImage,
                  alt: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <SubmitButton onClick={handleSubmit} />
        </FormControl>
      </Grid>
    </Grid>
  );
}
