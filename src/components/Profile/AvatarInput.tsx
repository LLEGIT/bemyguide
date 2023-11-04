import { UserProfile } from "@/Models/User/UserModel";
import { UserViewModel } from "@/ViewModel/User/UserViewModel";
import { handleMouseEnter, handleMouseLeave } from "@/utils/style";
import { AccountCircle, Delete } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { useState } from "react";

interface AvatarInputProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  newAvatar: string | Buffer | File | null | undefined;
  setNewAvatar: (newAvatar: string | Buffer | File | null | undefined) => void;
  userDatas: UserProfile;
}

export default function AvatarInput({
  isLoading,
  setIsLoading,
  newAvatar,
  setNewAvatar,
  userDatas,
}: AvatarInputProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {((isLoading || !newAvatar) && (
        <Avatar
          onClick={() =>
            UserViewModel.avatarUpload(setNewAvatar, undefined, undefined, setIsLoading)
          }
          onMouseEnter={() => handleMouseEnter(setIsHovered)}
          onMouseLeave={() => handleMouseLeave(setIsHovered)}
          sx={{
            width: 150,
            height: 150,
            cursor: "pointer",
            opacity: isHovered ? "70%" : "100%",
          }}
        >
          <AccountCircle sx={{ fontSize: 90 }} />
        </Avatar>
      )) ||
        (isHovered && (
          <Avatar
            onClick={() =>
              UserViewModel.deleteAvatar(
                undefined,
                undefined,
                undefined,
                setNewAvatar,
                userDatas
              )
            }
            onMouseLeave={() => handleMouseLeave(setIsHovered)}
            sx={{
              width: 150,
              height: 150,
              cursor: "pointer",
              opacity: isHovered ? "70%" : "100%",
            }}
          >
            <Delete color="error" sx={{ fontSize: 90 }} />
          </Avatar>
        )) || (
          <Avatar
            onMouseEnter={() => handleMouseEnter(setIsHovered)}
            sx={{
              width: 150,
              height: 150,
              cursor: "pointer",
              opacity: isHovered ? "70%" : "100%",
            }}
            src={
              "data:image/png;base64," +
              (typeof newAvatar === "string" ||
              newAvatar !== userDatas["avatar"]
                ? newAvatar
                : Buffer.from(newAvatar as WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>).toString("base64"))
            }
          />
        )}
    </Box>
  );
}
