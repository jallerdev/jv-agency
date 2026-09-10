import Link from "next/link";

// Post: A website, or just Instagram?
// Target query: "website or instagram"
export function WebsiteOrInstagramPost() {
  return (
    <>
      <p>
        <strong>They don&apos;t compete.</strong> Instagram puts you in front of people who
        weren&apos;t looking for you; a website makes you findable by someone already looking. Two
        different moves, and which one you&apos;re missing depends on how people buy from you
        today.
      </p>

      <h2>What each one does well</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Instagram</th>
            <th>A website</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Discovery</td>
            <td>Found by people who weren&apos;t looking</td>
            <td>Found by people already searching for what you sell</td>
          </tr>
          <tr>
            <td>Purchase intent</td>
            <td>Low: people are killing time</td>
            <td>High: they typed your service into Google</td>
          </tr>
          <tr>
            <td>Cost to start</td>
            <td>Zero</td>
            <td>From $850,000 COP</td>
          </tr>
          <tr>
            <td>Shelf life of content</td>
            <td>Hours</td>
            <td>Years</td>
          </tr>
          <tr>
            <td>Control</td>
            <td>None: Meta sets the rules</td>
            <td>Total</td>
          </tr>
          <tr>
            <td>Credibility for high tickets</td>
            <td>Limited</td>
            <td>High</td>
          </tr>
        </tbody>
      </table>

      <h2>The point almost nobody makes: you don&apos;t own your audience</h2>
      <p>
        Your followers aren&apos;t yours. They&apos;re Meta&apos;s. If the algorithm changes
        tomorrow, if your account gets suspended over a report, or if someone clones it, you lose
        the whole channel — and there&apos;s nobody to appeal to.
      </p>
      <p>
        It happens to real businesses all the time. Rebuilding five years of followers from zero is
        a blow plenty of them don&apos;t get up from.
      </p>
      <blockquote>
        You rent an audience on social. You own your site and your contact list. That&apos;s the
        whole difference.
      </blockquote>

      <h2>The difference that decides it: intent</h2>
      <p>
        Someone who sees your post about acrylic nails on Instagram was watching videos, not looking
        for a manicurist. Someone who types &quot;acrylic nails Bocagrande&quot; into Google{" "}
        <strong>has the intent right now</strong>.
      </p>
      <p>
        That second person is worth far more and is easier to convert. But they only reach you if
        you exist in the search engine — and an Instagram profile almost never ranks for those
        searches.
      </p>

      <h2>So which do you need?</h2>

      <h3>Instagram is enough if…</h3>
      <ul>
        <li>You sell on impulse and the visual is 90% of the decision.</li>
        <li>Your ticket is low and the purchase is quick.</li>
        <li>Your business is local and passing trade.</li>
        <li>You&apos;re starting out and have no budget. Start here, guilt-free.</li>
      </ul>

      <h3>You need a website if…</h3>
      <ul>
        <li>Your ticket is high and the customer researches before deciding.</li>
        <li>You sell to companies.</li>
        <li>Your customers search for your service on Google.</li>
        <li>You need to show prices, processes or a portfolio in an orderly way.</li>
        <li>You&apos;re tired of repeating the same thing over direct message.</li>
      </ul>

      <h2>What the best combination does</h2>
      <p>
        Instagram to catch attention and show the day to day. The site to convert whoever is already
        interested and to show up on Google. And the profile link pointing at the site, not at a
        generic link tree.
      </p>
      <p>Three concrete things that make them feed each other:</p>
      <ol>
        <li>
          <strong>The profile link goes to your site</strong>, to a page that continues what the
          person just saw in the post.
        </li>
        <li>
          <strong>Capture emails or WhatsApp numbers from the site.</strong> That&apos;s the list
          that is actually yours and survives any algorithm change.
        </li>
        <li>
          <strong>Reuse the content.</strong> A post that did well is the first draft of a page
          that will bring you visits for years.
        </li>
      </ol>
      <p>
        In businesses that live off the calendar — salon, barber shop, spa — that jump from the post
        to the booking is what leaves the most money on the table; I work it through separately in{" "}
        <Link href="/en/industries/salons-and-spas">websites for salons and spas</Link>. And if what
        you want is for WhatsApp to answer on its own when the message arrives,{" "}
        <Link href="/en/blog/how-much-does-a-whatsapp-chatbot-cost-in-colombia">
          how much a WhatsApp chatbot costs
        </Link>{" "}
        has the setup and monthly prices.
      </p>

      <h2>And if the budget only stretches to one</h2>
      <p>
        Start with the free one and do it properly: a{" "}
        <strong>Google Business profile</strong> with photos, hours, phone and reviews, plus the
        Instagram you already have. That puts you on the map, literally.
      </p>
      <p>
        When the moment comes, what I do is written up with price and timeline in{" "}
        <Link href="/en/services/web-design">web design</Link>; and if what&apos;s drowning you is
        taking payment over DM — sending the photo again, passing on the transfer details, waiting
        for the receipt — a store that charges on its own solves that:{" "}
        <Link href="/en/services/online-stores">online stores</Link>.
      </p>
      <p>
        When the business generates steady cash flow, the site stops being an expense and becomes an
        investment with a calculable return. The ranges are in{" "}
        <Link href="/en/blog/how-much-does-a-website-cost-in-colombia">
          how much a website costs in Colombia
        </Link>
        , and the criteria for deciding when in{" "}
        <Link href="/en/blog/does-my-business-need-a-website">
          does my business need a website?
        </Link>
        .
      </p>
    </>
  );
}
