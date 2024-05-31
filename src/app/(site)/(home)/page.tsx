import Blogs from "./_sections/blogs"
import Footer from "./_sections/footer"
import GetStarted from "./_sections/get-started"
import HomePageHero from "./_sections/home-page-hero"
import HowItWorks from "./_sections/how-it-works"
import Testimonials from "./_sections/testimonials"

export default function HomePage() {
    return (
        <main className="relative pt-[74px]">
            <HomePageHero />
            <HowItWorks />
            <Blogs />
            <Testimonials />
            <GetStarted />
            <Footer />
        </main>
    )
}
