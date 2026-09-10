import Link from "next/link";

import { SEO_PRICES } from "@/lib/quote";

// Post: How much does SEO cost in Colombia?
// Target query: "how much does SEO cost in Colombia"
//
// My own prices are NOT hand-written: they come from SEO_PRICES in
// lib/quote.ts, the same source the quoting tool uses. If the Local plan goes
// up tomorrow, the article goes up with it instead of contradicting the
// proposal the client receives.
//
// The figures cited from third parties ARE literals and have to be: they are
// what each supplier publishes on their own page, and rewriting them from a
// constant would be putting words in someone else's mouth.
//
// In English the thousands separator is a comma and the currency is spelled
// out, so the peso figure can't be read as dollars.
const cop = (n: number) => `$${n.toLocaleString("en-US")} COP`;

// The table has no styles in .legal and overflows at 390 px. The container
// with its own scroll is what stops the whole page from overflowing.
function Tabla({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left align-top font-body text-sm [&_td]:border-t [&_td]:border-line [&_td]:py-3 [&_td]:pr-4 [&_td]:align-top [&_th]:pb-2 [&_th]:pr-4 [&_th]:font-semibold [&_th]:text-ink">
        {children}
      </table>
    </div>
  );
}

export function SeoCostPost() {
  return (
    <>
      <p>
        <strong>Short answer:</strong> monthly SEO work is quoted in Colombia between $650,000 and
        $12,000,000 COP a month, and most small businesses land between $1,000,000 and $4,500,000.
        An audit, paid once, runs from $500,000 to $5,000,000 depending on the size of the site.
      </p>
      <p>
        The useful answer is longer, because that range says nothing unless you know what
        you&apos;re buying. And in SEO, more than in any other service, what you buy below a
        certain price isn&apos;t a cheaper service: it&apos;s a different thing with the same name.
      </p>

      <h2>Before the price: two different things are sold under the same acronym</h2>
      <p>
        Almost every argument about the price of SEO is really a confusion about the product. Those
        three letters cover two jobs that look nothing alike.
      </p>

      <Tabla>
        <thead>
          <tr>
            <th />
            <th>Technical SEO</th>
            <th>Ranking work</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>When it happens</strong>
            </td>
            <td>Once, when the site is built or fixed</td>
            <td>Every month, for as long as it runs</td>
          </tr>
          <tr>
            <td>
              <strong>What it is</strong>
            </td>
            <td>
              Titles and descriptions, structured data, sitemap, canonicals, images, speed,
              registering in Search Console
            </td>
            <td>
              Search research, new content, the Google Business profile, optimising what already
              exists, measuring and correcting
            </td>
          </tr>
          <tr>
            <td>
              <strong>How it&apos;s billed</strong>
            </td>
            <td>A fixed amount, on delivery</td>
            <td>A monthly fee</td>
          </tr>
          <tr>
            <td>
              <strong>If you stop</strong>
            </td>
            <td>It stays done. It doesn&apos;t undo itself</td>
            <td>It stops, and whoever keeps going overtakes you</td>
          </tr>
        </tbody>
      </Tabla>

      <blockquote className="my-7 border-l-2 border-line pl-5 text-ink">
        Technical SEO is Google being <em>able</em> to understand your site. Ranking work is your
        site <em>deserving</em> to come up. The first is delivered; the second is earned, month by
        month.
      </blockquote>

      <p>
        That separation isn&apos;t something I made up: it&apos;s how the market bills.{" "}
        <a href="https://www.laboratorioweb.com.co/cuanto-cuesta-el-seo-en-colombia/" rel="noopener">
          Laboratorio Web
        </a>{" "}
        publishes &quot;technical audit: $1,000,000, one-off&quot; in the same table where it
        charges $2,000,000 a month for the service.{" "}
        <a href="https://togrowagencia.com/costo-seo-en-colombia-precios-planes/" rel="noopener">
          ToGrow
        </a>{" "}
        lists the audit as a one-off cost of $1,500,000 to $5,000,000, with the monthly fee
        separate.
      </p>
      <p>
        When someone charges you $250,000 &quot;for SEO&quot; and lets you believe that puts you
        first, they&apos;re selling you the first thing under the name of the second. Technical SEO
        comes with the site and is delivered with it — I cover that in{" "}
        <Link href="/en/blog/how-much-does-a-website-cost-in-colombia">
          how much a website costs in Colombia
        </Link>
        .
      </p>

      <h2>Real ranges for monthly SEO (Colombia, 2026)</h2>
      <p>
        Seven Colombian suppliers who publish their figures. This isn&apos;t a survey or an
        average: it&apos;s what each one says on their own page, with the link next to it so you
        can check.
      </p>

      <Tabla>
        <thead>
          <tr>
            <th>Who publishes it</th>
            <th>What they publish</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a
                href="https://togrowagencia.com/costo-seo-en-colombia-precios-planes/"
                rel="noopener"
              >
                ToGrow
              </a>
            </td>
            <td>
              Local SEO $650,000 – $1,500,000/month · small business or corporate $1,500,000 –
              $4,500,000 · online store $3,000,000 – $7,500,000
            </td>
          </tr>
          <tr>
            <td>
              <a href="https://gulupadigital.com/cuanto-cuesta-el-seo-en-colombia-en-2026/" rel="noopener">
                Gulupa Digital
              </a>
            </td>
            <td>
              General $1,000,000 – $5,000,000/month · highly competitive sectors $6,000,000 –
              $12,000,000+ · freelancer $800,000 – $3,000,000
            </td>
          </tr>
          <tr>
            <td>
              <a href="https://stivenramirez.com/blog/cuanto-cuesta-el-seo-colombia/" rel="noopener">
                Stiven Ramírez
              </a>
            </td>
            <td>
              Junior freelance $900,000 – $2,000,000 · senior consultant $3,500,000 – $7,500,000 ·
              mid-sized agency $8,000,000 – $20,000,000+
            </td>
          </tr>
          <tr>
            <td>
              <a
                href="https://seoenmedellin.com/blog/cuanto-cuesta-una-auditoria-seo-en-colombia/"
                rel="noopener"
              >
                SEO en Medellín
              </a>
            </td>
            <td>
              Risk zone $300,000 – $800,000/month · professional for small business $1,500,000 –
              $4,500,000 · premium $5,000,000 – $12,000,000+
            </td>
          </tr>
          <tr>
            <td>
              <a href="https://www.laboratorioweb.com.co/cuanto-cuesta-el-seo-en-colombia/" rel="noopener">
                Laboratorio Web
              </a>
            </td>
            <td>
              Their own list: $2,000,000/month · technical audit $1,000,000 one-off · articles
              $300,000 – $500,000 each
            </td>
          </tr>
          <tr>
            <td>
              <a
                href="https://marketingcpe.com.co/blog/seo/cuanto-cuesta-el-posicionamiento-seo-en-colombia/"
                rel="noopener"
              >
                Marketing CPE
              </a>
            </td>
            <td>
              Basic $650,000 – $4,500,000/month · advanced $1,800,000 – $12,000,000. Their summary:
              &quot;from $650,000 to $12,000,000 a month&quot;
            </td>
          </tr>
          <tr>
            <td>
              <a href="https://blog.drunel.com/cuanto-cuesta-el-seo-en-colombia/" rel="noopener">
                Drunel
              </a>
            </td>
            <td>
              30 USD an hour, with &quot;a minimum dedication of 20 hours a month per client&quot;:
              around 600 USD a month to start
            </td>
          </tr>
        </tbody>
      </Tabla>

      <p>Three things you can read between the lines of that table:</p>
      <ul>
        <li>
          <strong>The real starting point for local SEO is $650,000 a month.</strong> ToGrow and
          Marketing CPE put the floor exactly there, independently of each other.
        </li>
        <li>
          <strong>Nobody who publishes figures defends anything below that.</strong> SEO en Medellín
          calls the $300,000-to-$800,000 band &quot;risky&quot;, and Gulupa flags quotes &quot;from
          $300,000 with no explanation of what you&apos;re buying&quot; as a warning sign.
        </li>
        <li>
          <strong>The spread is enormous because it isn&apos;t the same service.</strong> A business
          with one location and one city isn&apos;t buying what an online store with four thousand
          product pages is buying.
        </li>
      </ul>

      <h2>What an audit costs</h2>
      <Tabla>
        <thead>
          <tr>
            <th>Who publishes it</th>
            <th>Audit price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Stiven Ramírez</td>
            <td>
              Basic review $500,000 – $900,000 · standard $1,200,000 – $2,000,000 · complete
              $2,000,000 – $3,500,000
            </td>
          </tr>
          <tr>
            <td>Laboratorio Web</td>
            <td>$1,000,000, one-off</td>
          </tr>
          <tr>
            <td>ToGrow</td>
            <td>$1,500,000 – $5,000,000, one-off cost</td>
          </tr>
          <tr>
            <td>Marketing CPE</td>
            <td>$1,000,000 – $5,000,000</td>
          </tr>
          <tr>
            <td>SEO en Medellín</td>
            <td>$1,000,000 – $10,000,000 · sites under 50 URLs: $1,000,000 – $2,500,000</td>
          </tr>
        </tbody>
      </Tabla>
      <p>
        Notice what all five say: <strong>one-off</strong>. The audit is the levelling-up at the
        start, not the monthly fee. If it&apos;s sold to you as a subscription, ask what is being
        audited every single month.
      </p>

      <h2>Why a price floor exists</h2>
      <p>Three sums, all checkable. None of them needs adjectives.</p>

      <h3>1. The tooling alone costs more than a cheap plan</h3>
      <p>
        List prices, checked on 9 September 2026:{" "}
        <a href="https://ahrefs.com/pricing" rel="noopener">
          Ahrefs
        </a>{" "}
        Lite, 129 USD a month; Ahrefs Standard, 249 USD.{" "}
        <a href="https://www.semrush.com/pricing/" rel="noopener">
          Semrush
        </a>{" "}
        SEO plan, 139 USD; Starter, 199 USD. At that day&apos;s rate — $3,116.47 per dollar — the
        cheapest Ahrefs licence comes to around $402,000 a month.
      </p>
      <p>
        A $300,000-a-month SEO plan doesn&apos;t even cover the tool they&apos;re supposedly going
        to do it with. And that&apos;s before anyone opens a laptop.
      </p>

      <h3>2. The hours behind a month of work</h3>
      <p>
        SEO en Medellín puts it in writing: &quot;a healthy monthly budget should cover between 30
        and 80 hours of real human work&quot;. Drunel states a 20-hour minimum per client at 30 USD
        an hour, which at the rate above is around $93,500 an hour. Thirty hours at that price is
        over $2,800,000.
      </p>
      <p>
        That&apos;s the full sum: a $650,000-a-month plan only adds up when the person doing the
        work is the person who answers — no salesperson, no project manager, no agency layer — and
        over a genuinely small scope: one city, one service.
      </p>

      <h3>3. The sum that admits no argument: payroll</h3>
      <p>
        The{" "}
        <a href="https://www.buk.co/blog/salario-minimo-colombia" rel="noopener">
          2026 minimum wage
        </a>{" "}
        is $1,750,905 plus $249,095 of transport allowance. With benefits and social security, that
        person costs the employer $2,715,573 a month. The standard week dropped to 42 hours, i.e.
        210 hours a month: <strong>$12,931 per loaded hour</strong> — and that&apos;s someone on the
        minimum wage, not a specialist.
      </p>
      <p>
        On that basis, a $300,000-a-month plan buys 23 hours of the lowest-paid person legally
        possible in Colombia, with no tools and nobody reviewing. Nobody ranks anything with that.
        Which is why a low price doesn&apos;t buy less SEO: it buys something else. Almost always
        bought links, unreviewed machine-written articles, or a PDF exported from a tool with a logo
        laid over it.
      </p>

      <h2>How long before anything shows</h2>
      <p>
        Never a promised position. What can be said, with a source. Google publishes it in its{" "}
        <a
          href="https://developers.google.com/search/docs/fundamentals/do-i-need-seo"
          rel="noopener"
        >
          guide to hiring an SEO
        </a>
        : &quot;in most cases, SEO will take four months to a year&quot; to implement the
        improvements and then see the benefit.
      </p>
      <p>
        The{" "}
        <a
          href="https://ahrefs.com/blog/how-long-does-it-take-to-rank-in-google-and-how-old-are-top-ranking-pages/"
          rel="noopener"
        >
          Ahrefs study
        </a>{" "}
        over close to a million URLs gives the uncomfortable figure: only 1.74% of new pages reach
        the top 10 in their first year, 72.9% of the pages sitting in the top 10 are more than three
        years old, and the one in first place has been there five years on average.
      </p>
      <p>
        The Colombian agencies agree with each other: ToGrow talks about 4 to 6 months for the first
        visible results, Drunel 3 to 6 months for the first signals, and{" "}
        <a href="https://cangrejodigital.com/seo/cuanto-cuesta-seo-colombia/" rel="noopener">
          Cangrejo Digital
        </a>{" "}
        initial improvements between month 1 and month 3. I say the same:{" "}
        <strong>the first movement shows between month 3 and month 6.</strong> Before that,
        measuring is for correcting, not for judging.
      </p>

      <h2>Five signs you&apos;re being sold hot air</h2>
      <ol className="mb-5 list-decimal space-y-1 pl-6 marker:text-ink/50">
        <li>
          <strong>They guarantee you first place.</strong> Google says it in plain words:
          &quot;no one can guarantee a #1 ranking on Google&quot;, and it also warns about anyone
          claiming a &quot;special relationship&quot; with Google or &quot;priority
          submission&quot;. The Colombian variant is &quot;top 3 in 60 days&quot;.
        </li>
        <li>
          <strong>They sell you a thousand links.</strong> Buying and selling links to rank is named
          as spam in{" "}
          <a
            href="https://developers.google.com/search/docs/essentials/spam-policies"
            rel="noopener"
          >
            Google&apos;s policies
          </a>
          . Laboratorio Web publishes the local example: &quot;500 links for $200,000&quot;.
          That&apos;s $400 a link. Nobody gets a link a real publication decided to give for $400.
        </li>
        <li>
          <strong>They send you positions and no traffic data.</strong> The{" "}
          <a href="https://support.google.com/webmasters/answer/7042828" rel="noopener">
            Search Console
          </a>{" "}
          help explains that position is an average and shifts with the searcher&apos;s history and
          location. The clicks and impressions on your own property, on the other hand, nobody can
          dress up. A one-line question settles it: <em>will you give me read access to my Search
          Console?</em> If the answer gets tangled, you know.
        </li>
        <li>
          <strong>The audit is a PDF with a logo on it.</strong> SEO en Medellín describes it: &quot;a
          PDF exported straight from an automated tool with their logo laid over it&quot;. A real
          audit starts from <em>your</em> data: your Search Console, your analytics, your site
          crawled.
        </li>
        <li>
          <strong>They quote without having looked at your site.</strong> Drunel has it on their
          warning list, and Google adds two from the same family: be wary of anyone who won&apos;t
          clearly explain what they&apos;re going to do, and of anyone who cold-contacts you.
        </li>
      </ol>
      <p>
        And one for 2026: Google added the use of AI to &quot;generate many pages without adding
        value&quot; to its spam policies. Plans offering &quot;20 articles a month&quot; for less
        than one well-written article costs land squarely there.
      </p>

      <h2>What I charge</h2>
      <p>
        My Local plan starts at <strong>{cop(SEO_PRICES.plan.local)} a month</strong>: one city, one
        main service, the Google Business profile managed, two pieces of content a month and a
        report showing what was done and what moved. That&apos;s exactly the floor ToGrow and
        Marketing CPE publish for local SEO in Colombia. I&apos;m not below the market: I&apos;m at
        the start of the market, and I can be because there&apos;s no agency in between. Whoever
        researches, whoever writes and whoever answers your WhatsApp are the same person. That&apos;s
        the whole discount, and it&apos;s honest.
      </p>
      <p>
        Reviewing and fixing the site is <strong>{cop(SEO_PRICES.extras.puestaApunto)}</strong>, paid
        once, and <strong>isn&apos;t charged if I built the site</strong> with technical SEO
        included. The Google Business profile, if you don&apos;t have one, {cop(SEO_PRICES.extras.ficha)}{" "}
        once. When the business has several services or several cities, the plan goes up to{" "}
        {cop(SEO_PRICES.plan.crecimiento)} a month.
      </p>
      <p>
        What you won&apos;t find in any proposal of mine is a guarantee of first place. Nobody can
        give you one, and anyone who puts it in writing is lying to you: Google decides positions.
        What I do guarantee is the work done, measured and visible in a report.
      </p>
      <p>
        I work from Turbaco, with businesses on the coast and across the rest of the country:{" "}
        <Link href="/diseno-de-paginas-web-en-cartagena">Cartagena</Link>,{" "}
        <Link href="/diseno-de-paginas-web-en-barranquilla">Barranquilla</Link> and{" "}
        <Link href="/diseno-de-paginas-web-en-bogota">Bogotá</Link>. If you&apos;re still deciding
        whether this is worth investing in, start with{" "}
        <Link href="/en/blog/does-my-business-need-a-website">
          does my business need a website?
        </Link>{" "}
        — and if your business is{" "}
        <Link href="/en/industries/salons-and-spas">a salon or a spa</Link> or{" "}
        <Link href="/en/industries/clinics">a clinic or a practice</Link>, what changes in each case
        is there — and then come back. And if you&apos;re already clear,{" "}
        <Link href="/en/book-a-call">tell me what you sell and in which city</Link>: with that I&apos;ll
        tell you which plan you fall into before charging you anything.
      </p>
      <p>
        This article explains the market. What I do, with what it includes and what it doesn&apos;t,
        is in <Link href="/en/services/seo">SEO</Link>.
      </p>
    </>
  );
}
