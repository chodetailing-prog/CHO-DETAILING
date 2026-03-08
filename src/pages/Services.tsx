import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { subscribeServices, Service } from "@/lib/store";

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const { hash } = useLocation();

  useEffect(() => {
    return subscribeServices((items) => {
      setServices(items);
    });
  }, []);

  useEffect(() => {
    if (hash && services.length > 0) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash, services]);

  if (services.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-black/30 tracking-widest uppercase">Loading Services...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6">
          Services
        </h1>
        <p className="text-xl text-black/50 font-light max-w-2xl mx-auto">
          차량의 상태와 고객의 니즈에 맞춘 세분화된 프리미엄 케어 솔루션.
          최고의 결과물을 위해 타협하지 않는 공정을 거칩니다.
        </p>
      </motion.div>

      <div className="space-y-24">
        {services.map((service, idx) => (
          <motion.div
            key={service.id}
            id={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center scroll-mt-32"
          >
            <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
              <motion.div 
                initial={{ scale: 1.05, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="aspect-[4/3] bg-black/5 overflow-hidden rounded-sm shadow-2xl"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
            
            <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
              <motion.div
                initial={{ x: idx % 2 === 1 ? 20 : -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6 leading-none">
                  {service.title}
                </h2>
                <div className="w-20 h-1 bg-black mb-8" />
                <p className="text-xl font-light tracking-[0.2em] text-black/40 mb-8 uppercase italic">
                  {service.price}
                </p>
                <p className="text-lg text-black/70 leading-relaxed mb-10 max-w-xl font-light">
                  {service.description}
                </p>
                
                <ul className="space-y-5">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-4 text-black/80 group">
                      <CheckCircle2 size={20} className="text-black shrink-0 mt-1 opacity-40 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                      <span className="text-lg font-light tracking-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
