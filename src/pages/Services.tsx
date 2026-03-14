import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle2, ArrowDown } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { subscribeServices, Service } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function Services() {
  const fallbackData = [
    { 
      id: "interior", 
      title: "Interior Detailing", 
      description: "실내 정밀 세정 및 가죽 보호 케어", 
      image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2000&auto=format&fit=crop", 
      price: "₩150,000부터", 
      order: 1, 
      features: ["실내 정밀 클리닝", "가죽 컨디셔닝"] 
    },
    { 
      id: "paint", 
      title: "Paint Correction", 
      description: "스크래치 제거 및 도장면 광택 최적화", 
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000&auto=format&fit=crop", 
      price: "₩450,000부터", 
      order: 2, 
      features: ["수성 광택", "결함 제거"] 
    },
    { 
      id: "ceramic", 
      title: "Ceramic Coating", 
      description: "최상급 세라믹 코팅 보호막 형성", 
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2000&auto=format&fit=crop", 
      price: "From ₩800,000", 
      order: 3, 
      features: ["9H 경도 코팅", "발수 보호"] 
    },
    { 
      id: "signature", 
      title: "Premium Hand Wash", 
      description: "전문적인 프리미엄 세차 서비스", 
      image: "https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=2000&auto=format&fit=crop", 
      price: "From ₩250,000", 
      order: 4, 
      features: ["스노우폼 세차", "왁스 코팅"] 
    }
  ];

  const [services, setServices] = useState<Service[]>(fallbackData);
  const { hash } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    try {
      const unsubscribe = subscribeServices((items) => {
        if (items && items.length > 0) {
          setServices(items);
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Services subscribe error:", error);
    }
  }, []);

  const shortDescriptions: Record<string, string> = {
    "interior": "실내 정밀 세정 및 가죽 보호 케어",
    "paint": "스크래치 제거 및 도장면 광택 최적화",
    "ceramic": "최상급 세라믹 코팅 보호막 형성",
    "signature": "전문적인 프리미엄 세차 서비스"
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-6 sm:mb-8">
            Our Services
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-black/50 font-light max-w-2xl mx-auto leading-relaxed break-keep px-4">
            차량의 가치를 보존하고 본연의 아름다움을 극대화하는 <br className="hidden md:block" />
            CHO DETAILING만의 하이엔드 케어 솔루션을 확인해 보세요.
          </p>
        </motion.div>
      </section>

      {/* Services Grid Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-20 sm:mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="group relative h-[180px] sm:h-[280px] md:h-[350px] lg:h-[400px] overflow-hidden rounded-xl sm:rounded-3xl block text-left shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                {/* Base dark overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
                
                {/* Consistent Pastel Blue Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-sky-400/60 via-sky-200/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-6 md:px-8 md:pb-8 text-white">
                <div className="relative z-20 transform transition-all duration-1000 ease-in-out group-hover:-translate-y-2 group-active:-translate-y-2">
                  <h3 className="text-xl md:text-2xl lg:text-4xl font-bold tracking-tight drop-shadow-lg">
                    {service.title}
                  </h3>
                  <div className="max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 group-active:max-h-16 group-active:opacity-100 transition-all duration-1000 ease-in-out overflow-hidden">
                    <p className="text-xs md:text-sm lg:text-base text-white/90 font-light mt-3 leading-relaxed max-w-lg line-clamp-3 break-keep">
                      {shortDescriptions[service.id] || service.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Mobile-only persistent gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
