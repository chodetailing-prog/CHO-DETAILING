import { motion } from "motion/react";
import { useEffect } from "react";

export default function PaymentPolicy() {
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
          Payment Policy
        </h1>

        <div className="space-y-16">
          <section className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight border-b border-black/10 pb-4">지불 정책</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="text-sm font-bold tracking-widest uppercase text-black/40">개인 고객</h3>
                <p className="text-lg font-light leading-relaxed">
                  결제는 현금 또는 선불로 이루어져야 합니다. 시술 완료 후 즉시 결제를 원칙으로 합니다.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-bold tracking-widest uppercase text-black/40">회사 / 전문가 고객</h3>
                <p className="text-lg font-light leading-relaxed">
                  청구서 금액은 현금 또는 은행 송금으로 지불 가능하며, 합의된 지불 기한(14일) 내에 지불하셔야 합니다. 
                  지불이 지연될 경우, 별도의 통지 없이 월 1%의 이자가 자동으로 부과됩니다. 
                  미납 시에는 청구 금액에 10%의 고정 연체료가 추가됩니다.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight border-b border-black/10 pb-4">예약금 및 선불 (Prepayment)</h2>
            <p className="text-lg font-light leading-relaxed">
              여러 날에 걸쳐 진행되는 시술이나 대기 시간이 길어질 경우, 총 금액의 최소 20%를 예약금으로 받습니다. 
              예약금은 환불되지 않습니다. 시술은 종종 며칠씩 소요되므로, 예약금을 통해 정확한 일정을 확보할 수 있습니다. 
              예약금은 최종 청구 금액에서 차감됩니다.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
