import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { getServiceById, Service } from "@/lib/store";

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadService = async () => {
      if (id) {
        setIsLoading(true);
        const data = await getServiceById(id);
        setService(data);
        setIsLoading(false);
      }
    };
    loadService();
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-black/30 tracking-widest uppercase">Loading Service...</div>
      </div>
    );
  }

  if (!service && !isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <p className="text-xl text-black/50 tracking-widest uppercase">Service not found</p>
        <Link to="/" className="px-8 py-3 bg-black text-white text-sm font-medium tracking-widest uppercase hover:bg-black/80 transition-colors rounded-md">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-black/40 hover:text-black transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium tracking-widest uppercase">Back</span>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <motion.div 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="aspect-[4/3] bg-black/5 overflow-hidden rounded-sm shadow-2xl"
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:sticky lg:top-32"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-8 leading-none">
            {service.title}
          </h1>
          <div className="w-24 h-1.5 bg-black mb-10" />
          <p className="text-2xl font-light tracking-[0.3em] text-black/40 mb-10 uppercase italic">
            {service.price}
          </p>
          <p className="text-xl text-black/80 leading-relaxed mb-14 font-light max-w-xl">
            {service.description}
          </p>
          
          <div className="space-y-10">
            <h3 className="text-xs font-bold tracking-[0.4em] uppercase text-black/30 border-b border-black/5 pb-4">Service Process & Features</h3>
            <ul className="space-y-6">
              {service.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-6 text-black/90 group">
                  <CheckCircle2 size={24} className="text-black shrink-0 mt-0.5 opacity-30 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                  <span className="text-xl font-light tracking-tight leading-tight">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 pt-12 border-t border-black/5">
            <Link 
              to="/contact" 
              className="inline-block px-12 py-5 bg-black text-white text-sm font-bold tracking-[0.3em] uppercase hover:bg-black/80 transition-all hover:scale-[1.02] active:scale-[0.98] rounded-sm"
            >
              문의 바로가기
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
