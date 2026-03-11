import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";
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
        <a href="/" className="px-8 py-3 bg-black text-white text-sm font-medium tracking-widest uppercase hover:bg-black/80 transition-colors rounded-md">
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {/* Hero Banner */}
      <section className="relative h-[40vh] md:h-[50vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-white mb-4"
          >
            {service.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-16 h-1 bg-white mx-auto"
          />
        </div>
      </section>

      {/* Main Content Split */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Text & Pricing */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                {service.title} 상세 안내
              </h2>
              <p className="text-lg text-black/70 leading-relaxed font-light">
                {service.description}
              </p>
            </div>

            {/* Features List */}
            {service.features && service.features.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold tracking-tight border-b border-black/10 pb-4">
                  주요 서비스 내용
                </h3>
                <ul className="space-y-4">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-4 text-black/80">
                      <CheckCircle2 size={20} className="text-black/40 shrink-0 mt-1" strokeWidth={2} />
                      <span className="text-base font-light leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pricing List */}
            {service.pricing && service.pricing.length > 0 && (
              <div className="space-y-8 pt-8">
                <h3 className="text-2xl font-bold tracking-tight border-b border-black/10 pb-4">
                  서비스 가격 안내
                </h3>
                <div className="space-y-10">
                  {service.pricing.map((plan, pIdx) => (
                    <div key={pIdx} className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h4 className="text-xl font-bold tracking-tight text-black">
                          {plan.title}
                        </h4>
                        {plan.price && (
                          <span className="text-lg font-medium text-black/60">
                            {plan.price}
                          </span>
                        )}
                      </div>
                      
                      {plan.description && (
                        <p className="text-sm text-black/60 font-light leading-relaxed">
                          {plan.description}
                        </p>
                      )}

                      {plan.features && (
                        <ul className="space-y-2 mt-4">
                          {plan.features.map((item, iIdx) => (
                            <li key={iIdx} className="flex items-center gap-3 text-sm text-black/70 font-light">
                              <div className="w-1.5 h-1.5 bg-black/30 rounded-full shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {plan.categories && (
                        <div className="bg-black/[0.03] p-6 rounded-lg space-y-4 mt-6">
                          {plan.categories.map((cat, cIdx) => (
                            <div key={cIdx} className="space-y-3">
                              <h5 className="text-xs font-bold tracking-widest uppercase text-black/40">{cat.title}</h5>
                              <div className="space-y-2">
                                {cat.items.map((item, iIdx) => (
                                  <div key={iIdx} className="flex justify-between items-center border-b border-black/5 pb-2 last:border-0 last:pb-0">
                                    <span className="text-sm text-black/70">{item.label}</span>
                                    <span className="text-sm font-medium text-black">{item.price}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="pt-8">
                  <a 
                    href="/contact" 
                    className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-sm font-bold tracking-widest uppercase hover:bg-black/80 transition-colors rounded-sm"
                  >
                    예약 문의하기 <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:sticky lg:top-32"
          >
            <div className="aspect-[4/5] md:aspect-square lg:aspect-[3/4] overflow-hidden rounded-xl shadow-2xl">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Before / After Section Placeholder */}
      <section className="w-full bg-black/5 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Before / After 결과
          </h2>
          <p className="text-black/60 font-light leading-relaxed max-w-2xl mx-auto">
            최고급 케미컬과 정밀한 공정을 통해 차량이 어떻게 변화하는지 직접 확인해 보세요. 
            (슬라이더 기능이 곧 추가될 예정입니다.)
          </p>
          <div className="aspect-video bg-black/10 rounded-xl flex items-center justify-center overflow-hidden relative group">
             <img
                src={service.image}
                alt="After Result"
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                 <span className="px-6 py-2 bg-white/90 text-black text-sm font-bold tracking-widest uppercase rounded-full shadow-lg">
                   After Result
                 </span>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
}
