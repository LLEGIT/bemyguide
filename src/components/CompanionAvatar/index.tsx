import { User } from "@/Models/User/UserModel";
import { Routes } from "@/utils/routes";
import styled from "@emotion/styled";
import { Avatar, Link, Typography, colors } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";
import { DeleteCompanionButton } from "../Buttons/Buttons";
import ConfirmationModal from "../Modal/ConfirmationModal";
import Crown from "../../assets/crown_icon.png";
import Image from "next/image";

interface CompanionAvatarProps {
  companion: User;
  handleCompanionDelete: (companion: User) => Promise<void>;
  isAdmin: boolean;
}

export default function CompanionAvatar({
  companion,
  handleCompanionDelete,
  isAdmin,
}: CompanionAvatarProps) {
  const [showDelete, setShowDelete] = useState(false);

  const handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <CustomLink
      href={Routes.User_Profile(companion.username as string)}
      onMouseOver={() => setShowDelete(true)}
      onMouseOut={() => setShowDelete(false)}
    >
      {showDelete && !isAdmin && (
        <ConfirmationModal
          title="trip_deletion_companion_confirmation_modal_title"
          content="trip_deletion_companion_confirmation_modal_content"
          customButton={<DeleteCompanionButton />}
          innerButton="common_delete"
          callback={() => {
            handleCompanionDelete(companion);
            setShowDelete(false);
          }}
          onClick={handleClick}
        />
      )}
      <Avatar
        sx={{
          margin: 2,
          bgcolor: deepOrange[500],
          width: 100,
          height: 100,
        }}
        alt={companion.username + `'s avatar`}
        src={
          companion.avatar
            ? "data:image/png;base64," +
              (typeof companion.avatar !== "string"
                ? Buffer.from(companion.avatar as ArrayBuffer).toString(
                    "base64"
                  )
                : companion.avatar)
            : ""
        }
      >
        <Typography sx={{ fontSize: 32 }}>
          {companion?.username?.charAt(0).toUpperCase()}
        </Typography>
      </Avatar>
      {isAdmin ? (
        <AdminContainer>
          <CustomImage alt="admin-icon" src={Crown} />
          <CustomTypography>{companion?.username}</CustomTypography>
        </AdminContainer>
      ) : (
        <CustomTypography>{companion?.username}</CustomTypography>
      )}
    </CustomLink>
  );
}

const CustomLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  align-items: center;
  color: ${colors.grey[800]};
  width: 132px;
`;

const AdminContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CustomTypography = styled(Typography)`
  display: block;
  width: 83px;
  height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const CustomImage = styled(Image)`
  width: 20px;
  height: auto;
  object-fit: cover;
  margin-right: 5px;
`;
