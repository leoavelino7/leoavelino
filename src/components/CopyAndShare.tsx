import { FC, Fragment } from "react";
import { toast, ToastContainer } from "react-toastify";
import { CopyIcon, FacebookIcon, InstagramIcon, TwitterIcon } from "~/icons";
import { copyToClipboard } from "~/lib/copyToClipboard";
import { share } from "~/lib/share";

const iconCommonClassName = "w-5 h-5";

type Media = {
  title: string;
  Icon: JSX.Element;
};

const medias: Media[] = [
  {
    title: "Facebook",
    Icon: <FacebookIcon className={iconCommonClassName} />
  },
  {
    title: "Twitter",
    Icon: <TwitterIcon className={iconCommonClassName} />
  },
  {
    title: "Instagram",
    Icon: <InstagramIcon className={iconCommonClassName} />
  }
];

type CopyAndShareProps = {
  text: string;
  shareData: ShareData;
};

export const CopyAndShare: FC<CopyAndShareProps> = ({ text, shareData }) => {
  const sharePost = () => {
    share(shareData);
  };

  const copy = () => {
    copyToClipboard(text);
    toast.success("Link copiado", {
      theme: "colored",
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true
    });
  };

  return (
    <Fragment>
      <ul className="flex flex-row justify-center gap-2 text-primary pb-36">
        <li className="flex flex-row justify-center">
          <button
            className="flex flex-row justify-center items-center gap-x-2 py-1 px-5 border border-solid border-primary rounded-md hover:bg-primary hover:text-paper focus:brightness-75"
            onClick={copy}
          >
            <CopyIcon className={iconCommonClassName} /> Copiar link
          </button>
        </li>
        {medias.map((media) => (
          <li key={media.title} className="flex flex-row justify-center">
            <button
              className="p-2 border border-solid border-primary rounded-md hover:bg-primary hover:text-paper focus:outline-dashed focus:brightness-75"
              onClick={sharePost}
            >
              {media.Icon}
            </button>
          </li>
        ))}
      </ul>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </Fragment>
  );
};
