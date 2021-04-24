import Slogan from "pages/home/sub/slogan";
import Slide from "pages/home/sub/slide";
import Query from "pages/home/sub/query";
import Testimonials from "./sub/testimonials";

export default function Home() {
  return (
    <div>
      <Slogan />
      <Slide />
      <Query />
      <Testimonials />
    </div>
  );
}
