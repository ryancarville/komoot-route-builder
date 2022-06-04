import PageLayout from "./components/organisms/PageLayout/index";
import RouteBuilder from "./components/organisms/RouteBuilder";

function App () {
  return (
    <PageLayout
      pageTitle={"Komoot: Route Builder"}
      description={"Build your own cross country running route in seconds"}
      url={"https://www.komoot.com"}
      image={
        "https://www.komoot.com/images/og-images/og-image-default-en.png"
      }
      lang={"en"}
    >
      <RouteBuilder/>
    </PageLayout>
  );
}

export default App;
