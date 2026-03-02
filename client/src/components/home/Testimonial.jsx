import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Gourav Suman",
    title: "Frontend Developer",
    message:
      "Integrating this component into our project was seamless and saved us countless hours of development and testing. Highly recommended!",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
  {
    id: 2,
    name: "Gourav Suman",
    title: "Full Stack Engineer",
    message:
      "This solution not only simplified our workflow but also improved our UI consistency across the board. Excellent tool for modern teams.",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
  },
  {
    id: 3,
    name: "Gourav Suman",
    title: "UX Designer",
    message:
      "I was impressed with how intuitive and flexible the design was. It allowed us to rapidly prototype and launch features with confidence.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
  },
];

const Testimonial = () => {
  const [tooltip, setTooltip] = React.useState({
    visible: false,
    x: 0,
    y: 0,
    activeId: null,
  });

  const cardRefs = React.useRef([]);

  const handleMouseMove = (e, index, id) => {
    const bounds = cardRefs.current[index].getBoundingClientRect();

    setTooltip({
      visible: true,
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
      activeId: id,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({
      ...prev,
      visible: false,
      activeId: null,
    }));
  };

  return (
    <div id="testimonials" className=" mt-[150px]">
      <h1 className="m-4 text-center text-4xl font-bold text-gray-900">
        Testimonials
      </h1>
      <p className="text-center text-gray-500 mt-1">
        We have collected some testimonials from our users.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6 py-16">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseMove={(e) =>
              handleMouseMove(e, index, testimonial.id)
            }
            onMouseLeave={handleMouseLeave}
            className="relative border border-gray-200 rounded-lg overflow-hidden max-w-sm hover:shadow-lg transition-shadow duration-300"
          >
            {tooltip.visible && tooltip.activeId === testimonial.id && (
              <span
                className="absolute px-2.5 py-1 text-sm rounded bg-green-500 text-white pointer-events-none"
                style={{
                  top: tooltip.y + 8,
                  left: tooltip.x + 8,
                }}
              >
                {testimonial.name}
              </span>
            )}

            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 text-gray-500">
                <h3 className="text-lg font-semibold text-gray-900">
                  Very easy to integrate
                </h3>
                <p className="my-4 text-sm line-clamp-3">
                  {testimonial.message}
                </p>
              </div>

              <div className="flex items-center justify-center">
                <img
                  className="rounded-full w-9 h-9"
                  src={testimonial.image}
                  alt={`${testimonial.name} profile`}
                />
                <div className="space-y-0.5 font-medium text-left ml-3">
                  <p>{testimonial.name}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;