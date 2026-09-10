import Link from "next/link";

// Post: How long does it take to build a website?
// Target query: "how long does it take to build a website"
export function HowLongPost() {
  return (
    <>
      <p>
        <strong>Between 2 and 12 weeks</strong> depending on the type of site. But that isn&apos;t
        the useful number: what stretches projects is almost never the development. It&apos;s the
        content, the approvals and the decisions nobody makes.
      </p>

      <h2>Real timelines by project type</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Typical timeline</th>
            <th>With everything ready on your side</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>One-page landing</td>
            <td>2 – 3 weeks</td>
            <td>1 week</td>
          </tr>
          <tr>
            <td>Corporate site (4–6 pages)</td>
            <td>4 – 6 weeks</td>
            <td>2 – 3 weeks</td>
          </tr>
          <tr>
            <td>Online store</td>
            <td>8 – 12 weeks</td>
            <td>5 – 6 weeks</td>
          </tr>
          <tr>
            <td>Redesign</td>
            <td>3 – 5 weeks</td>
            <td>2 weeks</td>
          </tr>
        </tbody>
      </table>
      <p>
        Look at that last column. The difference between the two isn&apos;t how fast the team
        works: it&apos;s how much of the project is spent waiting on you.
      </p>

      <h2>Where the time actually goes</h2>
      <p>A typical five-week corporate site breaks down roughly like this:</p>
      <ul>
        <li>
          <strong>Discovery and structure</strong> — 3 to 5 days. Which pages, what each one says,
          what it has to achieve.
        </li>
        <li>
          <strong>Design</strong> — 1 to 2 weeks, rounds of changes included.
        </li>
        <li>
          <strong>Development</strong> — 1 to 2 weeks.
        </li>
        <li>
          <strong>Content</strong> — <em>variable, and it&apos;s the one in charge.</em> If the copy
          and the photos are ready it adds nothing. If they aren&apos;t, it can add a month.
        </li>
        <li>
          <strong>Review and launch</strong> — 3 to 5 days.
        </li>
      </ul>

      <blockquote>
        The number one cause of delay in web projects isn&apos;t technical: it&apos;s waiting for
        the client&apos;s copy and photos.
      </blockquote>

      <h2>The four things that depend on you</h2>
      <ol>
        <li>
          <strong>Having the content before starting.</strong> Copy for each section, photos, a
          high-resolution logo, contact details. If you don&apos;t have them, decide that at the
          start and commission the writing — don&apos;t leave it for &quot;when we get
          there&quot;.
        </li>
        <li>
          <strong>Naming who approves.</strong> One person. A project where three partners give
          separate, contradictory opinions can double the timeline.
        </li>
        <li>
          <strong>Replying quickly during the rounds.</strong> If each review takes a week to come
          back, a five-week project becomes a nine-week one without anyone having worked more.
        </li>
        <li>
          <strong>Handing over the access in time.</strong> Domain, hosting, social, analytics.
          Asking for them on the last day is a classic that costs days.
        </li>
      </ol>

      <h2>What stretches it with nobody at fault</h2>
      <ul>
        <li>
          <strong>Scope changes halfway through.</strong> &quot;While we&apos;re at it, let&apos;s
          add…&quot; Each one is legitimate, and each one moves the date.
        </li>
        <li>
          <strong>Third-party integrations.</strong> Depending on a payment gateway or an inventory
          system introduces timings nobody on the team controls.
        </li>
        <li>
          <strong>Approving the design and then wanting to change it.</strong> Redoing design once
          development has started costs double.
        </li>
        <li>
          <strong>Photography.</strong> If a shoot has to be produced, book it weeks ahead.
        </li>
      </ul>

      <h2>Can it be sped up?</h2>
      <p>Yes, on three honest conditions:</p>
      <ul>
        <li>
          <strong>By cutting scope,</strong> not by compressing the work. Launching with three
          pages and adding the rest later is the healthy way.
        </li>
        <li>
          <strong>With the content 100% ready</strong> on day one.
        </li>
        <li>
          <strong>By paying for the rush.</strong> Reshuffling a team&apos;s calendar has a cost.
        </li>
      </ul>
      <p>
        Be wary of anyone promising a complete online store in a week. Either they&apos;re using an
        unadapted template, or they&apos;re going to hand over something half-done that you&apos;ll
        end up rebuilding.
      </p>

      <h2>One recommendation that saves months</h2>
      <p>
        <strong>Launch sooner with less.</strong> A three-page site published in two weeks starts
        bringing you visits while you work on the rest. A twelve-page one that ships in three months
        brought you nothing for three months.
      </p>
      <p>
        And in SEO, time compounds: a page that&apos;s been live for six months ranks better than an
        identical one published yesterday. Launching sooner isn&apos;t only arriving sooner —
        it&apos;s starting the clock that actually matters sooner. That clock has its own budget,
        separate from the site&apos;s:{" "}
        <Link href="/en/blog/how-much-does-seo-cost-in-colombia">
          how much SEO costs in Colombia
        </Link>
        .
      </p>
      <p>
        If you&apos;re still deciding on scope, look at the ranges in{" "}
        <Link href="/en/blog/how-much-does-a-website-cost-in-colombia">
          how much a website costs in Colombia
        </Link>{" "}
        or tell me your case and I&apos;ll give you the schedule on the{" "}
        <Link href="/en/book-a-call">first call</Link>.
      </p>
      <p>
        The timelines above are the ones I work to, and they&apos;re the same ones you&apos;ll see
        in{" "}
        <Link href="/diseno-de-paginas-web-en-cartagena">web design in Cartagena</Link>,{" "}
        <Link href="/diseno-de-paginas-web-en-barranquilla">in Barranquilla</Link> and{" "}
        <Link href="/diseno-de-paginas-web-en-bogota">in Bogotá</Link>, with the price next to each
        delivery. The detail of what happens on each of those days is in{" "}
        <Link href="/en/services/web-design">web design</Link>.
      </p>
    </>
  );
}
