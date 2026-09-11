import Link from "next/link";

import { PISOS, money } from "@/lib/quote";

// Post: How much do a domain and hosting cost in Colombia?
// Twin of `dominio-y-hosting.tsx`.
//
// PRICES IN ENGLISH go through `money(n, "en")`, never the Spanish formatter:
// `$290.000` reads as two hundred and ninety dollars to an English reader, and
// the figure is pesos. That bug already shipped once on this site.
const en = (n: number) => money(n, "en");

export function DomainAndHostingCostPost() {
  return (
    <>
      <p>
        <strong>
          A <code>.com</code> domain costs between $45,000 and $90,000 COP a year. Decent hosting
          for a business site, between $120,000 and $500,000 COP a year.
        </strong>{" "}
        Anything much beyond that without a clear reason deserves a question.
      </p>
      <p>
        But the price is the easy part. What really decides whether this ends up cheap or expensive
        is whose name it&apos;s in, and that appears on no price list.
      </p>

      <h2>They&apos;re not the same thing, and the difference matters</h2>
      <p>It&apos;s the most common confusion and it takes two sentences:</p>
      <ul>
        <li>
          <strong>The domain is the address.</strong> <code>yourbusiness.com</code>. You rent it by
          the year from a registrar. It&apos;s yours as long as you pay, and it&apos;s the only
          item here that can&apos;t be replaced: lose it and you lose the address your customers
          know and the years of ranking attached to it.
        </li>
        <li>
          <strong>Hosting is the land.</strong> The computer where your site&apos;s files live.
          Change provider tomorrow, move the files, nobody notices.
        </li>
      </ul>
      <p>
        Put another way: hosting gets changed on an ordinary Tuesday; a domain gets lost forever.
        Rank your worries accordingly.
      </p>

      <h2>The prices, in pesos, this year</h2>
      <table>
        <thead>
          <tr>
            <th>What</th>
            <th>Per year (COP)</th>
            <th>What you&apos;re paying for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>.com</code> domain
            </td>
            <td>$45,000 – $90,000</td>
            <td>The address. The same at any serious registrar.</td>
          </tr>
          <tr>
            <td>
              <code>.com.co</code> domain
            </td>
            <td>$60,000 – $130,000</td>
            <td>Same, but it signals you&apos;re Colombian. Useful if you only sell here.</td>
          </tr>
          <tr>
            <td>Shared hosting</td>
            <td>$120,000 – $350,000</td>
            <td>Fine for most business sites.</td>
          </tr>
          <tr>
            <td>Hosting for an online store</td>
            <td>$350,000 – $1,200,000</td>
            <td>More resources, because there&apos;s a catalogue, a cart and payments.</td>
          </tr>
          <tr>
            <td>SSL certificate (the padlock)</td>
            <td>$0</td>
            <td>
              Free these days with Let&apos;s Encrypt. If it&apos;s billed separately, ask why.
            </td>
          </tr>
          <tr>
            <td>Email on your domain</td>
            <td>$25,000 – $130,000 per mailbox</td>
            <td>
              <code>hello@yourbusiness.com</code>. Almost always a separate service.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        The ranges are wide on purpose. Hosting at $120,000 and hosting at $350,000 do the same
        thing 90% of the time; the difference shows up the day something breaks and you need
        someone to answer.
      </p>

      <h2>The question that decides everything: whose name is it in?</h2>
      <p>
        This is the part of the article that matters, which is why it gets a heading of its own.
        When someone builds your site, there are two ways to set this up:
      </p>
      <ul>
        <li>
          <strong>Domain and hosting in your name, with your credentials.</strong> You&apos;re the
          registrant, you hold the password. Your provider works there as a guest.
        </li>
        <li>
          <strong>Everything in the provider&apos;s name.</strong> They&apos;re the registrant. You
          pay a &quot;maintenance fee&quot; and have never seen a control panel.
        </li>
      </ul>
      <p>
        The second is comfortable right up until the day you want to leave. That&apos;s when you
        find out your business&apos;s address on the internet isn&apos;t yours, that the transfer
        depends on the goodwill of somebody you&apos;ve just fallen out with, and that starting over
        on a new domain means losing every bit of ranking you built.
      </p>
      <p>
        <strong>This isn&apos;t a technicality: it&apos;s who holds the key to your shop.</strong>{" "}
        And you ask before signing, not after.
      </p>

      <h3>How to check today, in a minute</h3>
      <p>
        Search Google for <em>&quot;whois yourdomain.com&quot;</em> and open any of the lookups.
        Look at the registrant. Many domains have privacy enabled and you&apos;ll only see the
        registrar — in that case, log in to your registrar account. If you don&apos;t have an
        account, that&apos;s your answer.
      </p>

      <h2>&quot;But they gave me the first year free&quot;</h2>
      <p>
        Usually true and usually fine. Plenty of providers include the first year in the price of
        the site, and it&apos;s a legitimate courtesy.
      </p>
      <p>What to ask is what happens in year two. Three specific things:</p>
      <ol>
        <li>
          <strong>What the renewal costs</strong>, as a number, before you sign.
        </li>
        <li>
          <strong>Whose name the domain ended up in</strong>, per the section above.
        </li>
        <li>
          <strong>Who gets the expiry notice.</strong> If it goes to an inbox nobody checks any
          more, the domain lapses on its own. I&apos;ve seen sites lost that way, and not through
          anyone&apos;s bad faith.
        </li>
      </ol>

      <blockquote>
        An expired domain doesn&apos;t switch off overnight: it enters a grace period and then
        redemption, where getting it back costs considerably more than renewing would have. Set
        auto-renew and a calendar reminder. Both, not one.
      </blockquote>

      <h2>How I do it, so you have something to compare against</h2>
      <p>
        <strong>The domain and the hosting go in your name</strong>, with your credentials, from day
        one. That&apos;s not generosity: it&apos;s that if we stop working together tomorrow, I want
        you to be able to take the site without asking my permission. A provider who holds the key
        is competing on how hard it is to leave, not on their work.
      </p>
      <p>
        The annual renewal — domain, hosting, certificate and backups of the delivered site — costs{" "}
        <strong>{en(PISOS.renovacion)}</strong>. It&apos;s a fixed price, not a &quot;from&quot;,
        and it&apos;s on <Link href="/en/pricing">the pricing page</Link> like everything else.
      </p>
      <p>
        What isn&apos;t included there, and I say so to avoid the surprise, is next year&apos;s
        content changes: those get quoted when they come up, or they don&apos;t arise at all because
        the site was built for you to edit — which is how I build them.
      </p>

      <h2>Where this fits in the total cost</h2>
      <p>
        Domain and hosting are the small line in a website budget, but they&apos;re the only one
        that repeats every year. Adding it in from the start avoids the awkward conversation in
        month thirteen.
      </p>
      <p>
        The full breakdown — what the site costs, what&apos;s almost never included and what drives
        the price up — is in{" "}
        <Link href="/en/blog/how-much-does-a-website-cost-in-colombia">
          how much does a website cost in Colombia
        </Link>
        . How long it takes, in{" "}
        <Link href="/en/blog/how-long-does-it-take-to-build-a-website">
          how long does it take to build a website
        </Link>
        . And what I do for that price, with what&apos;s in and what&apos;s out, in{" "}
        <Link href="/en/services/web-design">web design</Link>.
      </p>
      <p>
        If you&apos;re still before that decision — whether you want a site at all or the Google
        listing and social will do — start with{" "}
        <Link href="/en/blog/does-my-business-need-a-website">does my business need a website?</Link>
      </p>
    </>
  );
}
