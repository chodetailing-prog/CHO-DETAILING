import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { PortfolioItem, getPortfolioItems } from "@/lib/store";

export default function PortfolioDetail() {
  const { id } = useParams<{ id: string }>();
  
  const fallbacks: Record<string, PortfolioItem> = {
    "1": {
      id: "1",
      title: "Porsche 911 GT3 - Full Detail & Ceramic Coating",
      category: "Ceramic Coating",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1974&auto=format&fit=crop"
      ],
      date: "2024-03-01",
      description: "포르쉐 911 GT3 차량의 전체 디테일링 및 최상급 세라믹 코팅 시공 사례입니다. 도장면의 광택을 극대화하고 장기적인 보호를 위해 3레이어 코팅이 적용되었습니다."
    },
    "2": {
      id: "2",
      title: "Mercedes-Benz G-Wagon - Interior Restoration",
      category: "Interior Detail",
      image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop"
      ],
      date: "2024-02-15",
      description: "G-바겐 차량의 실내 가죽 복원 및 딥 클리닝 작업입니다. 세월의 흔적을 지우고 신차 수준의 실내 컨디션을 회복하는 데 중점을 두었습니다."
    },
    "3": {
      id: "3",
      title: "BMW M4 - Paint Correction & PPF",
      category: "Paint Correction",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070&auto=format&fit=crop"
      ],
      date: "2024-01-20",
      description: "BMW M4 차량의 도장면 결함 제거(광택) 및 프론트 패키지 PPF 시공입니다. 스톤칩 방지와 깊은 색감 구현을 목표로 작업되었습니다."
    }
  };

  const [item, setItem] = useState<PortfolioItem | null>(id ? (fallbacks[id] || null) : null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      setIsLoading(true);
      try {
        const items = await getPortfolioItems();
        let found = items.find((i) => i.id === id);
        
        if (found) {
          setItem(found);
        }
      } catch (error) {
        console.error("PortfolioDetail loadItem error:", error);
      }
      setIsLoading(false);
    };
    loadItem();
    window.scrollTo(0, 0);
  }, [id]);

  if (!item && isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-black/30 tracking-widest uppercase">Loading Portfolio...</div>
      </div>
    );
  }

  if (!item && !isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-bold mb-4">포트폴리오를 찾을 수 없습니다.</h2>
        <Link to="/portfolio" className="text-black/50 hover:text-black transition-colors underline">
          목록으로 돌아가기
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
        <Link 
          to="/portfolio" 
          className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-black/40 hover:text-black transition-colors"
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Info Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 space-y-12"
        >
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-8 leading-none">
              {item.title}
            </h1>
            <div className="w-24 h-1.5 bg-black mb-10" />
            <p className="text-xl text-black/60 font-light leading-relaxed max-w-xl">
              {item.description || "상세 설명이 없습니다."}
            </p>
          </div>

          <div className="space-y-6 pt-8 border-t border-black/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                <Tag size={18} />
              </div>
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-black/40">Category</p>
                <p className="font-medium">{item.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-black/40">Date</p>
                <p className="font-medium">{item.date}</p>
              </div>
            </div>
          </div>

          <div className="pt-12">
            <Link 
              to="/contact" 
              className="inline-block w-full py-4 bg-black text-white text-center font-medium tracking-widest uppercase hover:bg-black/80 transition-colors"
            >
              문의 바로가기
            </Link>
          </div>
        </motion.div>

        {/* Gallery */}
        <div className="lg:col-span-2 space-y-8">
          {item.images && item.images.length > 0 ? (
            item.images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="w-full bg-black/5 overflow-hidden"
              >
                <img 
                  src={img} 
                  alt={`${item.title} gallery ${idx + 1}`} 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full aspect-video bg-black/5 overflow-hidden"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
