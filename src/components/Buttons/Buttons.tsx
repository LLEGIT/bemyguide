import styled from "@emotion/styled";
import {
  Add,
  Create,
  Delete,
  Edit,
  FoodBank,
  Image,
  InfoOutlined,
  Save,
  ThumbDown,
  ThumbUp,
} from "@mui/icons-material";
import { Avatar, Button, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: any;
}

interface AvatarButtonProps {
  onClick?: (e: any) => void;
  disabled?: boolean;
}

export const EditButton = ({ ...props }: ButtonProps) => (
  <>
    {props.label ? (
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<Edit />}
        onClick={props.onClick}
      >
        {props.label ?? "Edit"}
      </Button>
    ) : (
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={props.onClick}
      >
        <Edit />
      </Button>
    )}
  </>
);

export const DeleteButton = ({ ...props }: ButtonProps) => (
  <>
    {props.label ? (
      <Button
        variant="contained"
        color="error"
        size="small"
        startIcon={<Delete />}
        onClick={props.onClick}
        style={props.style}
      >
        {props.label ?? "Delete"}
      </Button>
    ) : (
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={props.onClick}
        style={props.style}
      >
        <Delete />
      </Button>
    )}
  </>
);

const CustomDeleteButton = styled(Button)`
  width: 35px;
  height: 35px;
  position: absolute;
  border-radius: 50%;
  min-width: 0;
  min-height: 0;
  margin: 0;
  margin-left: 25px;
  margin-top: 10px;
  z-index: 1;
`;

export const DeleteCompanionButton = ({ ...props }: AvatarButtonProps) => (
  <CustomDeleteButton
    variant="contained"
    color="error"
    size="small"
    onClick={props.onClick}
  >
    <Delete />
  </CustomDeleteButton>
);

export const SubmitButton = ({ ...props }: ButtonProps) => (
  <Button
    sx={{ marginTop: "16px" }}
    variant="contained"
    size="large"
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.label ?? "Submit"}
  </Button>
);

export const PhotosButton = ({ ...props }: ButtonProps) => (
  <>
    {props.label ? (
      <Button
        variant="contained"
        color="warning"
        size="small"
        startIcon={<Image />}
        onClick={props.onClick}
      >
        {props.label ?? "Photos"}
      </Button>
    ) : (
      <Button
        variant="contained"
        color="warning"
        size="small"
        onClick={props.onClick}
      >
        <Image />
      </Button>
    )}
  </>
);

export const CreateButton = ({ ...props }: ButtonProps) => (
  <>
    {props.label ? (
      <Button
        variant="contained"
        color="success"
        size="small"
        startIcon={<Create />}
        onClick={props.onClick}
      >
        {props.label ?? "Create"}
      </Button>
    ) : (
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={props.onClick}
      >
        <Create />
      </Button>
    )}
  </>
);

export const ProductButton = ({ ...props }: ButtonProps) => (
  <>
    {props.label ? (
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<FoodBank />}
        onClick={props.onClick}
      >
        {props.label ?? "Products"}
      </Button>
    ) : (
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={props.onClick}
      >
        <FoodBank />
      </Button>
    )}
  </>
);

export const SaveButton = ({ ...props }: ButtonProps) => (
  <>
    {props.label ? (
      <Button
        variant="contained"
        color="success"
        size="small"
        startIcon={<Save />}
        onClick={props.onClick}
      >
        {props.label ?? "Save"}
      </Button>
    ) : (
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={props.onClick}
      >
        <Save />
      </Button>
    )}
  </>
);

export const InformationButton = ({ ...props }: ButtonProps) => (
  <>
    {props.label ? (
      <Button
        variant="contained"
        color="info"
        size="small"
        startIcon={<InfoOutlined />}
        onClick={props.onClick}
      >
        {props.label ?? "Informations"}
      </Button>
    ) : (
      <Button
        variant="contained"
        color="info"
        size="small"
        onClick={props.onClick}
      >
        <InfoOutlined />
      </Button>
    )}
  </>
);

export const ModificationSuggestionButton = ({ ...props }: ButtonProps) => (
  <Typography
    onClick={props.onClick}
    color="black"
    fontFamily="sans-serif"
    fontSize="14px"
    textAlign="end"
    sx={{ cursor: "pointer", ":hover": { textDecoration: "underline" } }}
    display="flex"
    align="center"
    gap={1}
  >
    <Edit sx={{ fontSize: 18 }} />
    {props.label ?? "Suggest a change"}
  </Typography>
);

export const AddInCircleButton = ({ ...props }: ButtonProps) => (
  <Avatar
    sx={{
      margin: 2,
      bgcolor: blue[500],
      width: 100,
      height: 100,
      cursor: "pointer",
      transition: "cursor 0.3s",
      "&:hover": {
        cursor: "pointer",
      },
    }}
    alt="Add"
    src="/"
  >
    <Typography sx={{ fontSize: 44, fontWeight: 400 }}>
      {props.label ?? "+"}
    </Typography>
  </Avatar>
);

export const ApproveButton = ({ ...props }: ButtonProps) => (
  <>
    {props.label ? (
      <Button
        variant="contained"
        color="success"
        size="small"
        startIcon={<ThumbUp />}
        onClick={props.onClick}
        style={{ minWidth: "200px", padding: "10px" }}
      >
        {props.label ?? "Approve"}
      </Button>
    ) : (
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={props.onClick}
        style={{ minWidth: "200px", padding: "10px" }}
      >
        <ThumbUp />
      </Button>
    )}
  </>
);

export const RejectButton = ({ ...props }: ButtonProps) => (
  <>
    {props.label ? (
      <Button
        variant="contained"
        color="error"
        size="small"
        startIcon={<ThumbDown />}
        onClick={props.onClick}
        style={{ minWidth: "200px", padding: "10px" }}
      >
        {props.label ?? "Reject"}
      </Button>
    ) : (
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={props.onClick}
        style={{ minWidth: "200px", padding: "10px" }}
      >
        <ThumbDown />
      </Button>
    )}
  </>
);

export const AddButton = ({ ...props }: ButtonProps) => (
  <Button
    variant="contained"
    color="success"
    size="small"
    startIcon={<Add />}
    onClick={props.onClick}
    style={{ minWidth: "200px", padding: "10px" }}
  >
    <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
      {props.label ?? "Add"}
    </Typography>
  </Button>
);
