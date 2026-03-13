import {
  Kino,
  Scene,
  Reveal,
  Counter,
  Marquee,
  StickyHeader,
} from "react-kino";

export default function KinoApp() {
  return (
    <section className=" bg-[#080807] text-[#EDEDE8]">
      <Kino>
        <Scene duration="300vh">
          {() => (
            <div className="flex h-screen flex-col items-center justify-center gap-6 px-6 text-center">
              <Reveal animation="fade-up" at={0}>
                <h2 className="text-5xl md:text-7xl font-medium leading-none">
                  Welcome
                </h2>
              </Reveal>

              <Reveal animation="scale" at={0.3}>
                <p className="max-w-2xl text-lg text-[#B9B9B1] md:text-2xl">
                  Scroll-driven storytelling, made simple.
                </p>
              </Reveal>

              <Reveal animation="fade" at={0.6}>
                <div className="text-2xl font-semibold text-white md:text-4xl">
                  <Counter
                    from={0}
                    to={10000}
                    format={(n) => `${n.toLocaleString()}+ users`}
                  />
                </div>
              </Reveal>
              <Reveal animation="fade" at={0.9}></Reveal>
            </div>
          )}
        </Scene>
      </Kino>
    </section>
  );
}
