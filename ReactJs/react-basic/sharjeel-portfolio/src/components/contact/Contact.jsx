import ContactCard from "./contactCard/ContactCard";
import ContactForm from "./contactForm/ContactForm";

function Contact() {
  return (
    <>
      <div id="contact" className="w-[80vw] mx-auto my-24 flex flex-col gap-10">
        <h2 className="text-2xl font-semibold">Contact Me</h2>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
          <div className="flex-1 w-full flex flex-col justify-center gap-6 text-sm md:p-10">
            <a href="mailto:sharjeelali262@gmail.com" target="_blank">
              <ContactCard
                iconUrl="ri-mail-line"
                text="sharjeelali262@gmail.com"
              />
            </a>

            <a href="https://github.com/sharjeel262" target="_blank">
              <ContactCard
                iconUrl="ri-github-fill"
                text="https://github.com/sharjeel262"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-sharjeel-08644b262/"
              target="_blank"
            >
              <ContactCard
                iconUrl="ri-linkedin-fill"
                text="https://www.linkedin.com/in/muhammad-sharjeel-08644b262/"
              />
            </a>
          </div>
          <div className="flex-1 w-full py-14 px-10 bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
