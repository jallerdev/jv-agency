import Link from "next/link";

import { A_PRICES, A_TYPE_LABEL_EN, META_BILLING_NOTE_EN, money } from "@/lib/quote";
import type { AutomationType } from "@/lib/quote";

// Post: How much does a WhatsApp chatbot cost in Colombia?
// Target query: "how much does a WhatsApp chatbot cost"
//
// WHY MY OWN PRICES ARE IMPORTED AND NOT HAND-WRITTEN:
// if `A_PRICES` changes in lib/quote.ts tomorrow, the quoting tool and this
// article have to say the same thing. Hardcoding them here guarantees that in
// six months the blog is quoting something other than the proposal.
//
// ⚠️ EXPIRY — this is the most perishable post on the blog, and its Spanish
// twin carries the same warning. On 1/10/2026 Meta starts charging for
// service messages and a new rate list takes effect (updated every quarter:
// 1/1, 1/4, 1/7 and 1/10). Checked on 10/9/2026 against Meta's own docs: the
// thousand free service messages, the charging of utility templates inside
// the window and the absence of volume tiers for service are all confirmed.
// What HAS to be redone that day is Colombia's per-message figure, and
// "what changes" becomes "what changed" — in BOTH languages, or one of the
// two will be quoting last quarter's rules.
// The official-account checkmark is BLUE, not green, and the wait to reapply
// after a rejection is 30 days — Meta's wording, not the guides', which keep
// repeating three months.

const TIPOS: AutomationType[] = ["faq", "avisos", "leads", "citas", "pedidos"];

const en = (n: number) => money(n, "en");

