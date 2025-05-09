import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const testimonials = [
  {
    quote: "CodersNexus transformed our business with a custom platform that streamlined operations and delighted our customers. Their team's expertise and commitment to quality exceeded our expectations.",
    author: "Jane Cooper",
    role: "CEO, TechLink",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
    rating: 5
  },
  {
    quote: "Working with CodersNexus was a game-changer for our startup. Their mobile app development expertise helped us launch a product that immediately resonated with our target audience.",
    author: "Michael Foster",
    role: "Founder, InnovatePay",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
    rating: 5
  },
  {
    quote: "The team at CodersNexus not only delivered a stunning website but also provided strategic insights that helped us better understand our digital presence. True professionals!",
    author: "Alicia Garcia",
    role: "Marketing Director, GreenLeaf",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
    rating: 4.5
  }
];

const TestimonialCard = ({ testimonial, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" />);
    }

    return stars;
  };

  return (
    <motion.div
      className="p-8 rounded-2xl glass hover:shadow-xl transition-all duration-300"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-6">
          <div className="text-[hsl(var(--primary))] flex">
            {renderStars(testimonial.rating)}
          </div>
        </div>

        <blockquote className="text-lg italic mb-6 flex-grow">
          "{testimonial.quote}"
        </blockquote>

        <div className="flex items-center">
          <img
            src={testimonial.image}
            alt={testimonial.author}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="font-bold font-inter">{testimonial.author}</h4>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section className="py-20 md:py-32 bg-[hsl(var(--muted))] relative" ref={sectionRef}>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[hsl(var(--primary)_/_0.1)] rounded-full filter blur-3xl opacity-50"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[hsl(var(--secondary)_/_0.1)] text-[hsl(var(--secondary))] font-medium text-sm mb-4">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold font-inter mb-6">What our clients say</h2>
          <p className="text-[hsl(var(--muted-foreground))]">
            Don't just take our word for it. Hear from some of our satisfied clients about their experience working with CodersNexus.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
