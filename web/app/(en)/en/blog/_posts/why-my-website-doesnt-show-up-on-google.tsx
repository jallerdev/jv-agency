import Link from "next/link";

// Post: Why doesn't my website show up on Google?
// Twin of `no-aparece-en-google.tsx`. Same structure and same restraint: three
// of the five causes are things the reader can check and fix without hiring
// anyone, and the article says so before it offers anything.
export function WhyMyWebsiteDoesntShowUpPost() {
  return (
    <>
      <p>
        <strong>
          Before you argue with anyone: search Google for <code>site:yourdomain.com</code>
        </strong>{" "}
        — like that, no space, with your domain — and see how many results come back. That one
        search splits the two possible worlds, and you can run it right now.
      </p>
      <ul>
        <li>
          <strong>Your pages come back.</strong> Then Google does have you. Your problem isn&apos;t
          that you don&apos;t appear: it&apos;s that you don&apos;t appear <em>high</em>, which is
          a different thing with a different fix. Skip to cause 4.
        </li>
        <li>
          <strong>Nothing comes back, or far less than you have.</strong> Google hasn&apos;t
          indexed you. Causes 1, 2 and 3 are the candidates, and two of them take fifteen minutes
          to fix.
        </li>
      </ul>

      <h2>Cause 1 · Your site is new and hasn&apos;t had time</h2>
      <p>
        The most common one, and the least welcome. A freshly published site takes{" "}
        <strong>days to a few weeks</strong> to appear at all, and months to sit well for
        competitive searches. No trick buys that time.
      </p>
      <p>
        What you can do is stop waiting to be found: register the site in{" "}
        <a href="https://search.google.com/search-console" rel="noopener">
          Google Search Console
        </a>
        , which is free, and submit the sitemap. You&apos;ll also see, with data rather than
        guesswork, which pages Google has and which it doesn&apos;t. If someone built your site and
        you don&apos;t have access to that tool, ask for it: it&apos;s yours.
      </p>

      <h2>Cause 2 · The site is telling Google to stay out</h2>
      <p>
        This happens more than it should, and almost always the same way: the site was built in a
        staging environment with indexing deliberately blocked, and nobody removed the block when
        it went live.
      </p>
      <p>Two things to check, both of which you can look at yourself:</p>
      <ol>
        <li>
          <strong>
            Open <code>yourdomain.com/robots.txt</code>
          </strong>
          . If you see <code>Disallow: /</code>, there it is: you&apos;re telling search engines
          not to crawl anything.
        </li>
        <li>
          <strong>Look at a page&apos;s source.</strong> Right-click, &quot;view page source&quot;,
          and search for <code>noindex</code>. If it turns up in a <code>robots</code> tag, that
          page is explicitly asking not to be listed.
        </li>
      </ol>
      <p>
        Either one is a one-minute fix for whoever has access. It&apos;s also the cause that stings
        most to find late, because it&apos;s months of not existing over one line that shouldn&apos;t
        have shipped.
      </p>

      <h2>Cause 3 · Google can&apos;t read what you&apos;re showing</h2>
      <p>
        If your site paints all its content with JavaScript, or if your main content is images —
        the restaurant menu as a photo, the services as a PDF — Google may be seeing an empty page
        where you see a full one.
      </p>
      <p>
        The kitchen-table test: open your page, select the text with the mouse and try to copy it.
        If you can&apos;t select it, it isn&apos;t text. And what isn&apos;t text doesn&apos;t
        rank. It&apos;s exactly the{" "}
        <Link href="/en/blog/what-a-restaurant-website-needs">PDF menu problem</Link>, and it
        applies to any catalogue.
      </p>

      <h2>Cause 4 · You do appear, behind everyone else</h2>
      <p>
        This is the most frequent case of all, and the most misread. You&apos;re on Google, at
        position 40. Nobody reaches position 40, so in practice you don&apos;t exist — but the
        problem isn&apos;t technical, it&apos;s competitive.
      </p>
      <p>Three reasons, in order of weight:</p>
      <ul>
        <li>
          <strong>Your page doesn&apos;t talk about what people search for.</strong> Your home page
          says &quot;Welcome to our company, leaders in integrated solutions&quot; and people type
          &quot;24 hour locksmith Bucaramanga&quot;. There&apos;s no way for Google to match those
          two phrases, because they don&apos;t share a single useful word.
        </li>
        <li>
          <strong>You don&apos;t have a page per thing you sell.</strong> One page trying to rank
          for five services loses to five dedicated pages. It&apos;s the difference between a
          brochure and a site.
        </li>
        <li>
          <strong>Nobody links to you.</strong> Google uses links from other sites as a signal that
          you&apos;re real. A site nobody points at competes at a disadvantage, and writing more
          doesn&apos;t fix that.
        </li>
      </ul>

      <h2>Cause 5 · You&apos;re being penalised for something done on your behalf</h2>
      <p>
        The least common and the most expensive. If at some point somebody &quot;ranked&quot; you by
        buying hundreds of links, stuffing pages with repeated keywords or copying text from
        another site, you may be penalised.
      </p>
      <p>
        Search Console tells you plainly, under manual actions. If there&apos;s nothing there,
        you&apos;re not penalised and you can rule this out — plenty of people assume otherwise and
        spend months chasing a ghost.
      </p>

      <h2>The order I&apos;d check it in</h2>
      <ol>
        <li>
          <code>site:yourdomain.com</code>, to find out which of the two worlds you&apos;re in.
        </li>
        <li>
          <code>robots.txt</code> and <code>noindex</code>. Fifteen minutes, free, rules out the
          worst.
        </li>
        <li>Search Console: coverage, manual actions, and which queries already bring you people.</li>
        <li>
          Read your own home page out loud and ask yourself whether anyone would type that into
          Google.
        </li>
      </ol>
      <p>
        The first three cost nothing and resolve most cases. If you got to the fourth and that&apos;s
        where the problem is, then it is work: rewriting for what people search, and giving each
        service its own page.
      </p>

      <blockquote>
        Be wary of anyone who diagnoses this without opening your Search Console. Without that data,
        any explanation of why you don&apos;t appear is a well-dressed guess.
      </blockquote>

      <h2>If you want me to look at it</h2>
      <p>
        That&apos;s an <Link href="/en/services/seo">SEO audit</Link>: what&apos;s holding you back
        today and the list of fixes in order of impact, for anyone to carry out — me or your current
        provider. What that work costs in the Colombian market, with ranges and what it should
        include, is in{" "}
        <Link href="/en/blog/how-much-does-seo-cost-in-colombia">
          how much does SEO cost in Colombia
        </Link>
        .
      </p>
      <p>
        And if it turns out the problem isn&apos;t the ranking but the site — slow, uneditable,
        broken on a phone — that&apos;s a different conversation:{" "}
        <Link href="/en/blog/how-much-does-a-website-cost-in-colombia">
          how much does a website cost in Colombia
        </Link>{" "}
        has the ranges, and <Link href="/en/services/web-design">web design</Link> has what I do for
        that price.
      </p>
      <p>
        One last case, and I include it because I run into it often: sometimes the right answer
        isn&apos;t touching the site but fixing the business listing. If your customer finds you by
        proximity, that&apos;s played on the map and not on your website —{" "}
        <Link href="/en/blog/how-to-show-up-on-google-maps">
          how to show up on Google Maps
        </Link>{" "}
        walks through it.
      </p>
    </>
  );
}
