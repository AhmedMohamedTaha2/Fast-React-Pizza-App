import React from "react";

const FacebookIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const XIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default function Footer() {
  const socialLinks = [
    { name: "Facebook", icon: FacebookIcon, href: "#" },
    { name: "Instagram", icon: InstagramIcon, href: "#" },
    { name: "X (Twitter)", icon: XIcon, href: "#" },
  ];

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "Menu", href: "#" },
    { name: "Offers", href: "#" },
    { name: "Locations", href: "#" },
    { name: "About Us", href: "#" },
  ];

  const supportLinks = [
    { name: "Contact Us", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ];

  return (
    <footer
      className="bg-[#fff8f0] font-sans text-gray-800"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="h-1 bg-gradient-to-r from-[#f4a261] to-[#e63946]"></div>

      <div className="container mx-auto px-6 py-10 lg:px-24 lg:py-16">
        <div className="grid grid-cols-1 gap-12 text-center sm:text-left md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center sm:items-start">
            <a href="#" className="text-2xl font-bold text-[#e63946]">
              Fast React Pizza 🍕
            </a>
            <p className="mt-2 font-semibold text-gray-700">
              Fresh, Fast, and Full of Flavor.
            </p>
            <p className="mt-4 text-sm text-gray-600">
              We're passionate about crafting the most delicious pizzas with the
              freshest ingredients, delivered to your door in a flash.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-gray-800">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 transition-colors duration-300 hover:text-[#e63946] hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-gray-800">
              Support
            </h3>
            <ul className="mt-4 space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 transition-colors duration-300 hover:text-[#e63946] hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-gray-800">
              Follow Us
            </h3>
            <div className="mt-4 flex justify-center space-x-4 sm:justify-start">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  aria-label={`Follow us on ${link.name}`}
                  className="text-gray-500 transition-transform duration-300 hover:scale-110 hover:text-[#e63946]"
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <div className="mt-8">
              <h4 className="font-semibold text-gray-700">
                Join our pizza family!
              </h4>
              <form
                className="mt-2 flex w-full max-w-sm mx-auto sm:mx-0"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  aria-label="Email address"
                  placeholder="your.email@example.com"
                  className="w-full rounded-l-full border border-gray-300 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-[#e63946] focus:outline-none focus:ring-2 focus:ring-[#e63946] focus:ring-opacity-50"
                />
                <button
                  type="submit"
                  className="rounded-r-full bg-[#e63946] px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors duration-300 hover:bg-[#c12f3b]"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#fff8f0] py-4">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Fast React Pizza — Fresh & Fast 🍕
          </p>
        </div>
      </div>
    </footer>
  );
}
