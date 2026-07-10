import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { BeforeAfter } from '@/components/before-after'
import { Gallery } from '@/components/gallery'
import { Manifesto } from '@/components/manifesto'
import { CtaBanner } from '@/components/cta-banner'
import { Location } from '@/components/location'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <BeforeAfter />
        <Gallery />
        <Manifesto />
        <CtaBanner />
        <Location />
      </main>
      <SiteFooter />
    </>
  )
}
