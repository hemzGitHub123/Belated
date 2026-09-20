
import { useEffect, useState } from "react";
import "./Memory.css";



const memories = [
  {
    image: "/memories/Hackathon_!.jpeg",
    title: "The First Stepping Stone",
    text: "This was the First Hackathon. Looking at this picture now, I realize this was one of the first stepping stones in your journey. You travelled so far, attended your first conference, met new people, made new friends, and started creating beautiful memories in the technical world.",
  },

  {
    image: "/memories/5_person.jpeg",
    title: "Look How Far You've Come",
    text: "This is picture of us, I think, from our first year. Times change, right? Just look at yourself now. Look at how much you've changed and grown for the better. You've been through so many bittersweet moments, but you passed through all of them and now you stand here so gracefully.",
  },

  {
    image: "/memories/saras_RAji.jpeg",
    title: "The Four of You",
    text: "This picture is of the four friends in the hostel. You guys have so many memories together, from travelling and sleeping together to endless chats and countless little moments. College gave you all so many beautiful memories, and yes, probably a lot of fights too. But even after everything, you've grown, changed, and moved past those moments together.",
  },

  {
    image: "/memories/Banglore _4.jpeg",
    title: "Our Bangalore Trip",
    text: "This was our Bangalore trip. One of the best memories, right? For me, it was the first time I stayed away from home and got to make so many new memories with you all. We ate, fought, cried, laughed, and were happy together. And we even went to a theme park for the first time ever. Honestly, this is one of the best memories I have ever had.",
  },

  {
    image: "/memories/Hema_raji.jpeg",
    title: "One of the Best Nights",
    text: "This one is also from Bangalore. We travelled, ate, explored HAL, saw so many people, and even saw an aeroplane, which made us super happy. Also, remember how we sang the song “Kanimae Nee...” from *Manjummel Boys*? 😂 It was such a simple night, but somehow it became one of the best nights we’ve ever had. These are the kind of moments I know I’ll always remember.",
  },

  {
    image: "/memories/Group_college.jpeg",
    title: "Where Everything Started",
    text: "This is the group photo we took in college. Everything started in this place, right? So many things happened here. We laughed, fought, learned, changed, and created so many memories together. And somehow, this is also the place where so many chapters of our college life came to an end.",
  },

  {
    image: "/memories/Pooja_Hema_Raji.jpeg",
    title: "After the Bath",
    text: "After bathing, we somehow ended up taking this picture. 😂 It's such a random little moment, but that's exactly what makes it special. We didn't need a plan or a special occasion. We were just together, being ourselves, and somehow that became another memory worth keeping.",
  },

  {
    image: "/memories/Raji Home.jpeg",
    title: "Sun-Kissed Seven",
    text: "All seven of us together with the sunlight hitting just right. ❤️ There is something so special about seeing all of us in one picture. We may all go in different directions someday, but this little moment will always remind me of the six of us together.",
  },

  {
    image: "/memories/My Home.jpeg",
    title: "You Came Home",
    text: "Haaa, you actually came home with your brother! 😂 Even though you stayed only for a few minutes, it still became one of those unforgettable little memories. Sometimes, the shortest visits somehow leave the biggest smiles.",
  },

  {
    image: "/memories/HemaRaji.jpeg",
    title: "Before Dubai",
    text: "Before you went to Dubai, this was our last official meetup, right? We didn't know at that moment how much this little meeting would mean later. It was just another day together, but now, looking back, it feels like a special memory that I want to keep forever.",
  },

  {
    image: "/memories/Ghibli.jpeg",
    title: "The Best Picture Ever ❤️",
    text: "This is the best picture ever. ❤️ You know I don't even know how to pose properly for pictures. 😭 But somehow, this one turned out so special. Maybe it's not about posing perfectly. Maybe it's just about the people and the moment behind the picture.",
  },
];


