import { Box, Button } from "@mui/material";
import GoBackButton from "../GoBackButton/GoBackButton";
import { Routes } from "@/utils/routes";
import { useIntl } from "react-intl";
import { Flight } from "@mui/icons-material";
import { ModificationSuggestionButton } from "../Buttons/Buttons";
import styled from "@emotion/styled";
import { Destination } from "@/Models/Destination/DestinationModel";
import { UserContext } from "@/Models/User/UserModel";
import { TripViewModel } from "@/ViewModel/Trip/TripViewModel";
import { CommonToastSuccessWithTitle } from "@/utils/toast";
import { AddTripModel } from "@/Models/Trip/TripModel";

interface DestinationHeaderProps {
  destinationDetails?: Destination;
  setSuggestionModalOpen: (value: boolean) => void;
  userContext?: UserContext;
}

export default function DestinationHeader({
  destinationDetails,
  setSuggestionModalOpen,
  userContext,
}: DestinationHeaderProps) {
  const i18n = useIntl();

  const createTrip = async () => {
    const body: AddTripModel = {
      users: [userContext?.id as string],
      destination: destinationDetails?._id as string,
    };
    TripViewModel.onCreate(body);
    CommonToastSuccessWithTitle("destination_trips_create_success");
  };

  return (
    <>
      <DestinationHeaderContainer>
        <Box>
          <GoBackButton url={Routes.Index} />
        </Box>

        {destinationDetails && userContext?.id && (
          <>
            {/* Desktop button */}
            <Button
              sx={{
                display: { xs: "none", lg: "flex" },
                marginLeft: { lg: "80px" },
              }}
              startIcon={<Flight />}
              variant="contained"
              onClick={createTrip}
            >
              {i18n.formatMessage({
                id: "destination_details_button_primary",
              })}
            </Button>
            <Box>
              <ModificationSuggestionButton
                label={i18n.formatMessage({
                  id: "destination_suggest_modification",
                })}
                onClick={() => setSuggestionModalOpen(true)}
              />
            </Box>
          </>
        )}
      </DestinationHeaderContainer>
      {destinationDetails && userContext?.id && (
        <Box sx={{ width: "100%" }} marginBottom="20px">
          {/* Mobile button */}
          <Button
            sx={{ display: { xs: "flex", lg: "none" } }}
            startIcon={<Flight />}
            variant="contained"
            onClick={createTrip}
          >
            {i18n.formatMessage({
              id: "destination_details_button_primary",
            })}
          </Button>
        </Box>
      )}
    </>
  );
}

const DestinationHeaderContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;
