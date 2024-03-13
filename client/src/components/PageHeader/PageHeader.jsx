import { Helmet } from "react-helmet";

const PageHeader = ({
  title,
  icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/2048px-Facebook_Messenger_logo_2020.svg.png",
}) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <link rel={"shortcut icon"} href={icon} />
      </Helmet>
    </>
  );
};

export default PageHeader;
