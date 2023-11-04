import styled from "@emotion/styled";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { IntlShape } from "react-intl";

interface ProductCardProps {
  product_name: string;
  floor_price: number;
  ceiling_price: number;
  original_floor_price?: number;
  original_ceiling_price?: number;
  i18n: IntlShape;
}

export default function ProductCard({
  product_name,
  floor_price,
  ceiling_price,
  original_floor_price,
  original_ceiling_price,
  i18n,
}: ProductCardProps) {
  return (
    <Grid
      item
      xs={12}
      margin="auto"
      maxWidth={{ xs: 345, lg: 450 }}
      width={{ xs: "100%" }}
      padding={{ xs: "0 22px 22px" }}
    >
      <Card>
        <CardContent>
          <CardTitle variant="h5">
            {i18n.formatMessage({
              id: product_name,
            })}
          </CardTitle>
          <PriceWrapper style={{ color: "red" }}>
            <PriceDetails>
              <PriceTitle>
                {i18n.formatMessage({
                  id: "administration_suggestions_product_floor_price",
                })}
              </PriceTitle>
              <Typography>{floor_price}</Typography>
            </PriceDetails>
            <PriceDetails>
              <PriceTitle>
                {i18n.formatMessage({
                  id: "administration_suggestions_product_ceiling_price",
                })}
              </PriceTitle>
              <Typography>{ceiling_price}</Typography>
            </PriceDetails>
          </PriceWrapper>
          {original_floor_price && original_ceiling_price && (
            <PriceWrapper style={{ marginTop: "30px" }}>
              <PriceDetails>
                <PriceTitle>
                  {i18n.formatMessage({
                    id: "administration_suggestions_product_original_floor_price",
                  })}
                </PriceTitle>
                <Typography>{original_floor_price}</Typography>
              </PriceDetails>
              <PriceDetails>
                <PriceTitle>
                  {i18n.formatMessage({
                    id: "administration_suggestions_product_original_ceiling_price",
                  })}
                </PriceTitle>
                <Typography>{original_ceiling_price}</Typography>
              </PriceDetails>
            </PriceWrapper>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

const CardTitle = styled(Typography)`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PriceDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const PriceTitle = styled(Typography)`
  margin-bottom: 10px;
`;
