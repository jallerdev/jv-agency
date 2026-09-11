import Link from "next/link";

import { PISOS, money } from "@/lib/quote";

// Post: What a landing page is, and when it is the right call
// Twin of `que-es-una-landing-page.tsx`.
//
// Prices through the English formatter: these are pesos, and `$850.000` reads
// as eight hundred and fifty dollars to an English reader.
const en = (n: number) => money(n, "en");

export function WhatIsALandingPagePost() {
  return (
    <>
      <p>
        <strong>A landing page is one page, with one goal, and no way out.</strong> No navigation
        menu, no &quot;about us&quot;, no blog. The visitor arrives, reads, and does one thing:
        leaves their details, books, buys or messages on WhatsApp.
      </p>
      <p>
        Everything that makes it different from an ordinary page follows from that. A website wants
        you to browse; a landing page wants you to decide.
      </p>

      <h2>Why the menu comes off</h2>
      <p>
        It sounds like a beginner&apos;s mistake and it&apos;s the opposite. Every link in the
        header is a chance for someone to wander off without doing the thing you brought them there
        to do. If you paid for advertising to get that person, the menu is costing you money.
      </p>
      <p>
        Which is why a landing page is almost always attached to a campaign: Google or social ads,
        an email to your list, a QR code on a flyer. There&apos;s an investment behind every visit,
        and the page exists so none of it is wasted.
      </p>

      <h2>The six parts nearly all of them have</h2>
      <ol>
        <li>
          <strong>A headline about what you gain, not what I sell.</strong> &quot;Your books up to
          date without chasing invoices&quot; works better than &quot;Integrated accounting
          services&quot;.
        </li>
        <li>
          <strong>One call to action, repeated.</strong> The same button, with the same words,
          three or four times down the page. Not a different one in every section.
        </li>
        <li>
          <strong>Proof that you exist.</strong> Real photos of the work, reviews with names,
          client logos if you have permission to use them. Invented testimonials are noticed and
          they do damage.
        </li>
        <li>
          <strong>The objection, handled.</strong> What people think and don&apos;t write: &quot;how
          much?&quot;, &quot;what if it doesn&apos;t work?&quot;, &quot;is this for a business my
          size?&quot;.
        </li>
        <li>
          <strong>A short form.</strong> Every field you add reduces the number of people who
          finish it. If name and WhatsApp will do, ask for name and WhatsApp.
        </li>
        <li>
          <strong>Speed.</strong> The invisible part, and the one that costs the most conversions:
          if the page is slow on mobile data, half the audience left before the headline.
        </li>
      </ol>

      <h2>Landing page or website: the decision, in a table</h2>
      <p>
        This is what people came to ask even when they typed something else. Both cases, plainly:
      </p>
      <table>
        <thead>
          <tr>
            <th>A landing page, if…</th>
            <th>A website, if…</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>You sell one service or product, not five</td>
            <td>You have several services to explain separately</td>
          </tr>
          <tr>
            <td>You&apos;re going to advertise and need somewhere to land people</td>
            <td>You want to be found on Google without paying per visit</td>
          </tr>
          <tr>
            <td>You&apos;re launching something and want to test interest first</td>
            <td>Customers search your name and need to confirm you exist</td>
          </tr>
          <tr>
            <td>You need to be online this week</td>
            <td>You plan to publish content, cases or a catalogue over time</td>
          </tr>
        </tbody>
      </table>

      <h3>The catch: on its own, a landing page barely ranks</h3>
      <p>
        This is the limitation nobody mentions while selling you one. A single page competes on
        Google with a single page, against sites that have twenty. It works well for paid traffic
        and for a link you hand out yourself; it doesn&apos;t work for being found unprompted.
      </p>
      <p>
        So if the plan is &quot;build the landing page, then stop paying for ads once I start
        showing up on Google&quot;, that plan has a hole in it. Showing up on Google is separate
        work with its own budget and timeline —{" "}
        <Link href="/en/blog/how-much-does-seo-cost-in-colombia">
          how much does SEO cost in Colombia
        </Link>{" "}
        goes into it.
      </p>

      <h2>What each one costs</h2>
      <p>
        This is where the decision gets concrete. A{" "}
        <strong>landing page starts at {en(PISOS.landing)}</strong> and a{" "}
        <strong>corporate site at {en(PISOS.corporativa)}</strong>: not a difference of nuance,
        which is why it&apos;s worth getting right.
      </p>
      <p>
        The price gap isn&apos;t in the design, it&apos;s in the number of decisions. A corporate
        site needs a navigation structure, a page per service, copy for each one, and a view on how
        it will grow. A landing page needs one thing, done very well.
      </p>
      <p>
        Market ranges, with what&apos;s almost never included, are in{" "}
        <Link href="/en/blog/how-much-does-a-website-cost-in-colombia">
          how much does a website cost in Colombia
        </Link>
        . And the timelines — a landing page ships in days, a site in weeks — in{" "}
        <Link href="/en/blog/how-long-does-it-take-to-build-a-website">
          how long does it take to build a website
        </Link>
        .
      </p>

      <h2>How to know if yours is working</h2>
      <p>
        A landing page has one advantage over a site: it can be measured with a single number. Of
        every hundred people who arrive, how many did the thing you wanted.
      </p>
      <p>
        That number varies enormously by sector and by traffic quality, so comparing yourself to an
        internet average is useless. Comparing yourself to yourself isn&apos;t: measure it this
        week, change one thing, measure it next week. Start with the headline, which moves the
        needle most, and don&apos;t change three things at once or you won&apos;t know which one
        worked.
      </p>

      <blockquote>
        If you&apos;re going to advertise, do the arithmetic first: what a click costs you, how many
        clicks you need for a customer, and what that customer is worth. If the number doesn&apos;t
        close, the problem isn&apos;t the landing page — it&apos;s the campaign, and no page fixes a
        campaign that doesn&apos;t close.
      </blockquote>

      <h2>A landing page doesn&apos;t replace your whole presence</h2>
      <p>
        I say this because it&apos;s an expensive and frequent mistake: someone builds a landing
        page, advertises it, it works, and decides nothing else is needed. Six months later they
        stop paying for ads and the phone goes quiet all at once, because there was nothing holding
        the visits up on its own.
      </p>
      <p>
        The healthy view is to see it as what it is: a campaign tool, excellent at its job, that
        lives alongside everything else. If your customer finds you by proximity, you also need{" "}
        <Link href="/en/blog/how-to-show-up-on-google-maps">the Google listing set up properly</Link>
        . If you&apos;re not sure a site of your own is right yet, start with{" "}
        <Link href="/en/blog/does-my-business-need-a-website">does my business need a website?</Link>{" "}
        and <Link href="/en/blog/website-or-just-instagram">website or just Instagram</Link>.
      </p>
      <p>
        And if you already know you want the page — landing or site — what I do, with what&apos;s in
        and what&apos;s out, is in <Link href="/en/services/web-design">web design</Link>.
      </p>
    </>
  );
}
