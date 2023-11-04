"use client";
import { ApiUrls, apiUrl } from "@/Configs/ApiConfigs";
import { Advice, AdviceType, Comment } from "@/Models/Destination/DestinationModel";
import { AuthContext } from "@/context/AuthContext";
import { Method, commonFetcher } from "@/utils/fetcher";
import { Send } from "@mui/icons-material";
import { Grid, IconButton, LinearProgress, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { useIntl } from "react-intl";

interface commentFormProps {
  destinationId: string;
  setCommentsOrAdvices: (comments: Array<Comment | Advice>) => void;
  commentsOrAdvices: Array<Comment | Advice>;
  contentType: AdviceType
}

export default function CommentForm({
  destinationId,
  setCommentsOrAdvices,
  commentsOrAdvices,
  contentType = AdviceType.COMMENT
}: commentFormProps) {
  const i18n = useIntl();
  const [rawText, setRawText] = useState<string>("");
  const [sending, setSending] = useState<Boolean>(false);
  const { userContext } = useContext(AuthContext);

  const sendComment = async (e: any) => {
    setSending(true);

    if (destinationId && userContext) {
      let url: string = apiUrl(ApiUrls.DESTINATION_INFORMATIONS(destinationId));
      let body: Comment = {
        rawText: rawText,
        type: contentType,
        validated: true,
        user: userContext.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await commonFetcher({
        url: url,
        method: Method.POST,
        postBody: body,
      });

      let newCommentDisplay = { ...body };
      newCommentDisplay.user = userContext;

      setCommentsOrAdvices([...commentsOrAdvices, newCommentDisplay]);
      setSending(false);
      setRawText("");

      return;
    }
  };

  return (
    <Grid
      item
      xs={12}
      display="flex"
      flexDirection="column"
    >
      <Box width={{xs: "100%", lg: "50%"}}>
        <Box marginBottom={1}>
          <TextField
            fullWidth
            onChange={(e) => setRawText(e.target.value)}
            value={rawText}
            multiline
            rows={2}
            label={i18n.formatMessage({
              id: "destination_comments_label_write",
            })}
            disabled={userContext ? false : true}
            helperText={!userContext && i18n.formatMessage({id: "destination_forbidden_section_message"})}
          />
        </Box>
        <Box>
          {(sending && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )) || (
            <IconButton
              disabled={rawText === ""}
              color="primary"
              onClick={sendComment}
            >
              <Send />
            </IconButton>
          )}
        </Box>
      </Box>
    </Grid>
  );
}
