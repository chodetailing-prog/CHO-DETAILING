import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mgonegaw", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 sm:mb-24 relative"
      >
        <div className="absolute -left-4 sm:-left-6 top-0 w-1 h-full bg-black/10" />
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 sm:mb-8 leading-none">
          Contact
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-black/50 font-light max-w-3xl leading-relaxed break-keep">
          차량 관리에 대한 모든 문의를 환영합니다. <br className="hidden md:block" />
          최상의 서비스를 위해 100% 예약제로 운영됩니다.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-24 items-start">
        {/* Inquiry Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black/5 pt-8 sm:pt-12 px-6 sm:px-12 pb-6 rounded-xl sm:rounded-sm"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 sm:mb-12 uppercase text-black">예약 문의</h2>
          <form className="space-y-8 sm:space-y-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-black/40">Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full bg-transparent border-b border-black/20 py-3 sm:py-4 focus:outline-none focus:border-black transition-colors text-base sm:text-lg text-black"
                  placeholder="성함"
                />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-black/40">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  className="w-full bg-transparent border-b border-black/20 py-3 sm:py-4 focus:outline-none focus:border-black transition-colors text-base sm:text-lg text-black"
                  placeholder="연락처"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-black/40">Car Model</label>
                <input 
                  type="text" 
                  name="car_model"
                  required
                  className="w-full bg-transparent border-b border-black/20 py-3 sm:py-4 focus:outline-none focus:border-black transition-colors text-base sm:text-lg text-black"
                  placeholder="차종"
                />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-black/40">Service</label>
                <select 
                  name="service"
                  required
                  className="w-full bg-transparent border-b border-black/20 py-3 sm:py-4 focus:outline-none focus:border-black transition-colors appearance-none text-base sm:text-lg text-black"
                >
                  <option value="">서비스 선택</option>
                  <option value="interior">Interior Detailing</option>
                  <option value="paint">Paint Correction</option>
                  <option value="ceramic">Ceramic Coating</option>
                  <option value="wash">Premium Hand Wash</option>
                  <option value="other">기타</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-black/40">Message</label>
              <textarea 
                name="message"
                required
                rows={4}
                className="w-full bg-transparent border-b border-black/20 py-3 sm:py-4 focus:outline-none focus:border-black transition-colors resize-none text-base sm:text-lg text-black"
                placeholder="문의 내용 (차량 상태, 원하시는 일정 등)"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-4 sm:py-6 bg-black text-white text-sm sm:text-base font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase hover:bg-black/80 transition-all hover:scale-[1.01] active:scale-[0.99] mt-6 sm:mt-10 disabled:opacity-50 disabled:cursor-not-allowed rounded-full sm:rounded-sm"
            >
              {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
            </button>
            
            {status === "error" && (
              <p className="text-red-500 text-sm mt-2 text-center">
                메시지 전송에 실패했습니다. 다시 시도해주세요.
              </p>
            )}
            {status === "success" && (
              <p className="text-green-600 text-sm mt-2 text-center">
                성공적으로 전송되었습니다. 곧 연락드리겠습니다.
              </p>
            )}
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-16"
        >
          <div>
            <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-black/30 mb-10 border-b border-black/5 pb-4">Studio Info</h2>
            <div className="space-y-8 text-xl font-light text-black/80">
              <p className="flex items-center gap-6 group">
                <MapPin size={28} className="text-black shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                <span></span>
              </p>
              <p className="flex items-center gap-6 group">
                <Phone size={28} className="text-black shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                <span>010-XXXX-XXXX</span>
              </p>
              <p className="flex items-center gap-6 group">
                <Mail size={28} className="text-black shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                <a href="mailto:chodetailing@gmail.com" className="border-b border-black/10 hover:border-black transition-colors">
                  chodetailing@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-black/30 mb-10 border-b border-black/5 pb-4">Business Hours</h2>
            <div className="space-y-6 text-xl font-light text-black/80">
              <p className="flex justify-between items-center group">
                <span className="text-black/40 group-hover:text-black transition-colors">Mon - Fri</span>
                <span className="font-medium">10:00 - 20:00</span>
              </p>
              <p className="flex justify-between items-center group">
                <span className="text-black/40 group-hover:text-black transition-colors">Saturday</span>
                <span className="font-medium">10:00 - 18:00</span>
              </p>
              <p className="flex justify-between items-center text-black/20">
                <span>Sunday</span>
                <span className="italic">Closed</span>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-black/30 mb-10 border-b border-black/5 pb-4">Location</h2>
            <div className="w-full h-[300px] bg-black/5 rounded-sm overflow-hidden shadow-sm mb-16">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281203.205981427!2d125.18660335!3d36.5572291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356421290515711b%3A0x39703f30e4370ee!2sSouth%20Korea!5e0!3m2!1sen!2skr!4v1710000000000!5m2!1sen!2skr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CHO DETAILING Location"
              ></iframe>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-black/30 mb-10 border-b border-black/5 pb-4">Social</h2>
            <div className="flex gap-8">
              <a href="https://www.instagram.com/cho.detailing/" target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all hover:scale-110 active:scale-95">
                <Instagram size={28} />
              </a>
              <a href="#" className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all hover:scale-110 active:scale-95">
                <Youtube size={28} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
