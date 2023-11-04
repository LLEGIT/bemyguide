import { CheckCircle, Close, Error, Info } from "@mui/icons-material";
import { FormattedMessage, useIntl } from "react-intl";
import { toast } from "react-toastify";

const Container = (props: any) => (
  <div className="toastify-body-content">{props.children}</div>
);
const CloseContainer = (props: any) => (
  <div className="toastify-close-button">{props.children}</div>
);

enum ToastType {
  ERROR = "Error",
  SUCCESS = "Success",
  INFO = "Info",
}

interface ToastProps {
  title: string;
  showToast?: boolean;
  subtitle?: string;
  toastType?: ToastType;
  autoclose?: boolean;
  onClose?: () => void;
}

const CustomToastComponent = ({ title, subtitle, toastType }: ToastProps) => {
  const i18n = useIntl();

  const defineDefaultTitle = (): string => {
    if (subtitle) {
      if (toastType === ToastType.ERROR) {
        return "toast_error_title";
      } else {
        return "toast_success_title";
      }
    } else {
      if (toastType === ToastType.ERROR) {
        return "toast_error_common";
      } else {
        return "toast_success_common";
      }
    }
  };
  return (
    <Container>
      <div className={"toastify-title"}>
        <FormattedMessage
          id={title}
          defaultMessage={i18n.formatMessage({ id: defineDefaultTitle() })}
        />
      </div>
      {subtitle && (
        <div className="toastify-details">
          <FormattedMessage
            id={subtitle}
            defaultMessage={i18n.formatMessage({
              id:
                toastType === ToastType.ERROR
                  ? "toast_error_common"
                  : "toast_success_common",
            })}
          />
        </div>
      )}
    </Container>
  );
};

export const CustomToastError = ({
  title,
  showToast = true,
  subtitle,
}: ToastProps) =>
  showToast &&
  toast.error(
    <CustomToastComponent
      title={title}
      subtitle={subtitle}
      toastType={ToastType.ERROR}
    />,
    {
      position: "top-right",
      closeOnClick: true,
      closeButton: (
        <CloseContainer>
          <Close />
        </CloseContainer>
      ),
      autoClose: 3000,
      icon: <Error />,
    }
  );
export const CustomToastSuccess = ({
  title,
  showToast = true,
  subtitle,
  autoclose = true,
  onClose,
}: ToastProps) =>
  showToast &&
  toast.success(
    <CustomToastComponent
      title={title}
      subtitle={subtitle}
      toastType={ToastType.SUCCESS}
    />,
    {
      position: "top-right",
      closeOnClick: true,
      closeButton: (
        <CloseContainer>
          <Close />
        </CloseContainer>
      ),
      autoClose: !autoclose ? false : 3000,
      icon: <CheckCircle />,
      onClose: onClose,
    }
  );

export const CustomToastInfo = ({
  title,
  showToast = true,
  subtitle,
}: ToastProps) =>
  showToast &&
  toast.info(
    <CustomToastComponent
      title={title}
      subtitle={subtitle}
      toastType={ToastType.INFO}
    />,
    {
      position: "top-right",
      closeOnClick: true,
      closeButton: (
        <CloseContainer>
          <Close />
        </CloseContainer>
      ),
      autoClose: 3000,
      icon: <Info />,
    }
  );

export const CommonToastError = (showToast: boolean = true) =>
  CustomToastError({
    title: "toast_error_common",
    showToast: showToast,
  });

export const CommonToastErrorWithTitle = (
  id: string,
  showToast: boolean = true
) =>
  CustomToastError({
    title: "Toast_Error_Title",
    subtitle: id,
    showToast: showToast,
  });

export const CommonToastSuccess = () =>
  CustomToastSuccess({
    title: "toast_success_common",
  });

export const CommonToastSuccessWithTitle = (id: string) =>
  CustomToastSuccess({
    title: "toast_success_title",
    subtitle: id,
  });
