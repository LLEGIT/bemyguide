"use client";
import { Destination } from "@/Models/Destination/DestinationModel";
import { DestinationViewModel } from "@/ViewModel/Destination/DestinationViewModel";
import DestinationTabs from "@/components/DestinationTabs/destinationtabs";
import { Box, Grid, LinearProgress, Link, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import NotFoundImg from "./../../../assets/undraw_online_information.svg";
import Image from "next/image";
import DestinationHeader from "@/components/DestinationHeader";
import { AuthContext } from "@/context/AuthContext";
import { ModificationSuggestionForm } from "@/components/ModificationSuggestionForm/ModificationSuggestionForm";

interface Article {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export default function DestinationPageArticles() {
  const i18n = useIntl();
  const searchParams = useSearchParams();
  const { userContext } = useContext(AuthContext);
  const id: string = searchParams.get("id") ?? "";
  const [articles, setArticles] = useState<Array<Article>>();
  const [destinationDetails, setDestinationDetails] = useState<Destination>();
  const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    DestinationViewModel.onRead(id, setDestinationDetails);
  }, []);

  useEffect(() => {
    if (!articles && destinationDetails) {
      DestinationViewModel.getArticles(
        i18n.formatMessage({ id: destinationDetails?.name }),
        setArticles
      );
    }
  }, [destinationDetails]);

  useEffect(() => {
    if (articles) {
      setLoading(false);
    }
  }, [articles]);

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
          <Box sx={{ width: "100%" }} marginBottom="20px">
            <DestinationTabs selectedTab={2} destinationId={id} />
          </Box>

          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={5}
            margin="20px 0"
          >
            {(loading && (
              <Box width="100%" padding={{ xs: 10, lg: 20 }}>
                <LinearProgress />
              </Box>
            )) ||
              (articles &&
                articles.length > 0 &&
                articles.map((article: Article, index: number) => (
                  <Link
                    href={article.url}
                    target="_blank"
                    sx={{
                      textDecoration: "none",
                      color: "black",
                    }}
                    key={index}
                    width={{ lg: "60%" }}
                  >
                    <Box
                      borderTop={index === 0 ? "none" : "3px solid #3F3F3F"}
                      paddingTop={index === 0 ? 0 : 10}
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      gap={2}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: { xs: "block", lg: "none" },
                        }}
                      >
                        {article.urlToImage ? (
                          <img
                            style={{ width: "100%" }}
                            src={article.urlToImage}
                            alt={article.title}
                          />
                        ) : (
                          <Image
                            src={NotFoundImg}
                            alt={article.title}
                            height="120"
                            width="200"
                          />
                        )}
                      </Box>
                      <Box sx={{ display: { xs: "none", lg: "block" } }}>
                        {article.urlToImage ? (
                          <img
                            style={{ width: "100%" }}
                            src={article.urlToImage}
                            alt={article.title}
                          />
                        ) : (
                          <Image
                            src={NotFoundImg}
                            alt={article.title}
                            height="280"
                            width="400"
                          />
                        )}
                      </Box>
                      <Typography variant="h5" textAlign={{ lg: "left" }}>
                        {article.title}
                      </Typography>
                      <Typography variant="body1">
                        {article.description?.replace(/<\/?[^>]+(>|$)/g, "")}
                      </Typography>
                    </Box>
                  </Link>
                ))) || (
                <Typography variant="body1">
                  {i18n.formatMessage({
                    id: "destination_no_articles_message",
                  })}
                </Typography>
              )}
          </Box>
        </>
      </Grid>
    </>
  );
}
