import Link from "next/link";

// Post: How to get your business to show up on Google Maps
// Twin of `aparecer-en-google-maps.tsx`. The angle is the same and it has to
// stay the same: the listing is free, for "near me" it beats the website, and
// some businesses need nothing else. That admission is the whole article.
export function HowToShowUpOnGoogleMapsPost() {
  return (
    <>
      <p>
        <strong>
          The Google listing is free, it takes an afternoon, and for &quot;near me&quot; searches
          it beats your website.
        </strong>{" "}
        I&apos;m starting there because it&apos;s the thing that suits me least to say and the
        first thing you need to know.
      </p>

      <h2>What it is you actually want</h2>
      <p>
        It&apos;s called a <strong>Google Business Profile</strong>. It used to be Google My
        Business, and plenty of people still search for it under the old name — same thing,
        renamed, and not everybody got the memo. It&apos;s the panel that appears on the right
        when someone searches for your business by name, and it&apos;s what puts you on the map
        when someone searches for your trade with a city next to it.
      </p>
      <p>
        It is not your website and it does not replace it. They do different jobs, and confusing
        the two is one of the more expensive mistakes in this business:
      </p>
      <table>
        <thead>
          <tr>
            <th>The Google listing</th>
            <th>Your website</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wins &quot;restaurant near me&quot;</td>
            <td>Wins when they search your name</td>
          </tr>
          <tr>
            <td>Hours, phone, directions, reviews</td>
            <td>Everything else: catalogue, prices, who you are</td>
          </tr>
          <tr>
            <td>Google controls it</td>
            <td>You control it</td>
          </tr>
          <tr>
            <td>Free</td>
            <td>Costs money</td>
          </tr>
        </tbody>
      </table>
      <p>
        That last row is the important one, which is why it&apos;s last: if Google suspends your
        listing tomorrow, there is nobody to appeal to. Your site is still there. So the sane play
        is to have both and link them to each other — not to choose.
      </p>

      <h2>Before you start: do you qualify?</h2>
      <p>Google asks for two things, and only two:</p>
      <ul>
        <li>
          <strong>That you have direct contact with customers.</strong> In a premises, or by going
          to them.
        </li>
        <li>
          <strong>That you have a physical address or a service area.</strong> If you work from
          home and don&apos;t want to publish where you live, you set it up as a service area and
          the address stays hidden. Almost nobody knows this, and it&apos;s exactly what stops half
          the people who ought to have a listing.
        </li>
      </ul>

      <h2>The steps, without the padding</h2>
      <ol>
        <li>
          <strong>Search for your business on Google Maps before creating anything.</strong> It
          very often already exists: a customer created it, or Google generated it. If it&apos;s
          there, don&apos;t make a second one — claim it. Two listings at the same address is a
          classic cause of suspension.
        </li>
        <li>
          <strong>Go to business.google.com</strong> with whichever Google account you want in
          charge. Choose carefully: that account owns the listing, and recovering it later is a
          process.
        </li>
        <li>
          <strong>Enter the name. The name. Nothing else.</strong> This gets its own section
          below, because it&apos;s where most people get burned.
        </li>
        <li>
          <strong>Pick the primary category carefully.</strong> It&apos;s the single biggest factor
          in deciding which searches you appear in. &quot;Restaurant&quot; and &quot;Seafood
          restaurant&quot; don&apos;t bring the same people. Be specific, then add the secondary
          ones.
        </li>
        <li>
          <strong>Verify.</strong> Google offers postcard, phone, email or video depending on the
          case. These days it&apos;s usually <strong>video</strong>, and that&apos;s the one most
          people fail — it gets its own paragraph too.
        </li>
      </ol>

      <h2>The name: the mistake that takes listings down</h2>
      <p>
        The temptation is obvious. Your business is called Pepe Plumbing and you want to appear for
        &quot;plumber in Bogotá&quot;, so you enter{" "}
        <em>&quot;Pepe Plumbing — Best Plumbers in Bogotá&quot;</em>.
      </p>
      <p>
        <strong>Don&apos;t.</strong> Google&apos;s rule is that the listing name is the real name:
        the one on your sign, on your paperwork and on your website. No keywords, no city tacked on
        the end, no service descriptors. Google detects this automatically now, and what you earn
        isn&apos;t a better position — it&apos;s a suspension.
      </p>
      <p>
        And it hurts more than it sounds. While you&apos;re suspended you&apos;re off the map, your
        reviews disappear from view, and reinstatement takes days or weeks. All for a phrase that
        wasn&apos;t going to rank you anyway.
      </p>

      <h3>The other two causes of suspension</h3>
      <ul>
        <li>
          <strong>An address or category that doesn&apos;t match</strong> your other records. If
          your listing says one address and your website says another, Google reads that as a
          signal something isn&apos;t real.
        </li>
        <li>
          <strong>A burst of edits.</strong> Changing name, address, category and phone in one
          afternoon trips the automated review. If you have several things to fix, do them a few at
          a time with days in between.
        </li>
      </ul>

      <h2>Video verification, where people get stuck</h2>
      <p>
        Google wants one continuous, uncut video showing that the business exists and that you have
        access to it. What fails attempts is almost always the same:
      </p>
      <ul>
        <li>
          <strong>Filming only the inside.</strong> The context has to be visible: the street, the
          sign, the entrance, and then inside.
        </li>
        <li>
          <strong>Not showing proof that it&apos;s you.</strong> Keys opening up, the card reader,
          the till, equipment only the owner would have.
        </li>
        <li>
          <strong>Cutting between shots.</strong> It has to be a single take.
        </li>
      </ul>
      <p>
        If it gets rejected, don&apos;t resubmit the same thing: work out which of those was
        missing and film it again.
      </p>

      <h2>What actually moves the needle afterwards</h2>
      <p>
        Creating the listing is the easy part. Ranking on the map comes down to three things, and
        none of them is a trick:
      </p>
      <ol>
        <li>
          <strong>The primary category.</strong> Said it already, saying it again, because it
          carries the most weight and it&apos;s what most people pick carelessly.
        </li>
        <li>
          <strong>Real reviews, and answering them.</strong> All of them, the bad ones included —
          the bad ones especially. An owner who replies calmly to a three-star review sells more
          than one with five stars and silence. And don&apos;t buy reviews: they get detected, and
          that&apos;s another route to suspension.
        </li>
        <li>
          <strong>Your details saying the same thing everywhere.</strong> Name, address and phone
          identical on the listing, your site, your social profiles and the directories.
        </li>
      </ol>

      <h3>A Colombian trap with addresses</h3>
      <p>
        Addresses here get written six different ways: <code>Cra 43 # 12-34</code>,{" "}
        <code>Carrera 43 No. 12-34</code>, <code>Kra 43 #12 - 34</code>. To you they&apos;re the
        same; to an automated system comparing strings of text, not necessarily.
      </p>
      <p>
        <strong>Pick one format and copy it identically everywhere.</strong> It&apos;s the dullest
        item on this list and one of the few you can fix today, for free, in half an hour.
      </p>

      <blockquote>
        A test almost nobody runs on themselves: open Google on your phone, on mobile data rather
        than wi-fi, and search your trade plus your neighbourhood. If you&apos;re not in the top
        three on the map, there&apos;s the work — and it starts with the category, not the website.
      </blockquote>

      <h2>When the listing is enough and you need nothing else</h2>
      <p>
        There are businesses where a well-built listing solves the whole problem. If you live off
        passing trade, have no catalogue to show, don&apos;t sell online, and your customer only
        needs your hours and directions — <strong>the listing is your priority</strong>, and a
        website right now would be spending money in the wrong order.
      </p>
      <p>
        The full criteria are in{" "}
        <Link href="/en/blog/does-my-business-need-a-website">
          does my business need a website?
        </Link>{" "}
        and, if your question is site versus social, in{" "}
        <Link href="/en/blog/website-or-just-instagram">website or just Instagram</Link>.
      </p>

      <h2>And when the listing falls short</h2>
      <p>
        When someone searches for you by name because you were recommended and wants to confirm you
        exist; when you have prices, a catalogue or services to explain; when you compete in a city
        where the top of the map already has websites linked. A listing can&apos;t answer &quot;how
        much does it cost?&quot; or &quot;do you do this?&quot;.
      </p>
      <p>
        That work — listing, site and content pushing together, month after month — is{" "}
        <Link href="/en/services/seo">SEO</Link>, and what it costs in the Colombian market is in{" "}
        <Link href="/en/blog/how-much-does-seo-cost-in-colombia">
          how much does SEO cost in Colombia
        </Link>
        . How I work it city by city is in{" "}
        <Link href="/diseno-de-paginas-web-en-cartagena">Cartagena</Link>,{" "}
        <Link href="/diseno-de-paginas-web-en-barranquilla">Barranquilla</Link>,{" "}
        <Link href="/diseno-de-paginas-web-en-santa-marta">Santa Marta</Link>,{" "}
        <Link href="/diseno-de-paginas-web-en-bogota">Bogotá</Link>,{" "}
        <Link href="/diseno-de-paginas-web-en-medellin">Medellín</Link>,{" "}
        <Link href="/diseno-de-paginas-web-en-cali">Cali</Link> and{" "}
        <Link href="/diseno-de-paginas-web-en-bucaramanga">Bucaramanga</Link> — those pages are in
        Spanish, because that&apos;s the language the searches are in.
      </p>
      <p>
        One last thing, in case you got here looking for someone to hire: nobody can promise you
        the top of the map, and anyone who promises it is selling you something they don&apos;t
        control. What can be promised is the work and the report of what was done.
      </p>
    </>
  );
}
