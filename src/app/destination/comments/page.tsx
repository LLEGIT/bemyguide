"use client";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { DestinationViewModel } from "@/ViewModel/Destination/DestinationViewModel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import { useIntl } from "react-intl";
import DestinationTabs from "@/components/DestinationTabs/destinationtabs";
import {
  AdviceType,
  Comment,
  Destination,
} from "@/Models/Destination/DestinationModel";
import { Avatar, Chip, LinearProgress } from "@mui/material";
import CommentForm from "@/components/CommentForm/comment-form";
import { AccountCircle, SentimentDissatisfied } from "@mui/icons-material";
import DestinationHeader from "@/components/DestinationHeader";
import { ModificationSuggestionForm } from "@/components/ModificationSuggestionForm/ModificationSuggestionForm";
import { AuthContext } from "@/context/AuthContext";

export default function DestinationPageComments() {
  const i18n = useIntl();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [destinationComments, setDestinationComments] =
    useState<Array<Comment>>();
  const [destinationDetails, setDestinationDetails] = useState<Destination>();
  const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const destinationId: string = searchParams.get("id") ?? "";
  const { userContext } = useContext(AuthContext);

  useEffect(() => {
    if (!destinationComments) {
      DestinationViewModel.getComments(
        destinationId,
        setDestinationComments,
        setLoading
      );
    }
    if (!destinationDetails) {
      DestinationViewModel.onRead(destinationId, setDestinationDetails);
    }
  }, [destinationComments, destinationId, destinationDetails]);

  return (
    <>
      {destinationDetails && userContext?.id && (
        <ModificationSuggestionForm
          open={suggestionModalOpen}
          handleClose={() => setSuggestionModalOpen(false)}
          destination={destinationDetails}
        />
      )}
      <Grid container padding={{ xs: "22px", lg: "20px 15%" }}>
        <>
          <DestinationHeader
            destinationDetails={destinationDetails}
            setSuggestionModalOpen={setSuggestionModalOpen}
            userContext={userContext}
          />
          <Box width="100%" marginBottom="20px">
            <DestinationTabs selectedTab={5} destinationId={destinationId} />
          </Box>

          <Box width="100%" display="flex" flexDirection="column" gap={5}>
            {(loading && (
              <Box width="100%" padding={{ xs: 10, lg: 20 }}>
                <LinearProgress />
              </Box>
            )) ||
              (destinationComments && (
                <Box width="100%" display="flex" gap={2} flexDirection="column">
                  <CommentForm
                    destinationId={destinationId}
                    setCommentsOrAdvices={setDestinationComments}
                    commentsOrAdvices={destinationComments ?? []}
                    contentType={AdviceType.COMMENT}
                  />
                  <Box display="flex" flexWrap="wrap" gap={2}>
                    {destinationComments.length > 0 ? (
                      destinationComments.map(
                        (comment: Comment, key: number) => (
                          <Box
                            display="flex"
                            flexDirection="column"
                            borderRadius={5}
                            padding={2}
                            gap={1}
                            sx={{ backgroundColor: "#3F3F3F", color: "white" }}
                            width={{ xs: "100%", lg: "49%" }}
                            key={key}
                          >
                            <Box
                              width="100%"
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              {typeof comment?.user === "object" &&
                                !Array.isArray(comment.user) &&
                                ((comment.user.avatar && (
                                  <Chip
                                    sx={{ backgroundColor: "white" }}
                                    avatar={
                                      <Avatar
                                        alt="User avatar"
                                        src={
                                          "data:image/png;base64," +
                                          (typeof comment.user.avatar !==
                                          "string"
                                            ? (Buffer.from(
                                                comment.user.avatar as Buffer
                                              ).toString("base64") as string)
                                            : "")
                                        }
                                      />
                                    }
                                    label={comment.user.username}
                                  />
                                )) || (
                                  <Chip
                                    sx={{ backgroundColor: "white" }}
                                    icon={<AccountCircle />}
                                    label={comment.user.username}
                                  />
                                ))}
                              <Typography variant="body2">
                                {new Date(comment.createdAt).toLocaleDateString(
                                  "fr"
                                )}
                              </Typography>
                            </Box>
                            <Typography variant="body2">
                              {comment.rawText}
                            </Typography>
                          </Box>
                        )
                      )
                    ) : (
                      <Chip
                        icon={<SentimentDissatisfied />}
                        color="warning"
                        sx={{ fontSize: 15, fontWeight: "bold" }}
                        label={i18n.formatMessage({
                          id: "destination_tab_label_comments_error",
                        })}
                      />
                    )}
                  </Box>
                </Box>
              )) || (
                <Box>
                  <Typography variant="body1">
                    {i18n.formatMessage({
                      id: "destination_forbidden_section_message",
                    })}
                  </Typography>
                </Box>
              )}
          </Box>
        </>
      </Grid>
    </>
  );
}
