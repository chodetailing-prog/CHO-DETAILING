import { motion } from "motion/react";
import { useEffect } from "react";

export default function GeneralTerms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-16">
          General Terms
        </h1>

        <section className="space-y-8">
          <h2 className="text-2xl font-bold tracking-tight border-b border-black/10 pb-4">일반 약관</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              { title: "제1조. 신원", desc: "CHO DETAILING은 전문 디테일링 서비스를 제공하는 사업체입니다." },
              { title: "제2조. 적용 범위", desc: "본 약관은 CHO DETAILING이 제공하는 모든 서비스와 계약에 적용됩니다." },
              { title: "제3조. 가격 및 견적", desc: "모든 견적은 차량 상태 확인 후 확정되며, 유효 기간은 발행일로부터 30일입니다." },
              { title: "제4조. 취소 규정", desc: "예약 취소는 최소 48시간 이전에 통보되어야 하며, 예약금은 반환되지 않습니다." },
              { title: "제5조. 지불", desc: "모든 서비스 비용은 명시된 지불 방법에 따라 기한 내에 납부되어야 합니다." },
              { title: "제6조. 불만 제기", desc: "서비스에 대한 불만 사항은 시술 완료 후 8일 이내에 서면으로 제출해 주셔야 합니다." },
              { title: "제7조. 보증", desc: "우리는 시공한 서비스에 대해 명시된 기간 동안 품질을 보증합니다." },
              { title: "제8조. 소유권", desc: "결제가 완료될 때까지 모든 시공 결과물에 대한 소유권은 CHO DETAILING에 있습니다." },
              { title: "제9조. 불가항력", desc: "천재지변 등 불가항력적인 사유로 인한 서비스 지연에 대해서는 책임을 지지 않습니다." }
            ].map((term, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-bold text-black/80">{term.title}</h4>
                <p className="text-sm text-black/50 font-light leading-relaxed">{term.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
