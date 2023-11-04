import { UserRegister } from "@/Models/User/UserModel";
import { UserViewModel } from "@/ViewModel/User/UserViewModel";
import { Delete, Face } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useIntl } from "react-intl";

interface UploadAvatarProps {
    user: UserRegister,
    userRegisterFieldValue: string,
    setUser: (object: UserRegister) => void,
    index: string
}

export default function UploadAvatar({ user, userRegisterFieldValue, setUser, index }: UploadAvatarProps) {
    const i18n = useIntl();

    if (user.avatar) {
        const userAvatar = user.avatar as File;
        return (
            <Button
                color="error"
                fullWidth
                endIcon={<Delete />}
                sx={{height: "56px", margin: "8px 0"}}
                key={userRegisterFieldValue}
                onClick={() => UserViewModel.deleteAvatar(setUser, user, userRegisterFieldValue, undefined, undefined)}
                variant="contained"
            >
                {userAvatar.name}
            </Button>
        );
    } else {
        return (
            <Button
                fullWidth
                startIcon={<Face />}
                variant="outlined"
                sx={{height: "56px", margin: "8px 0"}}
                onClick={() => UserViewModel.avatarUpload(setUser, user, userRegisterFieldValue, undefined)}
                key={userRegisterFieldValue}
            >
                {i18n.formatMessage({ id: index as string })}
            </Button>
        );
    }
}