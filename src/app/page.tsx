import Banner from "./components/Banner";
import WhyChoose from "./components/WhyChoose";
import CookingStatistics from "./components/CookingStatistics";
import LatestBlogs from "./components/LatestBlogs";
import Testimonials from "./components/Testimonials";
import CallToAction from "./components/CallToAction";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <WhyChoose></WhyChoose>
      <CookingStatistics></CookingStatistics>
      <LatestBlogs></LatestBlogs>
      <Testimonials></Testimonials>
      <CallToAction></CallToAction>
    </div>
  );
}