export function WhatsAppChatbotCostPost() {
  return (
    <>
      <p>
        <strong>Short answer:</strong> between $600,000 and $2,500,000 COP to set up, plus a monthly
        fee running from $150,000 to $1,600,000 depending on who builds it. But the number that
        really decides whether it&apos;s worth it is neither of those two. It&apos;s the one that
        almost never appears in the quote: what Meta is going to charge <em>you</em>, straight to
        your payment method, for every message that leaves your number. And that changes on 1
        October 2026.
      </p>

      <h2>What&apos;s charged in Colombia today</h2>
      <p>Prices published by Colombian suppliers, checked in September 2026:</p>
      <table>
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Setup (one-off)</th>
            <th>Monthly</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="https://botiffy.com/blog-costo-chatbot-whatsapp-colombia.html" rel="noopener">
                Botiffy
              </a>{" "}
              (4 plans)
            </td>
            <td>$599,000 – from $2,500,000</td>
            <td>$399,000 – $1,590,000</td>
          </tr>
          <tr>
            <td>
              <a href="https://codedrop.cloud/en/blog/chatbot-whatsapp-colombia-negocios" rel="noopener">
                CodeDrop
              </a>
            </td>
            <td>from $600,000 · from $1,500,000 with AI and booking</td>
            <td>from $150,000</td>
          </tr>
          <tr>
            <td>
              <a href="https://softhian.com/servicios/chatbots-y-automatizacion" rel="noopener">
                Softhian
              </a>{" "}
              (Bogotá)
            </td>
            <td>from $1,000,000</td>
            <td>not published</td>
          </tr>
          <tr>
            <td>
              <a href="https://panabot.co/" rel="noopener">
                PanaBot
              </a>
            </td>
            <td>not published</td>
            <td>$49,000 / $149,000 / $299,000</td>
          </tr>
          <tr>
            <td>
              <a href="https://projectia.com.co/blog/chatbot-ia-whatsapp-business-colombia.html" rel="noopener">
                Projectia
              </a>
            </td>
            <td>not published</td>
            <td>$500,000 – $2,500,000</td>
          </tr>
        </tbody>
      </table>
      <p>
        Botiffy&apos;s monthly fee isn&apos;t open-ended: each plan comes with a cap — 200, 500, 900
        and 1,500 conversations — and anything over that is billed separately, between $800 and
        $1,200 depending on the plan. Hold on to that figure: it comes back below.
      </p>
      <p>
        I looked at eight Colombian suppliers. Five publish some price and only one publishes the
        full list — setup, monthly and the cost of an extra conversation. The other three (Chatbot
        Colombia, Bots Colombia and CRMwHATA) ask you to fill in a form. It isn&apos;t bad faith:
        the price genuinely depends on scope. But if you&apos;re trying to compare, now you know why
        it&apos;s so hard.
      </p>

      <h2>What I charge</h2>
      <p>Setup, one off. These come from the same quoting tool I use to build your proposal:</p>
      <table>
        <thead>
          <tr>
            <th>What the bot does</th>
            <th>Setup</th>
            <th>Delivery</th>
          </tr>
        </thead>
        <tbody>
          {TIPOS.map((t) => (
            <tr key={t}>
              <td>{A_TYPE_LABEL_EN[t]}</td>
              <td>{en(A_PRICES.base[t])}</td>
              <td>
                {A_PRICES.deliveryWeeks[t].urgent} to {A_PRICES.deliveryWeeks[t].extended} weeks
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        {A_PRICES.plantillasIncluidas} Meta-approved templates are included; each additional
        template, {en(A_PRICES.plantillaExtra)}. Quoted separately: connecting and verifying
        WhatsApp Business ({en(A_PRICES.extras.onboarding)}), AI answers over your own content (
        {en(A_PRICES.extras.ia)}), integration with your CRM ({en(A_PRICES.extras.crm)}) or with
        Google Calendar ({en(A_PRICES.extras.agenda)}), taking payment inside the chat (
        {en(A_PRICES.extras.pagos)}), handover to a human agent ({en(A_PRICES.extras.handoff)}) and
        each additional language ({en(A_PRICES.extras.idioma)}).
      </p>
      <p>
        Monthly maintenance: {en(A_PRICES.mantenimiento.basico)} basic,{" "}
        {en(A_PRICES.mantenimiento.estandar)} standard and {en(A_PRICES.mantenimiento.avanzado)}{" "}
        advanced. What each type of bot does is on{" "}
        <Link href="/en/services/whatsapp-chatbot">the service page</Link>.
      </p>
      <p>
        <strong>What I don&apos;t charge for is the conversations.</strong> And that&apos;s the part
        of the business almost nobody explains properly.
      </p>

      <h2>The surprise: Meta bills you separately, directly</h2>
      <blockquote>{META_BILLING_NOTE_EN}</blockquote>
      <p>
        That isn&apos;t small print of mine: it&apos;s how the platform works for everyone. What
        changes from one supplier to another is who passes you the bill.
      </p>

      <h3>It&apos;s no longer charged per conversation. It&apos;s per message.</h3>
      <p>
        Since <strong>1 July 2025</strong>, Meta charges per message rather than per conversation —
        <em>&quot;Effective July 1, 2025, Meta charges on a per-message basis&quot;</em> — and only
        when the template message is delivered:{" "}
        <a
          href="https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing/"
          rel="noopener"
        >
          <em>&quot;You are only charged when a template message is delivered&quot;</em>
        </a>
        .
      </p>
      <p>
        If a supplier still quotes you &quot;per conversation&quot;, they&apos;re using a model Meta
        changed over a year ago. It isn&apos;t necessarily deception — plenty of platforms still
        package their service that way — but it does tell you that what they&apos;re selling is
        their bundle and not Meta&apos;s rate.
      </p>

      <h3>What&apos;s charged and what isn&apos;t</h3>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>What it&apos;s for</th>
            <th>Charged?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Marketing</td>
            <td>Promotions, news, abandoned cart</td>
            <td>Always</td>
          </tr>
          <tr>
            <td>Utility</td>
            <td>Order confirmation, shipping tracking, appointment reminder</td>
            <td>Not today, if it&apos;s inside the service window</td>
          </tr>
          <tr>
            <td>Authentication</td>
            <td>One-time codes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Service</td>
            <td>Your free-form replies inside the window</td>
            <td>Not today — changes on 1 October 2026</td>
          </tr>
        </tbody>
      </table>
      <p>Four rules worth saying out loud, because almost nobody explains them:</p>
      <ul>
        <li>
          <strong>Messages your customers send you are free. Always.</strong> You&apos;re charged for
          what goes out, not for what comes in.
        </li>
        <li>
          <strong>The 24-hour service window</strong> opens on its own when a customer writes to you.
          Today, inside it, anything that isn&apos;t a template isn&apos;t charged.
        </li>
        <li>
          <strong>Free entry point: 72 hours.</strong> If the customer arrives from a
          click-to-WhatsApp ad and you reply within the first 24 hours, a 72-hour window opens where
          every message is free. Straight money for anyone running ads who doesn&apos;t know.
        </li>
        <li>
          <strong>Volume discounts only exist on utility and authentication.</strong> Marketing
          doesn&apos;t come down however much you send. And Meta updates the rates every quarter: 1
          January, 1 April, 1 July and 1 October.
        </li>
      </ul>

      <h3>What that comes to in Colombia</h3>
      <p>
        You&apos;re talking about <strong>cents of a dollar per message</strong>, not dollars. The
        sources that say they&apos;ve checked Meta&apos;s official list put the marketing message for
        Colombia at{" "}
        <a href="https://leadsales.io/blog/whatsapp-business-api-cuanto-cuesta/" rel="noopener">
          USD 0.0125
        </a>{" "}
        and the utility one at{" "}
        <a href="https://www.simla.com/blog/precios-whatsapp-business-api" rel="noopener">
          USD 0.0008
        </a>
        . A thousand marketing messages therefore comes to around USD 12.50. Other 2026 publications
        give different figures for the same country, so keep the order of magnitude rather than the
        exact cent: the only list that counts is Meta&apos;s, and it changes every three months.
      </p>
      <p>
        A note on where those two numbers come from, because they don&apos;t carry the same weight.
        The <strong>utility and authentication one — USD 0.0008 — matches across every source</strong>{" "}
        that publishes the per-country list: Colombia is one of the cheapest markets in the world in
        that category. The marketing one doesn&apos;t: depending on who publishes it, it ranges from
        USD 0.0125 to USD 0.014. That&apos;s why the figure above is given as an order of magnitude.
        The list that counts is Meta&apos;s, it lives in the CSVs on its{" "}
        <a
          href="https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing"
          rel="noopener"
        >
          official pricing page
        </a>{" "}
        and it&apos;s updated every quarter.
      </p>

      <h3>What changes on 1 October 2026</h3>
      <p>
        This happens in three weeks and it&apos;s where half the market is going to get a surprise.
        From that date Meta starts charging for <strong>service messages</strong>: the free-form
        replies someone on your team — or a bot — writes inside the 24-hour window. They&apos;ve been
        free since November 2024. Each business number gets{" "}
        <strong>1,000 free service messages a month</strong>, which don&apos;t roll over, and beyond
        that they&apos;re charged at the same utility/authentication rate for the recipient&apos;s
        country and <strong>with no volume discount</strong> — volume tiers exist for utility and
        authentication, but not for service. On top of that, utility templates sent inside the
        window start being charged: they had been free since 1 July 2025. Meta has already
        published the October list, within the deadline it set itself (
        <a
          href="https://support.zendesk.com/hc/en-us/articles/11113277351322-Announcing-upcoming-changes-to-WhatsApp-Business-messaging-pricing"
          rel="noopener"
        >
          Zendesk
        </a>
        ,{" "}
        <a
          href="https://www.ycloud.com/blog/whatsapp-api-message-pricing-update-effective-october-1-2026"
          rel="noopener"
        >
          YCloud
        </a>
        ).
      </p>
      <p>
        Now, without overstating it: for a small business in Colombia this weighs little. A thousand
        free messages a month is plenty for anyone handling twenty or thirty chats a day, and
        anything beyond that goes at the utility rate, the cheapest of all. For a contact centre with
        three agents typing all day it is a new line in the budget. What matters isn&apos;t the
        amount: it&apos;s that <strong>your quote today doesn&apos;t have it in there</strong>, and
        whoever told you &quot;conversations are included&quot; is going to have to talk to you again.
      </p>
      <p>
        A clarification that always gets lost: all of this is about the API. If you answer from the
        free WhatsApp Business app on your phone, nothing is charged and this change doesn&apos;t
        touch you.
      </p>

      <h2>Who invoices you for that usage</h2>
      <p>
        Meta defines two roles and the difference is exactly this. A <strong>Solution Partner</strong>{" "}
        has a credit line with Meta and can extend it to its clients: the client doesn&apos;t put up
        a payment method and the partner invoices them for the usage. A <strong>Tech Provider</strong>{" "}
        has no credit line, so the client puts up their own payment method,{" "}
        <a
          href="https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/overview"
          rel="noopener"
        >
          Meta invoices the usage directly to the client
        </a>{" "}
        and the provider invoices the other services.
      </p>
      <p>
        I&apos;m a <strong>Meta-verified tech provider</strong>: I connect your number myself,
        directly with Meta, with no platform in between. What that actually means:
      </p>
      <ul>
        <li>The WhatsApp Business account is in <strong>your name</strong>, not mine.</li>
        <li>
          Meta bills you for API usage, with your payment method, at its list rate. I don&apos;t
          invoice it and therefore don&apos;t put a margin on it.
        </li>
        <li>
          If you don&apos;t want to work with me tomorrow, you take the number, the account and the
          templates with you.
        </li>
      </ul>
      <p>And what it doesn&apos;t mean, to be clear:</p>
      <ul>
        <li>
          It doesn&apos;t make your messages cheaper for being mine. Meta&apos;s list is the same for
          everyone; what changes is whether someone puts a margin on top.
        </li>
        <li>It isn&apos;t the green tick. That&apos;s a different thing and is applied for separately.</li>
        <li>It gives neither me nor you any kind of priority with Meta.</li>
      </ul>
      <p>
        The two numbers above can be put side by side: a platform that resells charges $800 to $1,200
        for an extra conversation, and Meta charges the marketing message in Colombia in the order of
        USD 0.0125. They measure different things — the first includes the platform&apos;s service,
        the second is the list rate — and neither is wrong. What you should know is which of the two
        you&apos;re paying.
      </p>

      <h2>What&apos;s almost never included</h2>
      <ul>
        <li>
          <strong>Meta&apos;s API usage.</strong> It&apos;s the big one and it goes on your account.
          CodeDrop estimates it for a small business in Colombia at{" "}
          <a href="https://codedrop.cloud/en/blog/chatbot-whatsapp-colombia-negocios" rel="noopener">
            between $60,000 and $120,000 a month
          </a>{" "}
          depending on volume.
        </li>
        <li>
          <strong>Verifying your company in Meta Business Manager.</strong> Documents, and the
          registered name matching the legal one. Without that there&apos;s no API.
        </li>
        <li>
          <strong>The checkmark — which is blue now, not green.</strong> It isn&apos;t bought:
          it&apos;s the official business account, you apply and Meta decides.{" "}
          <a
            href="https://developers.facebook.com/documentation/business-messaging/whatsapp/official-business-accounts/"
            rel="noopener"
          >
            Meta&apos;s documentation
          </a>{" "}
          asks for five things: complying with the messaging policy, being registered on the
          platform for <strong>30 days or more</strong>, having the business portfolio verified,
          two-step verification enabled on the number, and an approved display name. That last one
          is the most common reason for rejection: the name doesn&apos;t match the legal one. If
          you&apos;re turned down, <strong>you have to wait 30 days</strong> to apply again — not
          three months, as many guides repeat.
        </li>
        <li>
          <strong>Templates beyond the included ones</strong> and fixing any Meta rejects over
          wording. Ask how many the quote includes and who fixes a rejection.
        </li>
        <li>
          <strong>The integrations.</strong> CRM, calendar, payment gateway. Sometimes they&apos;re
          solved with a middleman like n8n or Make, which has{" "}
          <a href="https://auto-latam.com/blog/chatbot-whatsapp-precio-empresas-latam-2026" rel="noopener">
            its own subscription
          </a>
          .
        </li>
        <li>
          <strong>Writing the flow.</strong> The bot&apos;s words are content: if you don&apos;t write
          them, someone does and that gets charged. Same point as in{" "}
          <Link href="/en/blog/how-much-does-a-website-cost-in-colombia">
            the budget for a website
          </Link>
          .
        </li>
        <li>
          <strong>Monthly maintenance.</strong> Not really optional: Meta&apos;s token expires and
          templates get rejected. With no monitoring the bot stops answering and you find out when a
          customer complains.
        </li>
        <li>
          <strong>Your chat history doesn&apos;t move.</strong> When the number goes onto the API your
          history doesn&apos;t travel with you, although your customers do still see their old
          messages on their phones. There&apos;s <em>Coexistence</em>, which lets you keep answering
          from the phone app on the same number. Ask about it before signing.
        </li>
      </ul>

      <h2>The five things that push the price up</h2>
      <ol>
        <li>
          <strong>What the bot has to do.</strong> Answering opening hours isn&apos;t the same as
          taking an order. On my own list that&apos;s the difference between {en(A_PRICES.base.faq)}{" "}
          and {en(A_PRICES.base.pedidos)}.
        </li>
        <li>
          <strong>AI.</strong> A menu of options is cheap and predictable. A bot that understands what
          people write to it costs more to build and to maintain, because what it answers has to be
          reviewed.
        </li>
        <li>
          <strong>The integrations.</strong> Connecting it to your CRM, your calendar or your
          inventory is what adds most.
        </li>
        <li>
          <strong>The number of templates.</strong> Each one is approved separately by Meta. It&apos;s
          work per unit.
        </li>
        <li>
          <strong>Urgency.</strong> Compressing a five-week project into two costs more, always.
        </li>
      </ol>

      <h2>Five questions before signing</h2>
      <ul>
        <li>
          <strong>Is the WhatsApp Business account in my company&apos;s name or the supplier&apos;s?</strong>{" "}
          If it&apos;s in theirs, the number and the templates are held hostage.
        </li>
        <li>
          <strong>Who pays Meta for the usage: me directly, or the supplier who then resells it to me?</strong>{" "}
          Both answers are legitimate. The one that isn&apos;t is &quot;I don&apos;t know&quot;.
        </li>
        <li>
          <strong>What happens on 1 October to my service messages?</strong> If they look at you
          blankly, they didn&apos;t read Meta&apos;s announcement.
        </li>
        <li>
          <strong>How many templates are included and who fixes a rejection?</strong>
        </li>
        <li>
          <strong>If I leave, do I take the number and the flow with me?</strong>
        </li>
      </ul>
      <blockquote>
        A cheap chatbot you can&apos;t move to another supplier ends up costing more than a
        well-built one: you pay for it twice, the second time to get it out of where it was tied
        down.
      </blockquote>

      <h2>And how do I know it&apos;ll be worth it?</h2>
      <p>
        Do the sum backwards. If the setup costs you {en(A_PRICES.base.leads)} and maintenance{" "}
        {en(A_PRICES.mantenimiento.basico)} a month, the first year is $3,360,000 COP. If your
        average customer leaves you $200,000, you need 17 customers in the year that you&apos;re
        currently losing. If you drop more than one every three weeks out of the messages that arrive
        at night and on Sundays, the sum already adds up.
      </p>
      <p>
        If the number doesn&apos;t add up, the conversation isn&apos;t about the price of the chatbot:
        it&apos;s about whether your problem is one of responsiveness or something else. I work that
        criterion through in{" "}
        <Link href="/en/blog/does-my-business-need-a-website">does my business need a website?</Link>{" "}
        and it applies just the same here.
      </p>
      <p>
        If you want to see what each type of bot does, it&apos;s all on{" "}
        <Link href="/en/services/whatsapp-chatbot">the WhatsApp chatbot page</Link>. And if you
        already know what you need, <Link href="/en/book-a-call">write to me</Link>: I&apos;ll tell you
        which range you fall into and what Meta will charge you separately.
      </p>
      <p>
        Where this pays for itself fastest is in businesses that live off a calendar, because every
        unanswered message is a slot gone: I break it down case by case in{" "}
        <Link href="/en/industries/salons-and-spas">websites for salons and spas</Link> and in{" "}
        <Link href="/en/industries/clinics">websites for clinics and practices</Link>.
      </p>
    </>
  );
}
