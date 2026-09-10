import Link from "next/link";

// Post: What a restaurant website needs
// Target query: "restaurant website"
export function RestaurantWebsitePost() {
  return (
    <>
      <p>
        <strong>Almost everyone who lands on a restaurant site wants three things:</strong> the
        menu, the hours and how to get there. Most sites lead with a video of the chef and bury
        all three in a submenu. That&apos;s the order to reverse.
      </p>

      <h2>The context that changes everything: nearly everyone arrives on a phone</h2>
      <p>
        Someone is out on the street, hungry, deciding between your restaurant and the one next
        door. They have their phone in hand and thirty seconds of patience.
      </p>
      <p>
        Everything below follows from that. If your site looks good on a monitor but needs pinching
        to read on a phone, you&apos;re losing at exactly the moment of the decision.
      </p>

      <h2>The six things, in order</h2>

      <h3>1. The menu, with prices, as text</h3>
      <p>
        The most looked-for thing by a wide margin. And the most common mistake is publishing it as
        an <strong>image or a PDF</strong>: it&apos;s heavy, it can&apos;t be read without zooming,
        and Google can&apos;t index what it says — so you&apos;ll never come up when someone
        searches for a specific dish.
      </p>
      <p>
        The menu goes in as text, with prices visible. Without prices, plenty of people assume
        it&apos;s expensive and leave.
      </p>

      <h3>2. Hours, and whether you&apos;re open right now</h3>
      <p>
        A table of opening times isn&apos;t enough. Ideally the site says{" "}
        <strong>&quot;open now&quot; or &quot;closes in 40 minutes&quot;</strong>. And keep the
        holidays up to date: nothing annoys people more than arriving at a closed door because the
        site said otherwise.
      </p>

      <h3>3. How to get there, in one tap</h3>
      <p>
        Address visible and a button that opens Google Maps directly. Not an embedded map that
        takes its time loading: a link that fires up navigation.
      </p>

      <h3>4. Phone and WhatsApp as buttons</h3>
      <p>
        It should dial when tapped. A number you have to copy and paste loses calls. If you take
        bookings or deliveries over WhatsApp, that button is the most important thing on the whole
        site.
      </p>

      <h3>5. Real photos of your own dishes</h3>
      <p>
        Real ones, not stock. People notice, and a generic photo of pasta says exactly the opposite
        of what you want it to. You don&apos;t need a professional photographer to start: good
        natural light and a decent phone go a long way.
      </p>

      <h3>6. Bookings or orders, if they apply</h3>
      <p>
        If you take bookings, make them possible from the site. If you deliver, say clearly whether
        it&apos;s through your own channel or an app, and which areas you reach.
      </p>

      <h2>What doesn&apos;t belong</h2>
      <ul>
        <li>
          <strong>A background video on the home page.</strong> It&apos;s heavy, it burns the
          customer&apos;s data and it delays what they came for.
        </li>
        <li>
          <strong>Autoplaying music.</strong> They&apos;re either in a noisy restaurant or in an
          office. Neither one wants music.
        </li>
        <li>
          <strong>A splash screen.</strong> One more click between the customer and the menu.
        </li>
        <li>
          <strong>&quot;Our story&quot; first.</strong> Put it in, but further down. They eat
          first; who cooks matters after.
        </li>
        <li>
          <strong>A PDF menu.</strong> Worth repeating, because it&apos;s the most frequent mistake
          and the most expensive one in SEO terms.
        </li>
      </ul>

      <h2>What almost nobody does and does bring customers</h2>
      <p>
        A restaurant competes in local searches, and there are two levers there worth more than the
        design:
      </p>
      <ol>
        <li>
          <strong>A spotless Google Business profile, linked to your site.</strong> For
          &quot;restaurants near me&quot;, that profile counts for more than the site. Current
          photos, correct hours, and replying to reviews.
        </li>
        <li>
          <strong>A page per signature dish or per category.</strong> If you&apos;re known for one
          dish, a page about it can rank for{" "}
          <em>&quot;that dish in [your city]&quot;</em>. A PDF menu will never manage that.
        </li>
      </ol>
      <p>
        Add schema.org&apos;s <code>Restaurant</code> markup with hours, price range and cuisine
        type. That&apos;s what lets Google show the information straight in the result.
      </p>

      <blockquote>
        Test your own site: open it on your phone on mobile data, not wi-fi, and count how many
        taps it takes to see a price. If it&apos;s more than two, there&apos;s your problem.
      </blockquote>

      <h2>What something like that costs</h2>
      <p>
        A properly resolved restaurant site falls in the corporate-site range: between $2,500,000
        and $6,000,000 COP depending on whether it includes bookings or online ordering. The full
        breakdown is in{" "}
        <Link href="/en/blog/how-much-does-a-website-cost-in-colombia">
          how much a website costs in Colombia
        </Link>
        .
      </p>
      <p>
        And if your restaurant lives off passing trade and you&apos;re not sure you need your own
        site yet, read{" "}
        <Link href="/en/blog/does-my-business-need-a-website">
          does my business need a website?
        </Link>{" "}
        first — there are cases where the Google profile is enough for now.
      </p>
      <p>
        The other half of the job is showing up when someone searches for where to eat with the
        city name next to it. That&apos;s local SEO and it has its own budget:{" "}
        <Link href="/en/blog/how-much-does-seo-cost-in-colombia">
          how much SEO costs in Colombia
        </Link>{" "}
        explains it, and if your restaurant is on the coast, how I work it is in{" "}
        <Link href="/diseno-de-paginas-web-en-cartagena">web design in Cartagena</Link> and{" "}
        <Link href="/diseno-de-paginas-web-en-barranquilla">in Barranquilla</Link>. The monthly
        work, with what it includes and what it doesn&apos;t promise, is in{" "}
        <Link href="/en/services/seo">SEO</Link>; and the site itself, in{" "}
        <Link href="/en/services/web-design">web design</Link>.
      </p>
    </>
  );
}