export default function Memory() {
  const [current, setCurrent] = useState(0);
  const [showEnding, setShowEnding] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const memory = memories[current];

  const nextMemory = () => {
    if (current < memories.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      setShowEnding(true);
    }
  };

  const previousMemory = () => {
    if (showEnding) {
      setShowEnding(false);
      return;
    }

    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  const goToMemory = (index) => {
    setCurrent(index);
    setShowEnding(false);
    setShowLetter(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (showLetter) return;

      if (event.key === "ArrowRight") {
        nextMemory();
      }

      if (event.key === "ArrowLeft") {
        previousMemory();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [current, showEnding, showLetter]);

  if (showLetter) {
    return (
      <section className="letter-page">
        <div className="letter-glow letter-glow-one"></div>
        <div className="letter-glow letter-glow-two"></div>

        <div className="letter-wrapper">
          <p className="letter-eyebrow">ONE LAST THING</p>

          <h1 className="letter-title">
            A Letter For You <span>❤️</span>
          </h1>

          <div className="letter-paper">
            <div className="letter-decoration letter-decoration-one">
              ✦
            </div>

            <div className="letter-decoration letter-decoration-two">
              ♡
            </div>

            <div className="letter-paper-top">
              <span>For Raji</span>
              <span>♡</span>
            </div>
            <p className="letter-greeting">Dear Raji,</p>

            <p>
              I honestly don't know what to say first. First of all, belated Happy
              Birthday! ❤️ I know your birthday was yesterday, and I know I'm a little
              late. But I still wanted to say these few words to you.
            </p>

            <p>
              First, I'm sorry. I know that sometimes I have disappointed you, hurt you,
              or even ignored you. I'm truly sorry for that. But even then, you always
              pulled me through the abyss. You always reminded me that I deserved better
              and helped me get through those moments. Thank you so much for that. ❤️
            </p>

<p>
  When I think about our friendship, I honestly don't even know how it began.
  I don't know exactly when our friendship started to grow. Maybe it was in
  our first year, when you used to sit across the room all by yourself.
  Somehow, from those little moments, we came all the way here.
</p>

<p>
  And I am truly thankful for this friendship. When I look at you now, I can
  see how much you've changed from that first-year Raji to the Raji you are
  today. You've grown so much, experienced so many things, and come such a
  long way.
</p>

<p>
  But you know what hasn't changed? It's you. ❤️ Your genuine heart, your
  kindness, your passion, and the love and friendship you give to the people
  around you. Those things are still the same, and I hope they always remain
  that way.
</p>

            <p>
              I pray to God that you achieve every happiness and every dream you wish for.
              I hope you get everything you work hard for and that life gives you so many
              beautiful reasons to smile.
            </p>

            <p>
              And now comes the fun part. 😂 You know I love annoying you so much.
              Honestly, I think annoying you has become one of my favourite hobbies.
            </p>

            <p>
              After you travelled to Dubai, I didn't miss you that much at first because
              we still talked on the phone almost every day. But somehow, every Saturday
              and Sunday, I would still think, "She'll be free today, right?" 😭
            </p>

            <p>
              So don't ever think that I didn't miss you or that I didn't love you.
              I definitely missed you. Maybe I just didn't realise how much until this
              past one month.
            </p>

            <p>
              This one month made me truly realise that you are now in a place where we
              can't just travel through the air and meet each other whenever we want.
              And honestly, that's when I started missing you a little more.
            </p>

            <p>
              Anyway, no matter how far we travel, how many mountains come in between us,
              or how many troubles we have to cross, I pray that our friendship keeps
              going through all of them and stands strong until the very end of the world.
              ❤️
            </p>

      <p>
        Love you lots, Rajiii... ❤️
      </p> 

      <p className="letter-birthday">Belated Happy Birthday once again! 🎂❤️</p>

            <p className="letter-signature">
              With lots of love,<br />
              Hemzzzz🫂💕
            </p>
            <div className="letter-paper-bottom">
              <span>Made with memories</span>
              <span>♡</span>
            </div>
          </div>

          <div className="final-ending">
            <div className="final-heart">♥</div>

            <p className="final-line">
              This is where the little surprise ends.
            </p>

            <p className="final-line">
              But our memories don't.
            </p>

            <div className="the-end">THE END</div>
          </div>
        </div>
      </section>
    );
  }

  if (showEnding) {
    return (
      <section className="memory-ending-page">
        <div className="ending-glow ending-glow-one"></div>
        <div className="ending-glow ending-glow-two"></div>

        <div className="ending-content">
          <p className="ending-eyebrow">
            AFTER ALL THESE MEMORIES...
          </p>

          <h1>
            This is only
            <br />
            the beginning.
          </h1>

          <p className="ending-main">
            Eleven memories could never tell the whole story.
          </p>

          <p className="ending-subtext">
            They are just little pieces of all the laughter, madness,
            conversations and moments we've shared.
          </p>

          <p className="ending-before">
            But before we make more memories...
          </p>

          <button
            className="ending-button"
            onClick={() => setShowLetter(true)}
          >
            One more thing for you <span>→</span>
          </button>

          <button
            className="ending-back"
            onClick={() => setShowEnding(false)}
          >
            ← Go back
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="memory-page">
      <div className="memory-background-glow memory-glow-one"></div>
      <div className="memory-background-glow memory-glow-two"></div>

      <div className="memory-content">
        <header className="memory-header">
          <p className="memory-eyebrow">A FEW MOMENTS WE KEEP</p>

          <h1>Our Memories</h1>

          <p className="memory-intro">
            Some moments are worth keeping a little longer.
          </p>
        </header>

        <main className="memory-main">
          <div className="memory-counter">
            {String(current + 1).padStart(2, "0")}
            <span>/</span>
            {String(memories.length).padStart(2, "0")}
          </div>

          <div className="memory-photo-frame">
            <div className="tape tape-left"></div>
            <div className="tape tape-right"></div>

            <div className="memory-photo-container">
              <img
                key={memory.image}
                src={memory.image}
                alt={memory.title}
                className="memory-image"
              />
            </div>
          </div>

          <div className="memory-info">
            <h2>{memory.title}</h2>

            <p>{memory.text}</p>
          </div>

          <div className="memory-navigation">
            <button
              className="memory-nav-button"
              onClick={previousMemory}
              disabled={current === 0}
            >
              ←
            </button>

            <button
              className="memory-next-button"
              onClick={nextMemory}
            >
              {current === memories.length - 1
                ? "Finish memories"
                : "Next memory"}
              <span>→</span>
            </button>

            <button
              className="memory-nav-button"
              onClick={nextMemory}
            >
              →
            </button>
          </div>

          <div className="memory-dots">
            {memories.map((item, index) => (
              <button
                key={item.image}
                className={`memory-dot ${
                  current === index ? "active" : ""
                }`}
                onClick={() => goToMemory(index)}
                aria-label={`Go to memory ${index + 1}`}
              />
            ))}
          </div>

          <div className="memory-thumbnails">
            {memories.map((item, index) => (
              <button
                key={item.image}
                className={`memory-thumbnail ${
                  current === index ? "active" : ""
                }`}
                onClick={() => goToMemory(index)}
              >
                <img src={item.image} alt="" />
              </button>
            ))}
          </div>

          <p className="memory-keyboard-hint">
            Use ← → or choose a memory
          </p>
        </main>
      </div>
    </section>
  );
}